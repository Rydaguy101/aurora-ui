"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { WebGLStage } from "@/components/ui/webgl-stage";

interface WebGLParticleFieldProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  spread?: number;
  size?: number;
}

function ParticleFieldScene({
  count,
  color,
  speed,
  spread,
  size,
}: Required<Omit<WebGLParticleFieldProps, "className">>) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * spread;
      values[index * 3 + 1] = (Math.random() - 0.5) * spread;
      values[index * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return values;
  }, [count, spread]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * speed * 0.08;
    pointsRef.current.rotation.x += delta * speed * 0.03;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      pointer.y * 0.25,
      0.04
    );
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(
      pointsRef.current.rotation.y,
      pointer.x * 0.35 + state.clock.elapsedTime * speed * 0.08,
      0.04
    );
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <Points ref={pointsRef} positions={positions} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
    </>
  );
}

/** Depth-filled WebGL particle field with subtle cursor parallax for hero sections. */
export function WebGLParticleField({
  className,
  count = 1200,
  color = "#a855f7",
  speed = 1,
  spread = 6,
  size = 0.03,
}: WebGLParticleFieldProps) {
  return (
    <WebGLStage className={cn(className)} cameraPosition={[0, 0, 5]}>
      <ParticleFieldScene count={count} color={color} speed={speed} spread={spread} size={size} />
    </WebGLStage>
  );
}
