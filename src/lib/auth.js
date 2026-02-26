// src/lib/auth.js
import Cookies from 'js-cookie';
import api from './api';

export async function login(email, password) {
  // Step 1 — Get JWT token
  const res = await api.post('/jwt-auth/v1/token', {
    username: email,
    password,
  });

  const { token, user_display_name, user_email } = res.data;

  // Step 2 — Save token to cookie immediately
  Cookies.set('auth_token', token, { expires: 7 });

  // Step 3 — Fetch user data, pass token DIRECTLY in this call
  // Don't rely on the interceptor here — cookie timing issue
  const userRes = await api.get('/wp/v2/users/me?context=edit', {
    headers: {
      Authorization: `Bearer ${token}`, // ← inject manually here
    },
  });

  const user = {
    id: userRes.data.id,
    name: user_display_name,
    email: user_email,
    roles: userRes.data.roles,
    avatar: userRes.data.avatar_urls?.['48'] || null,
  };

  // Step 4 — Save user to cookie
  Cookies.set('user_data', JSON.stringify(user), { expires: 7 });

  return user;
}

export function logout() {
  Cookies.remove('auth_token');
  Cookies.remove('user_data');
  window.location.href = '/login';
}

export function getCurrentUser() {
  const data = Cookies.get('user_data');
  return data ? JSON.parse(data) : null;
}

export const isAdmin = (user) => user?.roles?.includes('administrator');
export const isVendor = (user) => user?.roles?.includes('seller');
export const isCustomer = (user) => user?.roles?.includes('customer');

export function getDefaultRoute(user) {
  if (isAdmin(user)) return '/admin';
  if (isVendor(user)) return '/vendor';
  return '/account';
}
