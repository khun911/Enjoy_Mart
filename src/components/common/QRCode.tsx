"use client";

import React from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  centerLogo?: boolean;
}

export default function QRCode({
  value,
  size = 200,
  className = "",
  centerLogo = true,
}: QRCodeProps) {
  // Deterministic 25x25 matrix module generator
  const matrixSize = 25;
  const matrix: boolean[][] = Array.from({ length: matrixSize }, () =>
    Array(matrixSize).fill(false)
  );

  // Helper to draw a position detection pattern (7x7)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[startY + r][startX + c] = isOuter || isCenter;
      }
    }
  };

  // 1. Position detection finders (Top-Left, Top-Right, Bottom-Left)
  drawFinder(0, 0);
  drawFinder(matrixSize - 7, 0);
  drawFinder(0, matrixSize - 7);

  // 2. Timing patterns
  for (let i = 7; i < matrixSize - 7; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // 3. Alignment pattern (5x5 around 16,16)
  const alignX = 16;
  const alignY = 16;
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isBorder = Math.abs(r) === 2 || Math.abs(c) === 2;
      const isCenterDot = r === 0 && c === 0;
      matrix[alignY + r][alignX + c] = isBorder || isCenterDot;
    }
  }

  // 4. Fill remaining data modules based on hash of input string
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip top-left, top-right, bottom-left finders
      const inTL = r < 8 && c < 8;
      const inTR = r < 8 && c >= matrixSize - 8;
      const inBL = r >= matrixSize - 8 && c < 8;
      const inCenterLogo = r >= 10 && r <= 14 && c >= 10 && c <= 14;
      const inTiming = r === 6 || c === 6;
      const inAlign = Math.abs(r - alignY) <= 2 && Math.abs(c - alignX) <= 2;

      if (inTL || inTR || inBL || inCenterLogo || inTiming || inAlign) {
        continue;
      }

      // Pseudo-random pseudo-hashing for stable realistic QR module distribution
      const charCode = value.charCodeAt((r * matrixSize + c) % value.length) || 42;
      const seed = (r * 31 + c * 17 + charCode * 13) % 100;
      matrix[r][c] = seed > 45;
    }
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${matrixSize} ${matrixSize}`}
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <rect width={matrixSize} height={matrixSize} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((filled, c) =>
            filled ? (
              <rect
                key={`${r}-${c}`}
                x={c}
                y={r}
                width={1}
                height={1}
                fill="#0f172a"
              />
            ) : null
          )
        )}
      </svg>

      {/* Center Brand / KHQR Badge */}
      {centerLogo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-md border-2 border-white">
            <span className="tracking-tighter">EM</span>
          </div>
        </div>
      )}
    </div>
  );
}
