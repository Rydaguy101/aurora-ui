"use client";

import { useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useFibonacciSphere, useSpin, WebGLStage } from "@/components/ui/webgl-stage";

interface WebGLGlobeProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  size?: number;
  radius?: number;
}

function GlobeScene({
  count,
  color,
  speed,
  size,
  radius,
}: Required<Omit<WebGLGlobeProps, "className">>) {
  const groupRef = useRef<THREE.Group>(null);
  const positions = useFibonacciSphere(count, radius);

  useSpin(groupRef, speed * 0.35);

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color={color} />
      <pointLight position={[-4, -2, -3]} intensity={0.4} color="#22d3ee" />

      <group ref={groupRef}>
        <Points positions={positions} frustumCulled={false}>
          <PointMaterial
            transparent
            color={color}
            size={size}
            sizeAttenuation
            depthWrite={false}
            opacity={0.85}
          />
        </Points>

        <mesh>
          <sphereGeometry args={[radius * 0.92, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.04} wireframe />
        </mesh>
      </group>
    </>
  );
}

/** Interactive dotted globe rendered with WebGL — ideal for global/platform heroes. */
export function WebGLGlobe({
  className,
  count = 2400,
  color = "#a855f7",
  speed = 1,
  size = 0.025,
  radius = 1.35,
}: WebGLGlobeProps) {
  return (
    <WebGLStage className={cn(className)} cameraPosition={[0, 0, 4.5]}>
      <GlobeScene count={count} color={color} speed={speed} size={size} radius={radius} />
    </WebGLStage>
  );
}
