"use client";

import { useState } from "react";
import CameraFeed from "./components/CameraFeed";
import ImagePicker from "./components/ImagePicker";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (selectedImage) {
    console.log(selectedImage);
  }

  return (
    <div className="relative w-full h-dvh">
      <CameraFeed />
      <ImagePicker onImageSelected={setSelectedImage} />
    </div>
  );
}
