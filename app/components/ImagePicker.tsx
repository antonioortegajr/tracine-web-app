"use client";

import { useRef } from "react";

type Props = {
  onImageSelected: (dataUrl: string) => void;
};

export default function ImagePicker({ onImageSelected }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onImageSelected(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={undefined}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-safe pb-4 pt-4 px-6
          bg-white/90 rounded-t-xl text-black font-medium text-base
          min-w-[160px] min-h-[44px] active:bg-white/70 cursor-pointer"
      >
        Choose Photo
      </button>
    </>
  );
}
