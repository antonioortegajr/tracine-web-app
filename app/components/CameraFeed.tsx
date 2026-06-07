"use client";

import { useRef, useEffect, useState } from "react";

type CameraState = "loading" | "active" | "error";

interface CameraFeedProps {
  zoom?: number;
}

export default function CameraFeed({ zoom = 1 }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [state, setState] = useState<CameraState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setState("active");
      } catch {
        if (!cancelled) {
          setState("error");
          setErrorMessage(
            "Camera unavailable — please allow camera access",
          );
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-dvh bg-black overflow-hidden">
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black" />
      )}

      {state === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black px-4">
          <p className="text-white text-center text-sm">{errorMessage}</p>
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
