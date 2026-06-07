"use client";

import { useRef, useState } from "react";

interface ImageOverlayProps {
  imageUrl: string;
  opacity: number;
  cameraZoom?: number;
  onCameraZoom?: (zoom: number) => void;
}

export default function ImageOverlay({ imageUrl, opacity, cameraZoom = 1, onCameraZoom }: ImageOverlayProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const pinchRef = useRef({ initialDistance: 0, initialScale: 1 });
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });
  const cameraPinchRef = useRef({ initialDistance: 0, initialZoom: 1 });
  const pinchModeRef = useRef<'overlay' | 'camera' | null>(null);
  const cameraZoomRef = useRef(1);
  cameraZoomRef.current = cameraZoom;

  function getTouchDistance(touches: React.TouchList) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  function getImageContentRect(img: HTMLImageElement): DOMRect | null {
    const rect = img.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = img;
    if (!naturalWidth || !naturalHeight) return null;
    const scaleX = rect.width / naturalWidth;
    const scaleY = rect.height / naturalHeight;
    const contentScale = Math.min(scaleX, scaleY);
    const contentWidth = naturalWidth * contentScale;
    const contentHeight = naturalHeight * contentScale;
    const offsetX = (rect.width - contentWidth) / 2;
    const offsetY = (rect.height - contentHeight) / 2;
    return new DOMRect(rect.left + offsetX, rect.top + offsetY, contentWidth, contentHeight);
  }

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 1) {
      dragRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startPosX: position.x,
        startPosY: position.y,
      };
    } else if (e.touches.length === 2 && imgRef.current) {
      const rect = getImageContentRect(imgRef.current);
      const bothInside =
        rect &&
        Array.from(e.touches).every(
          (t) =>
            t.clientX >= rect.left &&
            t.clientX <= rect.right &&
            t.clientY >= rect.top &&
            t.clientY <= rect.bottom,
        );

      if (bothInside) {
        pinchRef.current = {
          initialDistance: getTouchDistance(e.touches),
          initialScale: scale,
        };
        pinchModeRef.current = "overlay";
      } else {
        cameraPinchRef.current = {
          initialDistance: getTouchDistance(e.touches),
          initialZoom: cameraZoomRef.current,
        };
        pinchModeRef.current = "camera";
      }
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (pinchModeRef.current === "camera" && e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches);
      const newZoom =
        cameraPinchRef.current.initialZoom *
        (currentDistance / cameraPinchRef.current.initialDistance);
      onCameraZoom?.(Math.min(5, Math.max(1, newZoom)));
      return;
    }

    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - dragRef.current.startX;
      const dy = e.touches[0].clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.startPosX + dx,
        y: dragRef.current.startPosY + dy,
      });
    } else if (e.touches.length === 2 && pinchModeRef.current === "overlay") {
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
      onTouchEnd={() => { pinchModeRef.current = null; }}
      onTouchCancel={() => { pinchModeRef.current = null; }}
    >
      <img
        ref={imgRef}
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
