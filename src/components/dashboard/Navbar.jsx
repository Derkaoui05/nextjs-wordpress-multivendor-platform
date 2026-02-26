'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';

export default function Navbar({ user }) {
  const roleLabel = user?.roles?.includes('administrator')
    ? 'Admin'
    : user?.roles?.includes('seller')
      ? 'Vendor'
      : 'Customer';

  const roleColor = {
    Admin: 'bg-red-100 text-red-700',
    Vendor: 'bg-indigo-100 text-indigo-700',
    Customer: 'bg-green-100 text-green-700',
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="text-sm text-gray-500">
        Welcome back, <span className="font-semibold text-gray-800">{user?.name}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Role Badge */}
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${roleColor[roleLabel]}`}>
          {roleLabel}
        </span>

        {/* Avatar */}
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
