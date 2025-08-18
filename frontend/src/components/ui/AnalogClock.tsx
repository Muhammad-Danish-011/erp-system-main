"use client";

import { useEffect, useRef } from "react";

export function AnalogClock({ timezone, label }: { timezone: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // @ts-ignore
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // This handles the null case

    const radius = canvas.height / 2;
    // @ts-ignore
    ctx.translate(radius, radius);

    function drawHand(
      // @ts-ignore
      ctx: CanvasRenderingContext2D,
      pos: number,
      length: number,
      width: number,
      color: string
    ) {
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.lineWidth = width;
      // @ts-ignore
      ctx.lineCap = 'round';
      // @ts-ignore
      ctx.moveTo(0, 0);
      // @ts-ignore
      ctx.rotate(pos);
      // @ts-ignore
      ctx.lineTo(0, -length);
      // @ts-ignore
      ctx.strokeStyle = color;
      // @ts-ignore
      ctx.stroke();
      // @ts-ignore
      ctx.rotate(-pos);
    }

    function drawClock() {
      const now = new Date();
      const localTime = new Date(
        now.toLocaleString('en-US', { timeZone: timezone })
      );
      // @ts-ignore
      ctx.clearRect(-radius, -radius, canvas.width, canvas.height);

      // Clock face
      // @ts-ignore
      const gradient = ctx.createRadialGradient(
        0, 0, radius * 0.95,
        0, 0, radius * 0.05
      );
      // @ts-ignore
      gradient.addColorStop(0, '#f0f0f0');
      // @ts-ignore
      gradient.addColorStop(0.5, '#fff');
      // @ts-ignore
      gradient.addColorStop(1, '#f0f0f0');
      // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
      // @ts-ignore
      ctx.fillStyle = gradient;
      // @ts-ignore
      ctx.fill();
      // @ts-ignore
      ctx.strokeStyle = '#666';
      // @ts-ignore
      ctx.lineWidth = 5;
      // @ts-ignore
      ctx.stroke();

      // Hour marks
      // @ts-ignore
      ctx.lineWidth = 3;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        // @ts-ignore
        ctx.beginPath();
        // @ts-ignore
        ctx.rotate(angle);
        // @ts-ignore
        ctx.moveTo(radius * 0.8, 0);
        // @ts-ignore
        ctx.lineTo(radius * 0.9, 0);
        // @ts-ignore
        ctx.stroke();
        // @ts-ignore
        ctx.rotate(-angle);
      }
      // Minute marks
          // @ts-ignore
      ctx.lineWidth = 1;
      // @ts-ignore
      for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          const angle = (i * Math.PI) / 30;
              // @ts-ignore
          ctx.beginPath();
          // @ts-ignore
          ctx.rotate(angle);
          // @ts-ignore
          ctx.moveTo(radius * 0.85, 0);
          // @ts-ignore
          ctx.lineTo(radius * 0.9, 0);
          // @ts-ignore
          ctx.stroke();
          // @ts-ignore
          ctx.rotate(-angle);
          // @ts-ignore
        }
      }

      // Numbers
          // @ts-ignore
      ctx.font = `bold ${radius * 0.18}px Arial`;
      // @ts-ignore
      ctx.textBaseline = 'middle';
      // @ts-ignore
      ctx.textAlign = 'center';
      // @ts-ignore
      ctx.fillStyle = '#000';
      // @ts-ignore
      for (let num = 1; num <= 12; num++) {
        const ang = (num * Math.PI) / 6;
        const x = Math.sin(ang) * (radius * 0.7);
        const y = -Math.cos(ang) * (radius * 0.7);
            // @ts-ignore
        ctx.fillText(num.toString(), x, y);
        // @ts-ignore
      }

      // Center circle
          // @ts-ignore
      ctx.beginPath();
      // @ts-ignore
      ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
      // @ts-ignore
      ctx.fillStyle = '#333';
      // @ts-ignore
      ctx.fill();
      // @ts-ignore

      // Hands
      const hour = localTime.getHours() % 12;
      const minute = localTime.getMinutes();
      const second = localTime.getSeconds();
    // @ts-ignore
      drawHand(ctx, ((hour + minute / 60) * Math.PI) / 6, radius * 0.5, 8, '#333');
          // @ts-ignore
        
      drawHand(ctx, (minute * Math.PI) / 30, radius * 0.7, 5, '#666');
          // @ts-ignore
      drawHand(ctx, (second * Math.PI) / 30, radius * 0.8, 2, '#f00');
    }

    const interval = setInterval(drawClock, 1000);
    drawClock();

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
      <canvas ref={canvasRef} width={200} height={200}></canvas>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}
