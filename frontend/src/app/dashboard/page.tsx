"use client";

import { AnalogClock } from "@/components/ui/AnalogClock";
import {
  Package,
  Users,
  ShoppingCart,
  Truck,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const stats = [
  { name: "Total Products", value: "120", icon: Package, change: "+4.75%", changeType: "positive" },
  { name: "Active Customers", value: "450", icon: Users, change: "+10.18%", changeType: "positive" },
  { name: "Pending Orders", value: "23", icon: ShoppingCart, change: "-2.35%", changeType: "negative" },
  { name: "Active Suppliers", value: "35", icon: Truck, change: "0.00%", changeType: "neutral" },
];

const alerts = [
  { title: "Low Stock Alert", description: "5 products are running low on stock", icon: AlertCircle, type: "warning" },
  { title: "Sales Increase", description: "Sales have increased by 15% this week", icon: TrendingUp, type: "success" },
];

export default function DashboardPage() {
  return (
 <div className="min-h-screen overflow-y-auto">
  <div className="space-y-6 p-6">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <AnalogClock timezone="Asia/Tokyo" label="Japan Time" />
      <AnalogClock timezone="Asia/Dubai" label="Dubai Time" />

      {stats.map((stat) => (
        <div
          key={stat.name}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {stat.change}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Alerts */}
    <div className="grid gap-6 sm:grid-cols-2">
      {alerts.map((alert) => (
        <div
          key={alert.title}
          className="flex items-center gap-4 rounded-lg bg-white p-6 shadow"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              alert.type === "warning" ? "bg-yellow-100" : "bg-green-100"
            }`}
          >
            <alert.icon
              className={`h-6 w-6 ${
                alert.type === "warning" ? "text-yellow-600" : "text-green-600"
              }`}
              aria-hidden="true"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  
  )}