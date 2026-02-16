import { Handler } from '@netlify/functions';
import * as crypto from 'crypto';

// Payment plans
const PLANS = {
  monthly: { price: 9.99, name: 'Premium Monthly' },
  yearly: { price: 99.99, name: 'Premium Yearly' },
  ironic: { price: 2.50, name: 'Ironic Tier' },
  lifetime: { price: 299.99, name: 'Lifetime Access' },
};

// Exchange rates (USD to crypto) - In production, fetch from API
const EXCHANGE_RATES: Record<string, number> = {
  btc: 0.00010,     // ~$9.99 = ~0.00010 BTC
  usdt: 1,          // 1:1 with USD
  xrp: 18.5,        // ~$9.99 = ~18.5 XRP
  polygon: 6.5,     // ~$9.99 = ~6.5 POL
};

interface Payment {
  id: string;
  userId: string;
  plan: string;
  currency: string;
  fiatAmount: number;
  cryptoAmount: string;
  address: string;
  status: 'pending' | 'confirmed' | 'expired';
  createdAt: string;
  expiresAt: string;
  destinationTag?: string;
}

// In-memory payment store
const payments: Payment[] = [];

// Verify JWT token
function verifyToken(token: string): { userId: string } | null {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.JWT_SECRET || 'rfns-secret-key')
      .update(`${header}.${payload}`)
      .digest('base64url');
    
    if (signature !== expectedSignature) return null;
    
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (decoded.exp < Date.now()) return null;
    
    return { userId: decoded.userId };
  } catch {
    return null;
  }
}

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Verify auth
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Authorization required' }),
      };
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid token' }),
      };
    }

    const { plan, currency } = JSON.parse(event.body || '{}');

    // Validate plan
    if (!PLANS[plan as keyof typeof PLANS]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid plan' }),
      };
    }

    // Validate currency
    if (!['btc', 'usdt', 'xrp', 'polygon'].includes(currency)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid currency. Use: btc, usdt, xrp, or polygon' }),
      };
    }

    const planData = PLANS[plan as keyof typeof PLANS];
    
    // Get wallet addresses from environment variables
    const walletAddresses = {
      btc: process.env.BTC_WALLET_ADDRESS,
      usdt: process.env.USDT_WALLET_ADDRESS,
      xrp: process.env.XRP_WALLET_ADDRESS,
      polygon: process.env.POLYGON_WALLET_ADDRESS,
    };

    if (!walletAddresses[currency as keyof typeof walletAddresses]) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Payment method not configured' }),
      };
    }

    // Create payment record
    const paymentId = crypto.randomUUID();
    const paymentAddress = walletAddresses[currency as keyof typeof walletAddresses];
    
    // Calculate crypto amount
    const cryptoAmount = (planData.price * EXCHANGE_RATES[currency]).toFixed(
      currency === 'usdt' ? 2 : 8
    );

    const payment: Payment = {
      id: paymentId,
      userId: decoded.userId,
      plan,
      currency,
      fiatAmount: planData.price,
      cryptoAmount,
      address: paymentAddress!,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
    };

    // Add XRP destination tag if XRP
    if (currency === 'xrp') {
      payment.destinationTag = process.env.XRP_DESTINATION_TAG || '1012394';
    }

    payments.push(payment);

    interface PaymentResponse {
      paymentId: string;
      plan: string;
      fiatAmount: number;
      fiatCurrency: string;
      cryptoCurrency: string;
      cryptoAmount: string;
      address: string;
      expiresAt: string;
      network: string;
      instructions: string;
      destinationTag?: string;
    }

    const response: PaymentResponse = {
      paymentId,
      plan: planData.name,
      fiatAmount: planData.price,
      fiatCurrency: 'USD',
      cryptoCurrency: currency.toUpperCase(),
      cryptoAmount,
      address: paymentAddress!,
      expiresAt: payment.expiresAt,
      network: getNetworkName(currency),
      instructions: `Send exactly ${cryptoAmount} ${currency.toUpperCase()} to the address above. Payment will be confirmed within 10-30 minutes after network confirmation.`,
    };

    // Add destination tag for XRP
    if (currency === 'xrp' && payment.destinationTag) {
      response.destinationTag = payment.destinationTag;
      response.instructions += ` IMPORTANT: Include destination tag ${payment.destinationTag} or your payment may be lost!`;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };

  } catch (error) {
    console.error('Crypto payment error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

function getNetworkName(currency: string): string {
  const networks: Record<string, string> = {
    btc: 'Bitcoin Network',
    usdt: 'Tron Network (TRC20)',
    xrp: 'XRP Ledger',
    polygon: 'Polygon Network',
  };
  return networks[currency] || currency.toUpperCase();
}
