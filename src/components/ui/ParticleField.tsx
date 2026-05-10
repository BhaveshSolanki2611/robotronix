"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";

function seededValue(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (seededValue(i * 3 + 1) - 0.5) * 20;
      const y = (seededValue(i * 3 + 2) - 0.5) * 15;
      const z = (seededValue(i * 3 + 3) - 0.5) * 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }
    return [pos, base];
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = seededValue(i + 5000) * 2 + 0.5;
    }
    return s;
  }, [count]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const posArr = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Slow drift
      posArr[i3] = basePositions[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.3;
      posArr[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.2 + i * 0.1) * 0.3;
      posArr[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.1 + i * 0.05) * 0.2;

      // Mouse repulsion
      const mx = mouse.current.x * viewport.width * 0.5;
      const my = mouse.current.y * viewport.height * 0.5;
      const dx = posArr[i3] - mx;
      const dy = posArr[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        const force = (2 - dist) * 0.5;
        posArr[i3] += (dx / dist) * force;
        posArr[i3 + 1] += (dy / dist) * force;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Camera parallax
    state.camera.position.x += (mouse.current.x * 0.5 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mouse.current.y * 0.3 - state.camera.position.y) * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0x00d4ff}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const count = isMobile ? 400 : 1500;

  if (reducedMotion) return null;

  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
