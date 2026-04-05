"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Float,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function JejuIsland() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/jeju.glb");

  useFrame((state) => {
    if (!group.current) return;
    const { x } = state.mouse;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.5,
      0.1,
    );
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0}>
        <primitive object={scene} scale={1.5} />
      </Float>
    </group>
  );
}

export default function JejuCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
        <ambientLight intensity={1.8} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, 5, -10]} intensity={1} />
        <JejuIsland />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 3.0} // 위에서 내려다보는 최대 각도
          maxPolarAngle={Math.PI / 3.0} // 이 각도 이하로는 내려가지 않음 (바닥 안 보임)
        />
      </Canvas>
    </div>
  );
}
