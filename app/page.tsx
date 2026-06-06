"use client";

import { useState } from "react";
import CameraFeed from "./components/CameraFeed";
import ImageOverlay from "./components/ImageOverlay";
import ImagePicker from "./components/ImagePicker";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="relative w-full h-dvh">
      <CameraFeed />
      {selectedImage && <ImageOverlay imageUrl={selectedImage} opacity={1} />}
      <ImagePicker onImageSelected={setSelectedImage} />
    </div>
  );
}
