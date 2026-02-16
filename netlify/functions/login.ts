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

// Simple in-memory user store (must match register.ts)
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
    const { email, password } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and password required' }),
      };
    }

    // Find user
    const user = users.find(u => u.email === email.toLowerCase().trim());
    if (!user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' }),
      };
    }

    // Verify password
    const passwordHash = crypto
      .createHash('sha256')
      .update(password + (process.env.PASSWORD_SALT || 'rfns-salt'))
      .digest('hex');

    if (passwordHash !== user.passwordHash) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' }),
      };
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data (excluding sensitive info)
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Login successful',
        token,
        user: userWithoutPassword,
      }),
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
