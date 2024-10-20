// src/Model/track/Track.jsx
import { useGLTF } from '@react-three/drei';
import React from 'react'
function Car() {
  const { scene } = useGLTF('./scene.gltf'); // Adjust the path as needed

  return <primitive object={scene} />;
}

export default Car;
