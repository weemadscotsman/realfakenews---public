import { Handler } from '@netlify/functions';
import * as crypto from 'crypto';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  subscriptionTier?: string;
  subscriptionExpiresAt?: string;
  referralCode: string;
  referralCount: number;
  tokens: number;
  createdAt: string;
  passwordHash?: string;
}

// Simple in-memory user store
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
    // Get token from header
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
        body: JSON.stringify({ error: 'Invalid or expired token' }),
      };
    }

    // Find user
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // Return user data (excluding sensitive info)
    const { passwordHash: _, ...userWithoutPassword } = user;
    void _; // Mark as intentionally unused

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(userWithoutPassword),
    };

  } catch (error) {
    console.error('Get user error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
