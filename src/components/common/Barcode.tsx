"use client";

import React from "react";

interface BarcodeProps {
  value: string;
  className?: string;
  height?: number;
  showText?: boolean;
}

export default function Barcode({
  value,
  className = "",
  height = 42,
  showText = true,
}: BarcodeProps) {
  // Deterministically generate bar patterns based on the characters
  // Similar to Code 128 / EAN patterns
  const patterns: number[] = [2, 1, 3, 1, 1, 2, 1, 3]; // Guard bars

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    patterns.push((code % 3) + 1); // bar
    patterns.push(((code >> 1) % 2) + 1); // space
    patterns.push(((code >> 2) % 3) + 1); // bar
    patterns.push(1); // space
  }

  // End guard bars
  patterns.push(3, 1, 2, 1, 1, 3, 2);

  let currentX = 10;
  const rects: { x: number; width: number }[] = [];

  for (let i = 0; i < patterns.length; i++) {
    const width = patterns[i] * 1.6;
    if (i % 2 === 0) {
      // Black bar
      rects.push({ x: currentX, width });
    }
    currentX += width;
  }

  const totalWidth = currentX + 10;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full max-w-[280px] h-auto overflow-visible"
        preserveAspectRatio="none"
        aria-label={`Barcode for ${value}`}
      >
        <rect width="100%" height="100%" fill="transparent" />
        {rects.map((rect, idx) => (
          <rect
            key={idx}
            x={rect.x}
            y={0}
            width={rect.width}
            height={height}
            fill="currentColor"
          />
        ))}
      </svg>
      {showText && (
        <span className="font-mono text-[10px] tracking-[0.25em] text-gray-600 mt-1 uppercase font-semibold">
          *{value}*
        </span>
      )}
    </div>
  );
}
