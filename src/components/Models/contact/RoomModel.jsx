import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RoomModel = () => {
  const { scene, error } = useGLTF('/models/tiny_isometric_room.glb');
  const modelRef = useRef();

  useEffect(() => {
    if (error) {
      console.error('Error loading model:', error);
      return;
    }

    if (scene) {
      // Calculate bounding box and center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Calculate appropriate scale - make it smaller
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim > 0 ? 1.5 / maxDim : 1;
      
      if (modelRef.current) {
        modelRef.current.scale.set(scale, scale, scale);
        modelRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      }
      
      // Traverse and adjust materials to eliminate all dark marks
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false; // Disable shadows completely
          child.receiveShadow = false;
          // Make sure material is visible and properly lit
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat) {
                  mat.needsUpdate = true;
                  // Remove any emissive that might cause issues
                  if (mat.emissive) mat.emissive.setHex(0x000000);
                  // Ensure material is not too dark - more aggressive lightening
                  if (mat.color) {
                    const currentColor = mat.color;
                    // Lighten any dark materials significantly
                    if (currentColor.r < 0.4 || currentColor.g < 0.4 || currentColor.b < 0.4) {
                      mat.color.multiplyScalar(1.5);
                    }
                    // Ensure minimum brightness
                    mat.color.r = Math.max(mat.color.r, 0.2);
                    mat.color.g = Math.max(mat.color.g, 0.2);
                    mat.color.b = Math.max(mat.color.b, 0.2);
                  }
                  // Increase material roughness for better light reflection
                  if (mat.roughness !== undefined) {
                    mat.roughness = Math.min(mat.roughness, 0.8);
                  }
                }
              });
            } else {
              child.material.needsUpdate = true;
              if (child.material.emissive) child.material.emissive.setHex(0x000000);
              // Ensure material is not too dark - more aggressive lightening
              if (child.material.color) {
                const currentColor = child.material.color;
                // Lighten any dark materials significantly
                if (currentColor.r < 0.4 || currentColor.g < 0.4 || currentColor.b < 0.4) {
                  child.material.color.multiplyScalar(1.5);
                }
                // Ensure minimum brightness
                child.material.color.r = Math.max(child.material.color.r, 0.2);
                child.material.color.g = Math.max(child.material.color.g, 0.2);
                child.material.color.b = Math.max(child.material.color.b, 0.2);
              }
              // Increase material roughness for better light reflection
              if (child.material.roughness !== undefined) {
                child.material.roughness = Math.min(child.material.roughness, 0.8);
              }
            }
          }
        }
      });
    }
  }, [scene, error]);

  // No auto-rotation - full manual control

  if (error) {
    console.error('Model loading error:', error);
    return (
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (!scene) {
    return <LoadingFallback />;
  }

  return (
    <group ref={modelRef}>
      <primitive object={scene.clone()} />
    </group>
  );
};

const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
};

// Preload the model
useGLTF.preload('/models/tiny_isometric_room.glb');

export default RoomModel;
