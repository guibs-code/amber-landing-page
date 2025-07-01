"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Notification({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}: NotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={cn(
          "px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 max-w-sm",
          isAnimating
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0",
          type === "success"
            ? "bg-green-950/90 border-green-800 text-green-100"
            : "bg-red-950/90 border-red-800 text-red-100",
        )}
      >
        <div className="flex items-center space-x-2">
          {type === "success" ? (
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
