import api from "./api";
import Cookies from "js-cookie";

// Login — calls JWT endpoint, stores token + user
export async function login(email, password) {
  const res = await api.post("/jwt-auth/v1/token", {
    username: email,
    password,
  });

  const { token, user_display_name, user_email } = res.data;

  // Store token in cookie (7 day expiry)
  Cookies.set("auth_token", token, { expires: 7 });

  // Fetch full user data including roles
  const userRes = await api.get("/wp/v2/users/me?context=edit");
  const user = {
    id: userRes.data.id,
    name: user_display_name,
    email: user_email,
    roles: userRes.data.roles,
    avatar: userRes.data.avatar_urls?.["48"] || null,
  };

  Cookies.set("user_data", JSON.stringify(user), { expires: 7 });
  return user;
}

// Logout
export function logout() {
  Cookies.remove("auth_token");
  Cookies.remove("user_data");
  window.location.href = "/login";
}

// Get current user from cookie (client-side)
export function getCurrentUser() {
  const data = Cookies.get("user_data");
  return data ? JSON.parse(data) : null;
}

// Role checkers
export const isAdmin  = (user) => user?.roles?.includes("administrator");
export const isVendor = (user) => user?.roles?.includes("seller");
export const isCustomer = (user) => user?.roles?.includes("customer");

// Where to redirect after login based on role
export function getDefaultRoute(user) {
  if (isAdmin(user))  return "/admin";
  if (isVendor(user)) return "/vendor";
  return "/account";
}