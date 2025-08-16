"use client";

import * as React from "react";

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    if (onValueChange) onValueChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectTrigger) {
            return React.cloneElement(
              child as React.ReactElement<{ selectedValue?: string }>,
              { selectedValue }
            );
          }
          return null;
        })}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              return React.cloneElement(
                child as React.ReactElement<{ children: React.ReactNode }>,
                {
                  children: React.Children.map(
                    (child.props as any).children,
                    (item) => {
                      if (
                        React.isValidElement(item) &&
                        item.type === SelectItem
                      ) {
                        return React.cloneElement(
                          item as React.ReactElement<{
                            value: string;
                            onClick?: () => void;
                            isSelected?: boolean;
                          }>,
                          {
                            onClick: () => handleSelect((item.props as { value: string }).value),
                            isSelected: (item.props as { value: string }).value === selectedValue,                            
                          }
                        );
                      }
                      return item;
                    }
                  ),
                }
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

// Trigger
export function SelectTrigger({
  children,
  className,
  selectedValue,
}: {
  children: React.ReactNode;
  className?: string;
  selectedValue?: string;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectValue) {
          return React.cloneElement(
            child as React.ReactElement<{ selectedValue?: string }>,
            { selectedValue }
          );
        }
        return child;
      })}
    </button>
  );
}

// Dropdown Container
export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute mt-1 w-full rounded border bg-white p-2 shadow">
      {children}
    </div>
  );
}

// Items
export function SelectItem({
  value,
  children,
  onClick,
  isSelected,
}: {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded ${
        isSelected ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
      data-value={value}
    >
      {children}
    </div>
  );
}

// Value Placeholder / Selected Text
export function SelectValue({
  placeholder,
  selectedValue,
}: {
  placeholder?: string;
  selectedValue?: string;
}) {
  return (
    <span className="text-sm font-medium text-gray-900">
      {selectedValue || placeholder}
    </span>
  );
}
