import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

interface Product3DModelProps {
  modelPath: string;
  className?: string;
}

const Product3DModel: React.FC<Product3DModelProps> = ({ modelPath, className }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <Canvas 
      className={className}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} contactShadow={false}>
          <primitive object={gltf.scene} scale={1} />
        </Stage>
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          rotateSpeed={0.5} 
        />
      </Suspense>
    </Canvas>
  );
};

export default Product3DModel;