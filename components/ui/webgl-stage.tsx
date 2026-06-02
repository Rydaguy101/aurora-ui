"use client";

import { Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import type { Object3D } from "three";
import { cn } from "@/lib/utils";

interface WebGLStageProps {
  children: ReactNode;
  className?: string;
  orthographic?: boolean;
  cameraPosition?: [number, number, number];
  zoom?: number;
}

export function WebGLStage({
  children,
  className,
  orthographic = false,
  cameraPosition = [0, 0, 4],
  zoom = 80,
}: WebGLStageProps) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className={cn("relative h-full min-h-[inherit] w-full", className)}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true }}
        orthographic={orthographic}
        style={{ width: "100%", height: "100%" }}
        camera={
          orthographic
            ? { zoom, position: cameraPosition }
            : { fov: 45, position: cameraPosition, near: 0.1, far: 100 }
        }
      >
        <PerformanceMonitor
          bounds={() => [30, 58]}
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export function createFibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_RATIO * index * Math.PI * 2;
    positions[index * 3] = Math.cos(theta) * ringRadius * radius;
    positions[index * 3 + 1] = y * radius;
    positions[index * 3 + 2] = Math.sin(theta) * ringRadius * radius;
  }

  return positions;
}

export function useFibonacciSphere(count: number, radius: number) {
  return useMemo(() => createFibonacciSphere(count, radius), [count, radius]);
}

export function useSpin(ref: React.RefObject<Object3D | null>, speed: number) {
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
}
