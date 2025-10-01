"use client";

import { Toaster, toast as sonnerToast } from "sonner";
import React from "react";

type ToastPosition = 
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface CustomToastProps {
  position?: ToastPosition;
}

const CustomToast: React.FC<CustomToastProps> = ({ position = "bottom-right" }) => {
  return <Toaster position={position} />;
};

// Helper functions for toast
export const toast = {
  success: (message: string) => 
    sonnerToast.success(message, { style: { background: "green", color: "white" } }),
  error: (message: string) => 
    sonnerToast.error(message, { style: { background: "red", color: "white" } }),
};

export default CustomToast;
