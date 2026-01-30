"use client";

import { useRef, useState, useEffect } from "react";
import { Button, Stack, Text, Paper } from "@mantine/core";

type Props = {
  onCapture?: (dataUrl: string) => void;
  onSkip?: () => void;
};

export function CameraCapture({ onCapture, onSkip }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setSupported(false);
      setError("Prohlížeč nepodporuje přístup ke kameře.");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        setError("Nepodařilo se zapnout kameru. Zkontrolujte oprávnění.");
        setSupported(false);
      });
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capture = () => {
    if (!videoRef.current || !supported) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    setCaptured(dataUrl);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture?.(dataUrl);
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <Text size="sm" fw={500}>
          Pořídit fotku dokumentu (volitelné)
        </Text>
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
        {supported && !captured && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", maxHeight: 300, borderRadius: 8, background: "#000" }}
            />
            <Button onClick={capture}>Pořídit snímek</Button>
          </>
        )}
        {captured && (
          <>
            <img
              src={captured}
              alt="Pořízený snímek"
              style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }}
            />
            <Text size="xs" c="dimmed">
              Snímek byl pořízen. Můžete pokračovat.
            </Text>
          </>
        )}
        {onSkip && (
          <Button variant="subtle" size="sm" onClick={onSkip}>
            Přeskočit
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
