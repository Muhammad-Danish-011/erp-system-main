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
  DollarSign,
  CheckCircle,
  Upload,
  UserPlus,
  Car,
  MapPin,
  Wrench,
  ListChecks,
  Palette,
  Anchor,
  Globe,
  Truck,
  ClipboardList,
  PlusSquare,
  FileSpreadsheet,
  CreditCard,
  ShoppingCart,
  AxeIcon,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Master",
    href: "",
    icon: Package,
    children: [
      { name: "Car Brand", href: "/master/car-brand", icon: Car },
      { name: "Map - Inventory / Port Location", href: "/master/map-inventory-port-location", icon: MapPin },
      { name: "Inspection Cost", href: "/master/inspection-cost", icon: Wrench },
      { name: "Vehicle Category", href: "/master/vehicle-category", icon: ListChecks },
      { name: "Car Model", href: "/master/car-model", icon: Car },
      { name: "Additional Options", href: "/master/additional-options", icon: PlusSquare },
      { name: "Color", href: "/master/color", icon: Palette },
      { name: "Ports", href: "/master/ports", icon: Anchor },
      { name: "Port-Country Mapping", href: "/master/port-country-mapping", icon: Globe },
      { name: "Freight Charges", href: "/master/freight-charges", icon: Truck },
      { name: "Axle", href: "/master/axle", icon: AxeIcon },
    ],
  },
  {
    name: "Transaction",
    href: "",
    icon: Users,
    children: [
      { name: "Agent Portal", href: "/transaction/agent-portal", icon: Users },
      {
        name: "Accounts",
        href: "",
        icon: DollarSign,
        children: [
          { name: "Money Allocation", href: "/transaction/accounts/money-allocation", icon: DollarSign },
          { name: "Sales Order Approval", href: "/transaction/accounts/sales-order-approval", icon: CheckCircle },
          { name: "Payment Vouchers", href: "/transaction/accounts/payment-vouchers", icon: FileText },
          { name: "Acknowledgement TT Uploaded", href: "/transaction/accounts/acknowledgement-tt", icon: Upload },
          { name: "New Customer Approval", href: "/transaction/accounts/new-customer-approval", icon: UserPlus },
        ],
      },
      { name: "Add Car Listing", href: "/transaction/add-car-listing", icon: PlusSquare },
      { name: "Porforma Invoice", href: "/transaction/porforma-invoice", icon: FileSpreadsheet },
      { name: "Payments Received", href: "/transaction/payments-received", icon: CreditCard },
      { name: "Sales Order", href: "/transaction/sales-order", icon: ShoppingCart },
    ],
  },
  {
    name: "Report",
    href: "",
    icon: FileText,
    children: [
      { name: "Voucher Report", href: "/orders/voucher-report", icon: FileText },
      { name: "Proforma Invoice Report", href: "/orders/proforma-invoice-report", icon: FileSpreadsheet },
    ],
  },
];

const settingsNav = { name: "Settings", href: "/settings", icon: Settings };

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((m) => m !== menuName)
        : [...prev, menuName]
    );
  };

  const renderMenu = (items: any[], depth = 0) => {
    return (
      <div className={depth > 0 ? "ml-6 mt-1 space-y-1" : "space-y-1"}>
        {items.map((item) => {
          const isActive = item.href && pathname.startsWith(item.href);
          const hasChildren = !!item.children;
          const isOpen = openMenus.includes(item.name);

          return (
            <div key={item.name}>
              <button
                onClick={() => (hasChildren ? toggleMenu(item.name) : null)}
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
                        {isOpen ? (
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

              {/* Child Menu */}
              {!isCollapsed && hasChildren && isOpen && renderMenu(item.children, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-gray-900 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
  {!isCollapsed && (
    <>
      <img
        src="/logo.png"
        alt="Logo"
        className="h-auto w-auto max-h-14 max-w-14 object-contain"
      />
      <h1 className="text-xl font-bold text-white hidden sm:block whitespace-nowrap">ERP System</h1>  
          
    </>
  )}
  <button
    onClick={() => setIsCollapsed(!isCollapsed)}
    className="text-gray-300 hover:text-white"
  >
    <Menu size={24} />
  </button>
</div>
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto custom_scrollbar_hidden">
        {renderMenu(navigation)}
      </nav>

      {/* Settings */}
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
