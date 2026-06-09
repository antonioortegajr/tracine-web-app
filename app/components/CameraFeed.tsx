"use client";

import { useRef, useEffect, useState } from "react";

type CameraState = "loading" | "active" | "error";

interface CameraFeedProps {
  zoom?: number;
}

function getPlatformInstructions(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    if (/CriOS/i.test(ua)) return "Settings → Chrome → Camera → Allow";
    return "Settings → Safari → Camera → Allow";
  }
  if (/Android/i.test(ua)) {
    return "Tap the lock icon in the address bar → Site settings → Camera → Allow";
  }
  return "Check your browser settings to allow camera access";
}

export default function CameraFeed({ zoom = 1 }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryFailed, setRetryFailed] = useState(false);

  async function startCamera() {
    stopStream();
    setState("loading");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setState("active");
      setRetryFailed(false);
    } catch {
      setState("error");
      setErrorMessage(
        "Camera unavailable — please allow camera access",
      );
    }
  }

  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  function handleRetry() {
    setRetryFailed(true);
    startCamera();
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startCamera();

    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-dvh bg-white overflow-hidden">
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black" />
      )}

      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black px-4 gap-4">
          <p className="text-white text-center text-sm">{errorMessage}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm active:scale-95 transition-transform"
          >
            Try again
          </button>
          {retryFailed && (
            <p className="text-neutral-400 text-center text-xs max-w-xs">
              {getPlatformInstructions()}
            </p>
          )}
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover ${state !== "active" ? "hidden" : ""}`}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
