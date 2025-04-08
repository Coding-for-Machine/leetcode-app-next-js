'use client'

import React from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

export function SparklesCore(props: any) {
  const ref = React.useRef<any>();
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <pointsMaterial
          color="#3B82F6"
          size={0.015}
          sizeAttenuation={true}
          dethWrite={false}
        />
      </Points>
    </group>
  );
}