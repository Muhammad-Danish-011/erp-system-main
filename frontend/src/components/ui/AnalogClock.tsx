"use client";

import { useEffect, useRef } from "react";

export function AnalogClock({ timezone, label }: { timezone: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let frameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    // Reset transform matrix before any drawing
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    const radius = canvas.height / 2;
    ctx.translate(radius, radius);

    function drawHand(
      ctx: CanvasRenderingContext2D,
      pos: number,
      length: number,
      width: number,
      color: string
    ) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.rotate(-pos);
    }

    function drawClock() {
      // Reset transform matrix at the start of each draw
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(radius, radius);

      const now = new Date();
      const localTime = new Date(
        now.toLocaleString('en-US', { timeZone: timezone })
      );
      ctx.clearRect(-radius, -radius, canvas!.width, canvas!.height);

      // Clock face
      const gradient = ctx.createRadialGradient(
        0, 0, radius * 0.95,
        0, 0, radius * 0.05
      );
      gradient.addColorStop(0, '#f0f0f0');
      gradient.addColorStop(0.5, '#fff');
      gradient.addColorStop(1, '#f0f0f0');
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Hour marks
      ctx.lineWidth = 3;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.rotate(angle);
        ctx.moveTo(radius * 0.8, 0);
        ctx.lineTo(radius * 0.9, 0);
        ctx.stroke();
        ctx.rotate(-angle);
      }

      // Minute marks
      ctx.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
          const angle = (i * Math.PI) / 30;
          ctx.beginPath();
          ctx.rotate(angle);
          ctx.moveTo(radius * 0.85, 0);
          ctx.lineTo(radius * 0.9, 0);
          ctx.stroke();
          ctx.rotate(-angle);
        }
      }

      // Numbers
      ctx.font = `bold ${radius * 0.18}px Arial`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';
      for (let num = 1; num <= 12; num++) {
        const ang = (num * Math.PI) / 6;
        const x = Math.sin(ang) * (radius * 0.7);
        const y = -Math.cos(ang) * (radius * 0.7);
        ctx.fillText(num.toString(), x, y);
      }

      // Center circle
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();

      // Hands
      const hour = localTime.getHours() % 12;
      const minute = localTime.getMinutes();
      const second = localTime.getSeconds();

      drawHand(ctx, ((hour + minute / 60) * Math.PI) / 6, radius * 0.5, 8, '#333');
      drawHand(ctx, (minute * Math.PI) / 30, radius * 0.7, 5, '#666');
      drawHand(ctx, (second * Math.PI) / 30, radius * 0.8, 2, '#f00');

      frameId = requestAnimationFrame(drawClock);
    }

    drawClock();

    return () => {
      cancelAnimationFrame(frameId);
      // Reset transform matrix on cleanup
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [timezone]);

  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
      <canvas ref={canvasRef} width={200} height={200}></canvas>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}
