import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

// Loading fallback specifically for Three.js content
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="text-white mt-4">Loading 3D Model...</p>
      </div>
    </Html>
  );
}

// Enhanced T-Shirt 3D Model with loading indicator and better texture handling
function TShirtModel({ textureUrl }) {
  const { scene } = useGLTF('/t_shirt.glb');
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const meshRef = useRef();
  const [isRotating, setIsRotating] = useState(true);
  
  // Apply texture to the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Create a new material to avoid affecting other instances
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
          metalness: 0.1
        });
        child.material.needsUpdate = true;
      }
    });
  }, [texture, scene]);
  
  // Handle automatic rotation
  useFrame(() => {
    if (meshRef.current && isRotating) {
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <>
      <primitive 
        ref={meshRef} 
        object={scene} 
        scale={1.5} 
        position={[0, -1.4, 0]} 
        onClick={() => setIsRotating(!isRotating)}
      />
      {/* Add subtle spotlight */}
      <spotLight 
        position={[0, 5, 5]} 
        intensity={0.8} 
        angle={0.5} 
        penumbra={1} 
        castShadow 
      />
    </>
  );
}

// Enhanced T-Shirt 3D Viewer with controls
export default function TShirtViewer({ textureUrl, onClose }) {
  const [zoom, setZoom] = useState(3);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.max(prev - 0.5, 1.5));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.min(prev + 0.5, 5));
  };
  
  const handleReset = () => {
    setZoom(3);
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl">
        {/* Close button with improved styling */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        {/* Title bar */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-black bg-opacity-50 z-40 flex items-center px-6">
          <h2 className="text-white font-medium text-xl">Interactive 3D Preview</h2>
        </div>
        
        {/* Controls sidebar */}
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-40 flex flex-col space-y-4">
          <button 
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
            aria-label="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
            aria-label="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <button 
            onClick={handleReset}
            className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
            aria-label="Reset View"
          >
            <RotateCcw size={20} />
          </button>
        </div>
        
        {/* Canvas with improved lighting and environment */}
        <Canvas camera={{ position: [0, 1.5, zoom], fov: 45 }}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 4, 2]} intensity={1} />
          <Suspense fallback={<LoadingFallback />}>
            <TShirtModel textureUrl={textureUrl} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls 
            enableZoom 
            enablePan={false}
            minDistance={1.5}
            maxDistance={5}
            target={[0, 0.5, 0]}
          />
        </Canvas>
        
        {/* Bottom help text */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-black bg-opacity-50 z-40 flex items-center justify-center px-6">
          <p className="text-white text-opacity-70 text-sm">
            Click and drag to rotate • Scroll to zoom • Click model to pause rotation
          </p>
        </div>
      </div>
    </div>
  );
}