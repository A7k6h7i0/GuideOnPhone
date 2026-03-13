"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";

interface WebcamCaptureProps {
  onCapture: (imageBase64: string) => void;
  capturedImage?: string;
  width?: number;
  height?: number;
}

export function WebcamCapture({ onCapture, capturedImage, width = 400, height = 300 }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = useCallback(async () => {
    try {
      setError("");
      
      // Stop any existing stream
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode: facingMode,
          frameRate: { ideal: 30 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err: unknown) {
      console.error("Camera error:", err);
      const error = err as Error;
      if (error.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permission.");
      } else if (error.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError("Failed to access camera. Please try again.");
      }
      setIsStreaming(false);
    }
  }, [facingMode, width, height, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Flip the image horizontally for selfie view
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBase64 = canvas.toDataURL("image/jpeg", 0.9);
    onCapture(imageBase64);
    stopCamera();
  }, [onCapture, stopCamera]);

  const switchCamera = useCallback(async () => {
    setFacingMode((prev) => prev === "user" ? "environment" : "user");
  }, []);

  const retakePhoto = useCallback(() => {
    onCapture("");
    startCamera();
  }, [onCapture, startCamera]);

  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isStreaming) {
      stopCamera();
      startCamera();
    }
  }, [facingMode]);

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="relative overflow-hidden rounded-xl bg-gray-900">
        {isStreaming && !capturedImage && (
          <video
            ref={videoRef}
            className="h-auto w-full rounded-xl"
            playsInline
            muted
            style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
          />
        )}

        {capturedImage && (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="h-auto w-full rounded-xl"
            />
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {isStreaming && !capturedImage && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              type="button"
              onClick={capturePhoto}
              className="rounded-full bg-white px-8 py-3 text-gray-900 hover:bg-gray-100"
            >
              📸 Capture
            </Button>
            <Button
              type="button"
              onClick={switchCamera}
              className="rounded-full bg-white/80 px-4 py-3 text-gray-900 hover:bg-white"
              title="Switch camera"
            >
              🔄
            </Button>
          </div>
        )}

        {!isStreaming && !capturedImage && !error && (
          <div className="flex h-64 w-full items-center justify-center text-white">
            <div className="text-center">
              <div className="mb-2 text-4xl">📷</div>
              <p>Starting camera...</p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
        <p className="font-medium">📋 Instructions:</p>
        <ul className="mt-1 list-inside list-disc">
          <li>Position your face in the center of the frame</li>
          <li>Ensure good lighting on your face</li>
          <li>Remove glasses or hat if possible</li>
          <li>Look directly at the camera</li>
        </ul>
      </div>

      {capturedImage && (
        <Button
          type="button"
          onClick={retakePhoto}
          variant="secondary"
          className="w-full"
        >
          🔄 Retake Photo
        </Button>
      )}
    </div>
  );
}
