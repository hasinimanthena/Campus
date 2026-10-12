import crypto from 'crypto';
import { dbStore } from './data/store.js';

// Environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5001/api/auth/google/callback';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:5001/api/auth/github/callback';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// In-memory OAuth state tokens for CSRF protection
const activeStates = new Map();

/**
 * 1. Google OAuth 2.0
 */
export function getGoogleAuthUrl() {
  const state = crypto.randomBytes(16).toString('hex');
  activeStates.set(state, { provider: 'google', createdAt: Date.now() });

  if (!GOOGLE_CLIENT_ID) {
    // Return sandbox simulation URL if credentials not yet configured
    return {
      url: `${CLIENT_URL}/login?oauth_sim=google&state=${state}`,
      isConfigured: false,
    };
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
    state,
  });

  return {
    url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    isConfigured: true,
  };
}

export async function handleGoogleCallback(code, state) {
  if (!activeStates.has(state)) {
    throw new Error('Invalid or expired OAuth state token (CSRF check failed).');
  }
  activeStates.delete(state);

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'Failed to exchange authorization code with Google.');
  }

  // Fetch user profile
  const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const profile = await profileRes.json();
  if (!profile.email) {
    throw new Error('Google did not return an email address.');
  }

  // Link or create user session
  return linkOAuthUser({
    email: profile.email,
    name: profile.name || profile.given_name || 'Google User',
    avatar: profile.picture,
    provider: 'google',
    providerId: profile.sub,
  });
}

/**
 * 2. GitHub OAuth
 */
export function getGithubAuthUrl() {
  const state = crypto.randomBytes(16).toString('hex');
  activeStates.set(state, { provider: 'github', createdAt: Date.now() });

  if (!GITHUB_CLIENT_ID) {
    return {
      url: `${CLIENT_URL}/login?oauth_sim=github&state=${state}`,
      isConfigured: false,
    };
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: 'read:user user:email',
    state,
  });

  return {
    url: `https://github.com/login/oauth/authorize?${params.toString()}`,
    isConfigured: true,
  };
}

export async function handleGithubCallback(code, state) {
  if (!activeStates.has(state)) {
    throw new Error('Invalid or expired OAuth state token (CSRF check failed).');
  }
  activeStates.delete(state);

  // Exchange code for token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: GITHUB_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'Failed to exchange authorization code with GitHub.');
  }

  // Fetch GitHub User profile
  const profileRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      'User-Agent': 'CampusPath-OAuth-Service',
    },
  });
  const profile = await profileRes.json();

  // Fetch primary verified email if private
  let userEmail = profile.email;
  if (!userEmail) {
    const emailsRes = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'CampusPath-OAuth-Service',
      },
    });
    const emails = await emailsRes.json();
    const primary = emails.find((e) => e.primary && e.verified);
    userEmail = primary ? primary.email : `${profile.login}@users.noreply.github.com`;
  }

  return linkOAuthUser({
    email: userEmail,
    name: profile.name || profile.login || 'GitHub User',
    avatar: profile.avatar_url,
    provider: 'github',
    providerId: String(profile.id),
  });
}

/**
 * Safe Account Linking Logic
 */
function linkOAuthUser({ email, name, avatar, provider, providerId }) {
  let existingUser = dbStore.getUserByEmail(email);

  if (existingUser) {
    dbStore.addAuditLog(
      'OAUTH_LOGIN',
      `User ${existingUser.name} logged in via ${provider.toUpperCase()}`,
      existingUser.name
    );
    return {
      user: existingUser,
      token: generateToken(existingUser),
      isNewUser: false,
    };
  }

  // Create new linked user
  const newUser = {
    id: `user-${provider}-${providerId}`,
    name,
    email,
    role: email.toLowerCase().includes('placement') || email.toLowerCase().includes('admin') ? 'admin' : 'student',
    studentId: 'stud-1', // Link to first student by default
    rollNumber: '2021CS0101',
    avatar,
    authProvider: provider,
    providerId,
    createdAt: new Date().toISOString(),
  };

  dbStore.addUser(newUser);
  dbStore.addAuditLog(
    'OAUTH_ACCOUNT_LINKED',
    `New account registered & linked via ${provider.toUpperCase()} for ${email}`,
    name
  );

  return {
    user: newUser,
    token: generateToken(newUser),
    isNewUser: true,
  };
}

function generateToken(user) {
  // In production, sign with jsonwebtoken: jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  const payload = {
    userId: user.id,
    role: user.role,
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}
