"use client";

interface ImageOverlayProps {
  imageUrl: string;
  opacity: number;
}

export default function ImageOverlay({ imageUrl, opacity }: ImageOverlayProps) {
  return (
    <img
      src={imageUrl}
      alt="Trace overlay"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      style={{ opacity }}
    />
  );
}
