"use client";

import * as React from "react";

// Added styles for consistent global design with flex layout and gap
export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  return <div className="relative flex gap-2">{children}</div>;
}

export function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
    >
      {children}
    </button>
  );
}

// Added consistent background and padding styles
export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="absolute mt-1 w-full rounded border bg-white p-2 shadow">{children}</div>;
}

// Added flex and gap styles for consistent layout
export function SelectItem({
  value,
  children,
  onClick,
}: {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-100"
      onClick={onClick}
      data-value={value}
    >
      {children}
    </div>
  );
}

// Added consistent text styles
export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-sm font-medium text-gray-900">{placeholder}</span>;
}
