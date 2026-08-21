import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useRef, useState, memo, useMemo } from "react";

import  Room  from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import FloatingOrbs from "../FloatingOrbs";
import { Suspense } from "react";

// Safe EffectComposer wrapper that checks for valid render target
const SafeEffectComposer = () => {
  const { gl, scene, camera } = useThree();
  const [isReady, setIsReady] = useState(false);
  const composerRef = useRef(null);

  useEffect(() => {
    // Wait for the renderer to be fully initialized and check render target
    const checkReady = () => {
      try {
        if (!gl || !scene || !camera) return false;
        if (!gl.domElement) return false;

        // Check if WebGL context is valid using the renderer's own context
        // (requesting a new context type via canvas.getContext() here would
        // conflict with the webgl2 context three.js already created)
        const context = gl.getContext?.();
        if (context && context.isContextLost && context.isContextLost()) {
          return false;
        }

          // Check if renderer has a valid render target
          const renderTarget = gl.getRenderTarget();
          if (renderTarget === null || (renderTarget && renderTarget.texture)) {
            setIsReady(true);
            return true;
        }
      } catch (error) {
        console.warn('EffectComposer initialization check failed:', error);
      }
      return false;
    };

    // Try immediately first
    if (checkReady()) return;

    // Then try after a delay
    const timer = setTimeout(() => {
      if (!checkReady()) {
        // If still not ready, try one more time
        setTimeout(() => {
          checkReady();
        }, 300);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [gl, scene, camera]);

  // Cleanup on unmount
  useEffect(() => {
    const composer = composerRef.current;
    return () => {
      if (composer) {
        try {
          composer.dispose?.();
        } catch {
          // Ignore disposal errors
        }
      }
    };
  }, []);

  if (!isReady) return null;

  try {
    return (
      <EffectComposer ref={composerRef}>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    );
  } catch (error) {
    console.warn('EffectComposer render error:', error);
    return null;
  }
};

// Component to adjust camera aspect ratio
const CameraController = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    if (!camera || !size) return;
    
    try {
      // Keep stable perspective and only update aspect.
      const aspect = size.width / size.height;
      if (isNaN(aspect) || aspect <= 0) return;
      
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    } catch (error) {
      console.warn('Error updating camera:', error);
    }
  }, [size, camera]);
  
  return null;
};

// Component for smooth back-and-forth rotation animation
const AnimatedRoom = memo(({ scale, position, rotation, isMobile, enableRotation = false }) => {
  const groupRef = useRef();
  // Convert rotation from degrees to radians
  const rotationRad = rotation.map(deg => (deg * Math.PI) / 180);
  const baseRotationY = rotationRad[1]; // Y rotation in radians
  const lastTime = useRef(0);
  
  useFrame((state) => {
    if (groupRef.current && !isMobile && enableRotation) {
      // Throttle animation updates for better performance
      const currentTime = state.clock.elapsedTime;
      if (currentTime - lastTime.current < 0.016) return; // ~60fps
      lastTime.current = currentTime;
      
      // Create a smooth back-and-forth rotation
      // Rotates from base Y rotation to base Y rotation + 0.2 (right) and back
      const rotationAmount = Math.sin(currentTime * 0.5) * 0.2; // Adjust speed and range
      groupRef.current.rotation.y = baseRotationY + rotationAmount;
      // Keep X and Z rotations as set
      groupRef.current.rotation.x = rotationRad[0];
      groupRef.current.rotation.z = rotationRad[2];
    }
  });
  
  // Update position, scale, and rotation when props change
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      if (Array.isArray(scale)) {
        groupRef.current.scale.set(...scale);
      } else {
        groupRef.current.scale.set(scale, scale, scale);
      }
      // Set rotation (convert degrees to radians)
      // Only set rotation directly if animation is disabled
      if (!enableRotation || isMobile) {
        groupRef.current.rotation.set(
          rotationRad[0],
          rotationRad[1],
          rotationRad[2]
        );
      } else {
        // When rotation is enabled, set X and Z, Y will be animated
        groupRef.current.rotation.x = rotationRad[0];
        groupRef.current.rotation.z = rotationRad[2];
      }
    }
  }, [position, scale, rotation, rotationRad, enableRotation, isMobile]);
  
  return (
    <group
      ref={groupRef}
      scale={scale}
      position={position}
      rotation={rotationRad}
    >
      <Room />
    </group>
  );
});

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef(null);
  
  // Memoize values to prevent unnecessary re-renders
  const position = useMemo(() => [-0.35, -2.45, -0.55], []);
  const scale = useMemo(() => isMobile ? [0.82, 0.9, 0.82] : [0.9, 1.0, 0.9], [isMobile]);
  const rotation = useMemo(() => [0, -12, 0], []); // Rotation in degrees
  const enableRotation = true; // Rotation enabled by default
  const particleCount = useMemo(() => isMobile ? 34 : 80, [isMobile]);
  const effectsEnabled = !isMobile;

  // Intersection Observer to pause rendering when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ position: [-13.5, 6.2, 14.5], fov: 45 }}
        gl={{ 
          antialias: !isMobile,
          alpha: true,
          powerPreference: isMobile ? "default" : "high-performance",
          stencil: false,
          depth: true
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '100%',
          display: 'block',
          margin: 0,
          padding: 0,
          position: 'relative'
        }}
        frameloop={isVisible ? "always" : "demand"}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        performance={{ min: 0.5 }}
      >
      {/* Enhanced lighting */}
      <ambientLight intensity={0.4} color="#1a1a40" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#3b82f6" />
      
      {/* Configure OrbitControls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.25}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 6}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
        target={[0.5, -1.2, 0]}
        makeDefault
      />

      <CameraController />
      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={particleCount} />
        {!isMobile && <FloatingOrbs />}
        <AnimatedRoom
          scale={scale}
          position={position}
          rotation={rotation}
          isMobile={isMobile}
          enableRotation={enableRotation}
        />
      </Suspense>

      {/* Post-processing effects - only render when scene is ready */}
      {effectsEnabled && (
        <Suspense fallback={null}>
          <SafeEffectComposer />
        </Suspense>
      )}
    </Canvas>
    </div>
  );
};

export default memo(HeroExperience);




// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { useMediaQuery } from '@mui/material';
// import Room from './Room.jsx';

// const Heroexperience = () => {
//   const isTablet = useMediaQuery('(max-width:1024px)');
//   const isMobile = useMediaQuery('(max-width:768px)');

//   return (
//     <Canvas orthographic camera={{ zoom: 60, position: [-5, 0, 10] }}>
//       {/* Lighting */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 5]} intensity={1.2} />

//       {/* Orbit Controls with freedom but still constrained for isometric feel */}
//       <OrbitControls
//         enableZoom={!isTablet}
//         enablePan={false}
//         minPolarAngle={Math.PI / 6} // ~30°
//         maxPolarAngle={Math.PI / 2.5} // ~72°
//         rotateSpeed={0.8}
//       />
//       {/* 3D Model */}
//       <Room position={[0, -5, 0]} />

//     </Canvas>
//   );
// };

// export default Heroexperience;
