"use client";

import { Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/master")) return "Master";
    if (pathname.startsWith("/transaction")) return "Transaction";
    if (pathname.startsWith("/report")) return "Report";
    if (pathname.startsWith("/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
       
        <h2 className="text-2xl font-semibold text-gray-900 ml-[50px] lg:ml-0">{getPageTitle()}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="sr-only">Open user menu</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <User className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:block">
            Admin User
          </span>
        </button>
      </div>
    </header>
  );
}
