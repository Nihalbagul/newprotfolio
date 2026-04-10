import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

const FloatingOrb = ({ position, color, speed = 1, size = 1, opacity = 0.2 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        transparent
        opacity={opacity}
      />
    </Sphere>
  );
};

const FloatingOrbs = () => {
  return (
    <>
      <FloatingOrb position={[5, 2, -5]} color="#8b5cf6" speed={0.5} size={1.5} opacity={0.2} />
      <FloatingOrb position={[-5, -1, -3]} color="#3b82f6" speed={0.7} size={1.2} opacity={0.15} />
      <FloatingOrb position={[3, -2, -4]} color="#ec4899" speed={0.6} size={1} opacity={0.18} />
      <FloatingOrb position={[-3, 3, -6]} color="#10b981" speed={0.4} size={0.8} opacity={0.12} />
    </>
  );
};

export default FloatingOrbs;

