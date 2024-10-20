/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 t.gltf 
Author: Miguel Bandera (https://sketchfab.com/miguelbandera)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/temple-of-eshmun-detail-area-3f7d6dfd762a4626978326ff4366aabd
Title: Temple of Eshmun- Detail Area
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function T(props) {
  const { nodes, materials } = useGLTF('/t.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.model_Material_u1_v1} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.model_Material_u1_v1} />
      </group>
    </group>
  )
}

useGLTF.preload('/t.gltf')
