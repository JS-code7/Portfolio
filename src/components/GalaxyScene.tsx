import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const skills = [
  { name: "Microsoft Azure", color: "#00bcd4", radius: 3, speed: 0.3, offset: 0 },
  { name: "Arduino IDE", color: "#00e5ff", radius: 4, speed: 0.25, offset: 1 },
  { name: "Data Monitoring", color: "#18ffff", radius: 3.5, speed: 0.35, offset: 2 },
  { name: "Cybersecurity", color: "#00b8d4", radius: 5, speed: 0.2, offset: 3 },
  { name: "Web Development", color: "#26c6da", radius: 4.5, speed: 0.28, offset: 4 },
  { name: "AI Fundamentals", color: "#4dd0e1", radius: 3.8, speed: 0.32, offset: 5 },
];

function SkillNode({ name, color, radius, speed, offset }: typeof skills[0]) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.5) * 0.8;
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.35 : 0.25, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.5}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/SpaceGrotesk-Medium.ttf"
        >
          {name}
        </Text>
      )}
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00bcd4" transparent opacity={0.6} />
    </points>
  );
}

function CenterCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color="#00bcd4"
        emissive="#00bcd4"
        emissiveIntensity={0.8}
        wireframe
      />
    </mesh>
  );
}

const GalaxyScene = () => (
  <div className="w-full h-[500px] md:h-[600px]">
    <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00bcd4" />
      <CenterCore />
      {skills.map((skill) => (
        <SkillNode key={skill.name} {...skill} />
      ))}
      <Stars />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  </div>
);

export default GalaxyScene;
