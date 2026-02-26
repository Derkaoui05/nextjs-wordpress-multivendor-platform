import {
  LayoutDashboard, Store, Package, ShoppingCart,
  Users, Wallet, Settings, ClipboardList,
  BarChart2, LogOut, Heart, User
} from "lucide-react";

export const adminNav = [
  { label: "Dashboard",    href: "/admin",              icon: LayoutDashboard },
  { label: "My Store",     href: "/admin/my-store",     icon: Store },
  { label: "Vendors",      href: "/admin/vendors",      icon: Users },
  { label: "Products",     href: "/admin/products",     icon: Package },
  { label: "Orders",       href: "/admin/orders",       icon: ShoppingCart },
  { label: "Commissions",  href: "/admin/commissions",  icon: BarChart2 },
  { label: "Withdrawals",  href: "/admin/withdrawals",  icon: Wallet },
  { label: "Settings",     href: "/admin/settings",     icon: Settings },
];

export const vendorNav = [
  { label: "Dashboard",   href: "/vendor",           icon: LayoutDashboard },
  { label: "My Products", href: "/vendor/products",  icon: Package },
  { label: "My Orders",   href: "/vendor/orders",    icon: ClipboardList },
  { label: "Wallet",      href: "/vendor/wallet",    icon: Wallet },
  { label: "My Store",    href: "/vendor/store",     icon: Store },
];

export const customerNav = [
  { label: "My Orders",   href: "/account/orders",  icon: ShoppingCart },
  { label: "Wishlist",    href: "/account/wishlist", icon: Heart },
  { label: "Profile",     href: "/account/profile",  icon: User },
];

export function getNavByRole(roles = []) {
  if (roles.includes("administrator")) return adminNav;
  if (roles.includes("seller"))        return vendorNav;
  return customerNav;
}