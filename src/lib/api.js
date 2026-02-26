import axios from "axios";
import Cookies from "js-cookie";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;

// Main API instance — talks to WordPress REST API
const api = axios.create({
  baseURL: `${WP_URL}/wp-json`,
  headers: { "Content-Type": "application/json" },
});

// Inject JWT token into every request automatically
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — redirect to login if token expired
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove("auth_token");
      Cookies.remove("user_data");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// WooCommerce API — uses Basic Auth (key + secret)
export const wcApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wc/v3`,
  auth: {
    username: process.env.NEXT_PUBLIC_WC_KEY,
    password: process.env.NEXT_PUBLIC_WC_SECRET,
  },
});

export default api;