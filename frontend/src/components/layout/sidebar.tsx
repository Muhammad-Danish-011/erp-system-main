"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  FileText,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Master",
    icon: Package,
    children: [
      { name: "Car Brand", href: "/master/car-brand" },
      { name: "Map - Inventory / Port Location", href: "/master/map-inventory-port-location" },
      { name: "Inspection Cost", href: "/master/inspection-cost" },
      { name: "Vehicle Category", href: "/master/vehicle-category" },
      { name: "Car Model", href: "/master/car-model" },
      { name: "Additional Options", href: "/master/additional-options" },
      { name: "Color", href: "/master/color" },
      { name: "Ports", href: "/master/ports" },
      { name: "Port-Country Mapping", href: "/master/port-country-mapping" },
      { name: "Freight Charges", href: "/master/freight-charges" },
      { name: "Axle", href: "/master/axle" },
    ],
  },
  {
    name: "Transaction",
    icon: Users,
    children: [
      { name: "Agent Portal", href: "/transaction/agent-portal" },
      { name: "Accounts", href: "/transaction/accounts" },
      { name: "Add Car Listing", href: "/transaction/add-car-listing" },
      { name: "Porforma Invoice", href: "/transaction/porforma-invoice" },
      { name: "Payments Received", href: "/transaction/payments-received" },
      { name: "Sales Order", href: "/transaction/sales-order" },
    ],
  },
  { 
    name: "Report", 
    icon: FileText,
    children: [
      { name: "Voucher Report", href: "/orders/voucher-report" },
      { name: "Proforma Invoice Report", href: "/orders/proforma-invoice-report" }
    ]
  },
];

const settingsNav = { name: "Settings", href: "/settings", icon: Settings };

export function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex h-full flex-col bg-gray-900 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
        {!isCollapsed && <h1 className="text-xl font-bold text-white">ERP System</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href || "");
          const hasChildren = !!item.children;

          return (
            <div key={item.name}>
              {/* Main Menu Item */}
              <button
                onClick={() =>
                  hasChildren
                    ? setOpenMenu(openMenu === item.name ? null : item.name)
                    : null
                }
                className={cn(
                  "group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-300"
                    )}
                  />
                )}
                {!isCollapsed && (
                  <>
                    {hasChildren ? (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
                        {openMenu === item.name ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="flex-1 text-left"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </button>

              {/* Submenu */}
              {!isCollapsed && hasChildren && openMenu === item.name && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className={cn(
                        "block rounded-md px-2 py-1 text-sm",
                        pathname === sub.href
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      )}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings at Bottom */}
      <div className="border-t border-gray-800 px-2 py-4">
        <Link
          href={settingsNav.href}
          className={cn(
            "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
            pathname.startsWith(settingsNav.href)
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
        >
          <settingsNav.icon
            className={cn(
              "mr-3 h-5 w-5 flex-shrink-0",
              pathname.startsWith(settingsNav.href)
                ? "text-white"
                : "text-gray-400 group-hover:text-gray-300"
            )}
          />
          {!isCollapsed && settingsNav.name}
        </Link>
      </div>
    </div>
  );
}
