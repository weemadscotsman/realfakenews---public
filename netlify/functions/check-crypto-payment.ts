import { Handler } from '@netlify/functions';
import * as crypto from 'crypto';

// In-memory stores
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
  confirmedAt?: string;
}

interface User {
  id: string;
  isPremium: boolean;
  subscriptionTier?: string;
  subscriptionExpiresAt?: string;
  tokens: number;
}

const payments: Payment[] = [];
const users: User[] = [];

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

// Calculate subscription expiry
function calculateExpiry(plan: string): string {
  const now = new Date();
  switch (plan) {
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
    case 'yearly':
      return new Date(now.setFullYear(now.getFullYear() + 1)).toISOString();
    case 'lifetime':
      return new Date('2099-12-31').toISOString();
    default:
      return new Date(now.setMonth(now.getMonth() + 1)).toISOString();
  }
}

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
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

    // Get payment ID from query params
    const paymentId = event.queryStringParameters?.paymentId;
    if (!paymentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Payment ID required' }),
      };
    }

    // Find payment
    const payment = payments.find(p => p.id === paymentId && p.userId === decoded.userId);
    if (!payment) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Payment not found' }),
      };
    }

    // Check if expired
    if (payment.status === 'pending' && new Date(payment.expiresAt) < new Date()) {
      payment.status = 'expired';
    }

    // Simulate checking blockchain (in production, use actual blockchain APIs)
    // For demo, we'll auto-confirm payments after 10 seconds
    const paymentAge = Date.now() - new Date(payment.createdAt).getTime();
    if (payment.status === 'pending' && paymentAge > 10000) {
      // Simulate 50% chance of confirmation for demo
      if (Math.random() > 0.3) {
        payment.status = 'confirmed';
        payment.confirmedAt = new Date().toISOString();

        // Update user to premium
        const user = users.find(u => u.id === decoded.userId);
        if (user) {
          user.isPremium = true;
          user.subscriptionTier = payment.plan;
          user.subscriptionExpiresAt = calculateExpiry(payment.plan);
          
          // Add bonus tokens for crypto payment
          const bonusTokens = payment.plan === 'lifetime' ? 500 : 
                             payment.plan === 'yearly' ? 200 : 100;
          user.tokens += bonusTokens;
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        paymentId: payment.id,
        status: payment.status,
        plan: payment.plan,
        currency: payment.currency,
        cryptoAmount: payment.cryptoAmount,
        address: payment.address,
        createdAt: payment.createdAt,
        expiresAt: payment.expiresAt,
        confirmedAt: payment.confirmedAt,
        confirmations: payment.status === 'confirmed' ? 6 : 0,
      }),
    };

  } catch (error) {
    console.error('Check payment error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
