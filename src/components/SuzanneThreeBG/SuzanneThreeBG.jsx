import * as THREE from "three";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  Environment,
  useGLTF,
  GizmoHelper,
  GizmoViewport,
  ContactShadows,
} from "@react-three/drei";
import { FlakesTexture } from "three-stdlib";
import CodeSandboxLoader from "../CodeSandboxLoader/CodeSandboxLoader";

const Suzi = (props) => {
  const { scene, materials } = useGLTF("/models/suzanne.gltf");
  useLayoutEffect(() => {
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
    materials.default.color.set("#936eff");
    materials.default.roughness = 0.575;
    materials.default.normalMap = new THREE.CanvasTexture(
      new FlakesTexture(),
      THREE.UVMapping,
      THREE.RepeatWrapping,
      THREE.RepeatWrapping
    );
    materials.default.normalMap.repeat.set(40, 40);
    materials.default.normalScale.set(0.1, 0.1);
  });
  return <primitive object={scene} {...props} />;
};

// Component to animate the cube
const AnimatedCube = () => {
  const cubeRef = useRef();
  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.z += delta * 3;
      cubeRef.current.rotation.x += delta * 3;
      cubeRef.current.rotation.y += delta * 0.2;
      cubeRef.current.position.y = Math.abs(
        Math.sin(state.clock.getElapsedTime()) * 1
      );
    }
  });

  return (
    <mesh castShadow rotation={[0, Math.PI / 4, 0]} ref={cubeRef}>
      <boxGeometry args={[0.75, 0.75, 0.75]} />
      <meshStandardMaterial color="#06dfdf" />
    </mesh>
  );
};

// Component to animate the ball
const AnimatedBall = () => {
  const cubeRef = useRef();

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.z += delta * 4;
      cubeRef.current.rotation.x += delta * 4;
      cubeRef.current.rotation.y += delta * 0.4;
      cubeRef.current.position.y = Math.abs(
        Math.sin(state.clock.getElapsedTime()) * 1
      );
    }
  });

  return (
    <mesh castShadow rotation={[0, Math.PI / 4, 0]} ref={cubeRef}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial flatShading color="#e40169" />
    </mesh>
  );
};

const SuzanneThreeBG = ({ theme }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: 270,
      }}
    >
      <Suspense fallback={<CodeSandboxLoader theme={theme} />}>
        <Canvas
          shadows
          camera={{
            position: isMobile ? [4, 5, 8] : [3, 3.75, 6],
            fov: 35,
          }}
        >
          <color
            attach="background"
            args={[theme === "dark" ? "#121316" : "#fff"]}
          />
          <group position={[0, -0.5, 0]}>
            <Center top>
              <Suzi rotation={[-0.63, 0, 0]} scale={2} />
            </Center>
            <Center top position={[-2.5, 0, 0.5]}>
              <AnimatedCube />
            </Center>
            <Center top position={[2.5, 0, 1]}>
              <AnimatedBall />
            </Center>
            <ContactShadows color={theme === "dark" ? "#121316" : "#fafafa"} />
          </group>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
          <Environment files={"/maps/city.hdr"} blur={0} />
          <GizmoHelper alignment="top-right">
            <GizmoViewport
              axisColors={["#ff1a5f", "#00dfde", "#855bff"]}
              size={60}
            />
          </GizmoHelper>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SuzanneThreeBG;
