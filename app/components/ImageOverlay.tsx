"use client";

import { useRef, useState } from "react";

interface ImageOverlayProps {
  imageUrl: string;
  opacity: number;
}

export default function ImageOverlay({ imageUrl, opacity }: ImageOverlayProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pinchRef = useRef({ initialDistance: 0, initialScale: 1 });
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  function getTouchDistance(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      dragRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startPosX: position.x,
        startPosY: position.y,
      };
    } else if (e.touches.length === 2) {
      pinchRef.current = {
        initialDistance: getTouchDistance(e.touches),
        initialScale: scale,
      };
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + dx,
        y: dragRef.current.startPosY + dy,
      });
    } else if (e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches);
      const newScale =
        pinchRef.current.initialScale *
        (currentDistance / pinchRef.current.initialDistance);
      setScale(Math.min(5, Math.max(0.2, newScale)));
    }
  }

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => {}}
    >
      <img
        src={imageUrl}
        alt="Trace overlay"
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          opacity,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
