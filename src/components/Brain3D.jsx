import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const BrainMesh = () => {
  const brainRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.005;
      brainRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.003;
    }
  });

  // Create brain wireframe geometry
  const brainGeometry = new THREE.IcosahedronGeometry(2, 2);
  
  // Create particle positions
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }

  return (
    <group>
      {/* Main brain wireframe */}
      <mesh ref={brainRef} geometry={brainGeometry}>
        <meshBasicMaterial color="#00D9FF" wireframe />
      </mesh>
      
      {/* Inner glow sphere */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial color="#B794F6" transparent opacity={0.1} />
      </Sphere>

      {/* Particle cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#39FF14" transparent opacity={0.6} />
      </points>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const Brain3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BrainMesh />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Brain3D;
