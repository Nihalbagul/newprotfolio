import React, { useRef, useEffect } from 'react'
import { useGLTF, useHelper } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Room(props) {
  const { nodes, materials } = useGLTF('/models/computer_and_laptop.glb')
  const roomRef = useRef()
  const { camera } = useThree()

  // Optional: Visualize the bounding box (remove in production)
  useHelper(roomRef, THREE.BoxHelper, 'cyan')

  useEffect(() => {
    if (roomRef.current) {
      // Calculate the bounding box of the entire room
      const box = new THREE.Box3().setFromObject(roomRef.current)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())

      // Calculate the ideal camera distance
      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / Math.tan(fov / 2)) * 1.1

      // Adjust for perspective
      camera.position.set(center.x, center.y, cameraZ)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    }
  }, [])

  return (
    <group ref={roomRef} scale={[0.1, 0.1, 0.1]} position={[0, -5, 0]} {...props} dispose={null}>
      <group position={[16.678, 8.418, 24.507]} rotation={[-Math.PI, -0.592, -Math.PI]} scale={[2.549, 0.243, 2.549]}>
        <mesh geometry={nodes.Object_4.geometry} material={materials['CHAIR-0']} />
        <mesh geometry={nodes.Object_5.geometry} material={materials['WHEEL-0']} />
        <mesh geometry={nodes.Object_6.geometry} material={materials['WHEEL-CAP-0']} />
        <mesh geometry={nodes.Object_7.geometry} material={materials['WHEEL-NUT-0']} />
        <mesh geometry={nodes.Object_8.geometry} material={materials['CHAIR-LEGS-0']} />
        <mesh geometry={nodes.Object_9.geometry} material={materials['CHAIR-COVER-0']} />
      </group>
      <group position={[-18.454, 15.918, 9.192]} rotation={[0, 0.926, -Math.PI]} scale={[-5.14, 0.147, 3.341]}>
        <mesh geometry={nodes.Object_31.geometry} material={materials['LAPTOP-0']} />
        <mesh geometry={nodes.Object_32.geometry} material={materials['1KB-BASE-0']} />
        <mesh geometry={nodes.Object_33.geometry} material={materials['1KEYS-0']} />
        <mesh geometry={nodes.Object_34.geometry} material={materials['SCREEN-0.001']} />
        <mesh geometry={nodes.Object_35.geometry} material={materials['SIGN-0']} />
        <mesh geometry={nodes.Object_36.geometry} material={materials['TAG-0']} />
      </group>
      <group position={[-2.333, 15.958, 2.159]} rotation={[0, 0.005, 0]} scale={[5.607, 0.175, 1.728]}>
        <mesh geometry={nodes.Object_38.geometry} material={materials['2KB-0']} />
        <mesh geometry={nodes.Object_39.geometry} material={materials['1KB-BASE-0.001']} />
        <mesh geometry={nodes.Object_40.geometry} material={materials['1KEYS-0.001']} />
      </group>
      <mesh geometry={nodes.Object_11.geometry} material={materials['COMPUTER-0']} position={[-18.152, 5.799, 9.513]} scale={[2.327, 5.804, 5.98]} />
      <mesh geometry={nodes.Object_13.geometry} material={materials['1COMPUTER-0']} position={[-24.287, 5.799, 15.387]} scale={[2.327, 5.804, 5.98]} />
      <mesh geometry={nodes.Object_15.geometry} material={materials['DESK-0']} position={[0, 15.452, 0]} scale={[29.541, 0.336, 8.492]} />
      <mesh geometry={nodes.Object_17.geometry} material={materials['MAT-0']} position={[0, 0, 14.147]} scale={[46.718, 46.718, 26.649]} />
      <mesh geometry={nodes.Object_19.geometry} material={materials['SCREEN-0']} position={[0, 21.761, -6.007]} rotation={[Math.PI / 2, 0, 0]} scale={[9.123, 4.323, 5.089]} />
      <mesh geometry={nodes.Object_21.geometry} material={materials['2PIC-0']} position={[0, 21.761, -5.754]} rotation={[Math.PI / 2, 0, 0]} scale={[8.964, 4.204, 4.87]} />
      <mesh geometry={nodes.Object_23.geometry} material={materials['1PIC-0']} position={[-16.887, 21.761, -0.693]} rotation={[Math.PI / 2, 0, -0.57]} scale={[8.964, 4.204, 4.87]} />
      <mesh geometry={nodes.Object_25.geometry} material={materials['3PIC-0']} position={[16.987, 21.761, -0.811]} rotation={[Math.PI / 2, 0, 0.552]} scale={[8.964, 4.204, 4.87]} />
      <mesh geometry={nodes.Object_27.geometry} material={materials['BASS-0']} position={[0, 4.992, 0.553]} scale={[5.47, 5, 3.905]} />
      <mesh geometry={nodes.Object_29.geometry} material={materials['SPEAKER-0']} position={[-27.707, 18.537, 8.063]} rotation={[0, 0.588, 0]} scale={[1.076, 1.75, 0.848]} />
      <mesh geometry={nodes.Object_42.geometry} material={materials['MOUSE-0']} position={[7.641, 16.001, 4.809]} rotation={[0, 0.415, 0]} scale={[0.751, 0.486, 1.161]} />
      <mesh geometry={nodes.Object_44.geometry} material={materials['MOUSEPAD-0']} position={[7.625, 14.269, 3.664]} scale={3.11} />
    </group>
  )
}

useGLTF.preload('/models/computer_and_laptop.glb')