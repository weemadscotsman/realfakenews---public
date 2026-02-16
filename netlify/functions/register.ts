import { Handler } from '@netlify/functions';
import * as crypto from 'crypto';

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  isPremium: boolean;
  referralCode: string;
  referralCount: number;
  tokens: number;
  createdAt: string;
}

// Simple in-memory user store (replace with real database in production)
const users: User[] = [];

// Generate JWT token
function generateToken(userId: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ 
    userId, 
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', process.env.JWT_SECRET || 'rfns-secret-key')
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}

// Generate referral code
function generateReferralCode(): string {
  return 'RFNS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    const { name, email, password } = JSON.parse(event.body || '{}');

    // Validation
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    if (password.length < 8) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Password must be at least 8 characters' }),
      };
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ error: 'Email already registered' }),
      };
    }

    // Hash password
    const passwordHash = crypto
      .createHash('sha256')
      .update(password + (process.env.PASSWORD_SALT || 'rfns-salt'))
      .digest('hex');

    // Create user
    const userId = crypto.randomUUID();
    const newUser = {
      id: userId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      isPremium: false,
      referralCode: generateReferralCode(),
      referralCount: 0,
      tokens: 10, // Welcome bonus
      createdAt: new Date().toISOString(),
      walletAddresses: {},
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(userId);

    // Return user data (excluding sensitive info)
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'User registered successfully',
        token,
        user: userWithoutPassword,
      }),
    };

  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
