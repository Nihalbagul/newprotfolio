import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import RoomModel from "./RoomModel";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";

const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
};

const CameraInfoDisplay = () => {
  const { camera } = useThree();
  const controlsRef = useRef();
  const [info, setInfo] = useState({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    distance: 0,
    target: [0, 0, 0],
  });

  useFrame(() => {
    if (camera) {
      const pos = camera.position;
      const rot = camera.rotation;
      const target = new THREE.Vector3(0, 0, 0);
      const distance = camera.position.distanceTo(target);
      
      setInfo({
        position: [pos.x.toFixed(2), pos.y.toFixed(2), pos.z.toFixed(2)],
        rotation: [
          (rot.x * (180 / Math.PI)).toFixed(2),
          (rot.y * (180 / Math.PI)).toFixed(2),
          (rot.z * (180 / Math.PI)).toFixed(2),
        ],
        distance: distance.toFixed(2),
        target: [target.x.toFixed(2), target.y.toFixed(2), target.z.toFixed(2)],
      });
    }
  });

  return null; // This component just updates state, display is handled outside
};

const CameraInfo = ({ info }) => {
  return (
    <div className="camera-info-card">
      <h3>📹 Camera & Model Info</h3>
      <div className="info-section">
        <div className="info-row">
          <span className="info-label">Camera Position:</span>
          <span className="info-value">
            [{info.position[0]}, {info.position[1]}, {info.position[2]}]
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Camera Rotation:</span>
          <span className="info-value">
            [{info.rotation[0]}°, {info.rotation[1]}°, {info.rotation[2]}°]
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Distance:</span>
          <span className="info-value">{info.distance}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Target:</span>
          <span className="info-value">
            [{info.target[0]}, {info.target[1]}, {info.target[2]}]
          </span>
        </div>
      </div>
      <div className="info-copy-section">
        <button 
          className="copy-button"
          onClick={() => {
            const text = `Camera Position: [${info.position.join(', ')}]\nCamera Rotation: [${info.rotation.join(', ')}]\nDistance: ${info.distance}\nTarget: [${info.target.join(', ')}]`;
            navigator.clipboard.writeText(text);
            alert('✅ Copied to clipboard!');
          }}
        >
          📋 Copy Values
        </button>
      </div>
    </div>
  );
};

const SceneWithInfo = () => {
  const [cameraInfo, setCameraInfo] = useState({
    position: [0, 2, 12],
    rotation: [0, 0, 0],
    distance: 12,
    target: [0, 0, 0],
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="camera-info-overlay">
        <CameraInfo info={cameraInfo} />
      </div>
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 12], fov: 40 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <CameraInfoUpdater setInfo={setCameraInfo} />
        
        {/* Lighting - Multiple lights to eliminate all dark spots */}
        <ambientLight intensity={2} />
        
        {/* Main directional lights from multiple angles */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={3}
          castShadow={false}
          color="#ffffff"
        />
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={2.5}
          color="#ffffff"
        />
        <directionalLight 
          position={[0, 10, 0]} 
          intensity={2}
          color="#ffffff"
        />
        <directionalLight 
          position={[5, 5, -5]} 
          intensity={2}
          color="#ffffff"
        />
        <directionalLight 
          position={[-5, 8, 5]} 
          intensity={2}
          color="#ffffff"
        />
        
        {/* Point lights for even coverage */}
        <pointLight 
          position={[0, 5, 2]} 
          intensity={2.5}
          color="#ffffff"
          distance={20}
        />
        <pointLight 
          position={[0, 3, 0]} 
          intensity={2}
          color="#fff4e6"
          distance={15}
        />
        <pointLight 
          position={[3, 4, 3]} 
          intensity={1.5}
          color="#ffffff"
          distance={15}
        />
        <pointLight 
          position={[-3, 4, 3]} 
          intensity={1.5}
          color="#ffffff"
          distance={15}
        />
        <pointLight 
          position={[0, 6, -3]} 
          intensity={1.5}
          color="#ffffff"
          distance={15}
        />
        
        {/* Hemisphere light for natural lighting */}
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#f0f0f0"
          intensity={1.5}
        />

        {/* Environment */}
        <Environment preset="sunset" />

        {/* Controls - Full manual control */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={50}
          autoRotate={false}
          target={[0, 0, 0]}
          dampingFactor={0.05}
          enableDamping={true}
          zoomSpeed={1.2}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
        />

        {/* Room Model with Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          <RoomModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

const CameraInfoUpdater = ({ setInfo }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (camera) {
      const pos = camera.position;
      const rot = camera.rotation;
      const target = new THREE.Vector3(0, 0, 0);
      const distance = camera.position.distanceTo(target);
      
      setInfo({
        position: [pos.x.toFixed(2), pos.y.toFixed(2), pos.z.toFixed(2)],
        rotation: [
          (rot.x * (180 / Math.PI)).toFixed(2),
          (rot.y * (180 / Math.PI)).toFixed(2),
          (rot.z * (180 / Math.PI)).toFixed(2),
        ],
        distance: distance.toFixed(2),
        target: [target.x.toFixed(2), target.y.toFixed(2), target.z.toFixed(2)],
      });
    }
  });

  return null;
};

const RoomExperience = () => {
  return <SceneWithInfo />;
};

export default RoomExperience;
