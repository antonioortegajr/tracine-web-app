"use client";

import { useState } from "react";
import CameraFeed from "./components/CameraFeed";
import ImageOverlay from "./components/ImageOverlay";
import ImagePicker from "./components/ImagePicker";
import OpacitySlider from "./components/OpacitySlider";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  return (
    <div className="relative w-full h-dvh">
      <CameraFeed />
      {selectedImage && <ImageOverlay imageUrl={selectedImage} opacity={overlayOpacity} />}
      {selectedImage && <OpacitySlider opacity={overlayOpacity} onChange={setOverlayOpacity} />}
      <ImagePicker onImageSelected={setSelectedImage} />
    </div>
  );
}
