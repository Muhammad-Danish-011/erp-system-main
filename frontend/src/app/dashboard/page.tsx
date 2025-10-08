"use client";

import React, { useEffect, useState } from "react";
import { AnalogClock } from "@/components/ui/AnalogClock";
import {
  Package,
  Users,
  ShoppingCart,
  Truck,
  TrendingUp,
  AlertCircle,
  User,
} from "lucide-react";
import Loading from "@/components/ui/Loading";

const stats = [
  {
    name: "Total Products",
    value: "120",
    icon: Package,
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Active Customers",
    value: "450",
    icon: Users,
    change: "+10.18%",
    changeType: "positive",
  },
];

const statsMore = [
  {
    name: "Pending Orders",
    value: "23",
    icon: ShoppingCart,
    change: "-2.35%",
    changeType: "negative",
  },
  {
    name: "Active Suppliers",
    value: "35",
    icon: Truck,
    change: "0.00%",
    changeType: "neutral",
  },
];

const alerts = [
  {
    title: "Low Stock Alert",
    description: "5 products are running low on stock",
    icon: AlertCircle,
    type: "warning",
  },
  {
    title: "Sales Increase",
    description: "Sales have increased by 15% this week",
    icon: TrendingUp,
    type: "success",
  },
];

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from local storage
    const data = {
      employeeName: localStorage.getItem("employeeName"),
      roleName: localStorage.getItem("roleName"),
      expiration: localStorage.getItem("expiration"),
      accessToken: localStorage.getItem("access_token"),
    };
    setUserData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!userData) return <Loading />;

  return (
    <div className="overflow-y-auto p-6 space-y-6">
      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <User className="h-7 w-7 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome, {userData.employeeName || "User"} 👋
          </h2>
          <p className="text-gray-500">
            Role:{" "}
            <span className="font-medium text-gray-800">
              {userData.roleName}
            </span>
          </p>
          <p className="text-sm text-gray-400">
            Session Expires On: {new Date(userData.expiration).toLocaleString()}{" "}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnalogClock timezone="Asia/Tokyo" label="Japan Time" />
        <AnalogClock timezone="Asia/Dubai" label="Dubai Time" />
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 flex justify-start lg:justify-center items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <stat.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div>
                <dl className="text-center">
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline justify-center">
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

      {/* More Stats */}
      <div className="grid gap-6 sm:grid-cols-2">
        {statsMore.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
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
                  alert.type === "warning"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {alert.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Loading/>
    </div>
  );
}
