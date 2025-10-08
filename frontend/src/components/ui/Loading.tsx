"use client";

import React, { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 80;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const isGreen = progress >= 100;
  const isYellow = progress >= 60 && progress < 100;
  const isRed = progress < 60;

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-8">
        {/* Loading Text */}
        <h2 className="text-4xl font-bold text-white animate-pulse mb-8">
          Loading Your Experience...
        </h2>

        {/* Traffic Light */}
        <div className="flex flex-col items-center space-y-2 bg-gray-800/50 p-6 rounded-xl backdrop-blur-md">
          <div
            className={`w-12 h-12 rounded-full transition-all duration-500 ${
              isRed ? "bg-red-600 shadow-[0_0_20px_#FF0000]" : "bg-gray-600/50"
            }`}
          ></div>
          <div
            className={`w-12 h-12 rounded-full transition-all duration-500 ${
              isYellow ? "bg-yellow-400 shadow-[0_0_20px_#FFD700]" : "bg-gray-600/50"
            }`}
          ></div>
          <div
            className={`w-12 h-12 rounded-full transition-all duration-500 ${
              isGreen ? "bg-green-500 shadow-[0_0_20px_#00FF00]" : "bg-gray-600/50"
            }`}
          ></div>
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-white mb-2">{progress}%</p>
            <p className="text-gray-300">
              {progress < 60 && "Initializing..."}
              {progress >= 60 && progress < 100 && "Almost there..."}
              {progress >= 100 && "Ready!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
