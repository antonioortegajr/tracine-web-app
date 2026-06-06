"use client";

import { useState } from "react";
import { removeBackground } from "@imgly/background-removal";

type BgRemoveButtonProps = {
  imageUrl: string;
  onResult: (dataUrl: string) => void;
  onError: () => void;
};

export default function BgRemoveButton({ imageUrl, onResult, onError }: BgRemoveButtonProps) {
  const [processing, setProcessing] = useState(false);

  async function handleRemove() {
    setProcessing(true);
    try {
      const blob = await removeBackground(imageUrl);
      const reader = new FileReader();
      reader.onload = () => {
        onResult(reader.result as string);
        setProcessing(false);
      };
      reader.onerror = () => {
        onError();
        setProcessing(false);
      };
      reader.readAsDataURL(blob);
    } catch {
      onError();
      setProcessing(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={processing}
      className="fixed bottom-safe-or-6 right-6 z-20 min-w-[44px] min-h-[44px]
        bg-white/90 rounded-full px-4 py-2 text-black font-medium text-sm
        shadow-md active:bg-white/70 disabled:opacity-50 cursor-pointer
        disabled:cursor-not-allowed"
    >
      {processing ? "Removing\u2026" : "Remove BG"}
    </button>
  );
}
