"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavByRole } from "@/config/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar({ user }) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const navItems = getNavByRole(user?.roles || []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-xl font-bold text-indigo-600">🛒 MyMarket</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mode Switcher (for vendor/admin who can also shop) */}
      {(user?.roles?.includes("seller") || user?.roles?.includes("administrator")) && (
        <div className="px-4 py-3 border-t border-gray-200">
          <Link
            href="/account/orders"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            🛒 Switch to Shopping Mode
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}