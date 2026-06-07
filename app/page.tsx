"use client";

import { useState, useCallback } from "react";
import BgRemoveButton from "./components/BgRemoveButton";
import CameraFeed from "./components/CameraFeed";
import ImageOverlay from "./components/ImageOverlay";
import ImagePicker from "./components/ImagePicker";
import OpacitySlider from "./components/OpacitySlider";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [cameraZoom, setCameraZoom] = useState(1);

  const handleCameraZoom = useCallback((zoom: number) => {
    setCameraZoom(zoom);
  }, []);

  return (
    <div className="relative w-full h-dvh overflow-hidden">
      <CameraFeed zoom={cameraZoom} />
      {selectedImage && (
        <ImageOverlay
          key={selectedImage}
          imageUrl={selectedImage}
          opacity={overlayOpacity}
          cameraZoom={cameraZoom}
          onCameraZoom={handleCameraZoom}
        />
      )}
      {selectedImage && <OpacitySlider opacity={overlayOpacity} onChange={setOverlayOpacity} />}
      {selectedImage && (
        <BgRemoveButton
          imageUrl={selectedImage}
          onResult={setSelectedImage}
          onError={() => {}}
        />
      )}
      <ImagePicker onImageSelected={setSelectedImage} />
    </div>
  );
}
