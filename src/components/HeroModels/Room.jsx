import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Room(props) {
  const { nodes, materials } = useGLTF('/models/low-poly_camp.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Cube_0.geometry} material={materials.rumput} rotation={[-Math.PI, 0, -Math.PI]} scale={[-6.637, 6.637, 0.133]} />
        <mesh geometry={nodes.Circle001_0.geometry} material={materials.pohon} position={[1.628, 4.262, 3.252]} rotation={[0, 0, -0.842]} scale={[1.154, 1.154, 3.838]} />
        <mesh geometry={nodes.Cube005_0.geometry} material={materials.pohon_4} position={[4.818, 2.737, 1.447]} rotation={[0, 0, -1.947]} scale={[0.663, 0.663, 1.2]} />
        <mesh geometry={nodes.Circle004_0.geometry} material={materials.pohon_3} position={[0.289, 0.918, 0.069]} />
        <mesh geometry={nodes.Cube009_0.geometry} material={materials.Tent} position={[-0.474, -0.555, 1.817]} rotation={[0, 0, 0.348]} scale={[0.94, 0.94, 0.157]} />
        <mesh geometry={nodes.Cube013_0.geometry} material={materials.tali} position={[1.483, -0.038, 0.932]} rotation={[-0.38, -0.078, -2.886]} scale={[0.005, 0.233, 0.005]} />
        <mesh geometry={nodes.Cube010_0.geometry} material={materials.batu} position={[1.718, 0.127, 1.221]} />
        <mesh geometry={nodes.Cylinder001_0.geometry} material={materials['Material.003']} position={[-1.492, -2.6, 0.175]} rotation={[1.571, 0.402, -1.571]} scale={[0.185, 0.185, 0.609]} />
        <mesh geometry={nodes.Cylinder005_0.geometry} material={materials.kayu_bakar} position={[-0.208, -1.966, 0.126]} rotation={[0.843, 0.584, -1.643]} scale={[0.022, 0.022, 0.163]} />
        <mesh geometry={nodes.Circle006_0.geometry} material={materials.tanah} position={[-0.363, -1.933, 0.069]} />
        <mesh geometry={nodes.Icosphere000_0.geometry} material={materials.pohon2} position={[4.398, -2.393, 3.288]} rotation={[0, 0, 0.207]} scale={[0.452, 0.452, 0.368]} />
        <mesh geometry={nodes.Plane_0.geometry} material={materials.baju_1} position={[4.03, -1.554, 1.426]} rotation={[0, Math.PI / 2, 0]} scale={0.172} />
        <mesh geometry={nodes.Plane001_0.geometry} material={materials.baju_2} position={[4.075, -1.668, 1.349]} rotation={[-Math.PI / 2, 1.555, Math.PI / 2]} scale={[0.296, 0.172, 0.172]} />
        <mesh geometry={nodes.Plane002_0.geometry} material={materials.baju_3} position={[3.896, -1.954, 1.225]} rotation={[0, Math.PI / 2, 0]} />
        <mesh geometry={nodes.Cube014_0.geometry} material={materials['Material.001']} rotation={[-Math.PI, 0, -Math.PI]} scale={[-6.637, 6.637, 0.133]} />
        <mesh geometry={nodes.Cube015_0.geometry} material={materials['Material.009']} position={[-4.522, -2.028, 0.176]} scale={[0.022, 0.161, 0.107]} />
        <mesh geometry={nodes.Cube016_0.geometry} material={materials['Material.010']} position={[-2.969, -2.121, 1.033]} />
        <mesh geometry={nodes.Cube017_0.geometry} material={materials.material_10} position={[-3.839, -2.694, 0.091]} scale={0.019} />
        <mesh geometry={nodes.Cube018_0.geometry} material={materials.material} position={[-0.088, -0.87, 4.006]} />
        <mesh geometry={nodes.Plane003_0.geometry} material={materials.Root} position={[-1.129, 0.578, 0.079]} rotation={[0, 0, 0.343]} scale={[0.599, 0.804, 0.566]} />
        <mesh geometry={nodes.Circle016_0.geometry} material={materials.batang} position={[0.592, 2.839, 5.09]} scale={[0.775, 0.775, 1.306]} />
        <mesh geometry={nodes.Icosphere001_0.geometry} material={materials['Material.012']} position={[-1.444, 0.275, 6.399]} rotation={[2.257, -0.589, -2.685]} scale={0.04} />
        <mesh geometry={nodes.Plane004_0.geometry} material={materials['Material.002']} position={[-0.806, -0.818, 0.665]} rotation={[-2.271, 1.142, 2.237]} scale={0.563} />
        <mesh geometry={nodes.Torus001_0.geometry} material={materials.lampu_item} position={[3.945, -2.754, 2.264]} rotation={[-1.956, 0.33, 0.243]} scale={0.03} />
        <mesh geometry={nodes.Cylinder003_0.geometry} material={materials.lilin} position={[3.927, -2.759, 2.119]} rotation={[0, 0.113, -0.392]} scale={[0.011, 0.011, 0.024]} />
        <mesh geometry={nodes.Cube002_0.geometry} material={materials.api_lilin} position={[-4.578, -2.899, 0.136]} scale={0.046} />
        <mesh geometry={nodes.Cube003_0.geometry} material={materials.api_lilin} position={[3.925, -2.758, 2.162]} scale={0.046} />
        <mesh geometry={nodes.Cube004_0.geometry} material={materials.Root} position={[0, 0, 6.05]} scale={[5.395, 5.395, 6.921]} />
        <mesh geometry={nodes.Cube006_0.geometry} material={materials.bulan} position={[-4.189, 8.233, 6.301]} />
        <mesh geometry={nodes.Cube008_0.geometry} material={materials.langit1} position={[2.229, 0.104, 3.972]} rotation={[0, Math.PI / 2, 0]} scale={[4.523, 5.374, 7.475]} />
        <mesh geometry={nodes.Cube007_0.geometry} material={materials.langit1} position={[10.755, 2.256, 3.972]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[4.523, 5.374, 7.612]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/low-poly_camp.glb')
