import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Charger les données des points
import pointsData from '../data/ecoPoints.json';

const Globe = () => {
  const globeRef = useRef();
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Rotation automatique du globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  // Convertit les coordonnées (longitude/latitude) en coordonnées 3D
  const convertLatLonToXYZ = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ];
  };

  return (
    <mesh ref={globeRef}>
      {/* Globe principal */}
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load('/assets/textures/earth.jpg')}
        normalMap={new THREE.TextureLoader().load('/assets/textures/earth-normal.jpg')}
      />

      {/* Points interactifs */}
      {pointsData.map((point) => {
        const [x, y, z] = convertLatLonToXYZ(point.position[1], point.position[0], 2.1); // Radius = 2.1 pour apparaître au-dessus du globe
        return (
          <mesh
            key={point.id}
            position={[x, y, z]}
            onClick={() => setSelectedPoint(point)}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
        );
      })}

      {/* Informations contextuelles */}
      {selectedPoint && (
        <Html position={[0, -2.5, 0]} center>
          <div className="bg-white p-4 shadow-lg rounded">
            <h3 className="font-bold text-lg">{selectedPoint.name}</h3>
            <p>{selectedPoint.description}</p>
          </div>
        </Html>
      )}
    </mesh>
  );
};

const Globe3D = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} />
        <Globe />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default Globe3D;
