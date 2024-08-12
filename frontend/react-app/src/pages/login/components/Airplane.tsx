import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, Edges } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

// import { useLoader } from "@react-three/fiber";
// import { OBJLoader } from "three/examples/jsm/Addons.js";

// export function Airplane() {
//   const obj = useLoader(OBJLoader, "@/assets/models/airplane.obj");
//   return (
//     <mesh>
//       <primitive object={obj} scale={[0.1, 0.1, 0.1]} />
//     </mesh>
//   );
// }
type Props = {
  stopAnimation: () => void;
  isAnimationActive: boolean;
};
export const Airplane = ({ stopAnimation, isAnimationActive }: Props) => {
  const { scene, camera, gl } = useThree();
  const modelGroup = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  const object = useLoader(OBJLoader, "https://assets.codepen.io/557388/1405+Plane_1.obj");

  useEffect(() => {
    if (object) {
      // console.log(object);
      object.traverse((child) => {
        if ("isMesh" in child && child.isMesh && "material" in child) {
          child.material = new THREE.MeshPhongMaterial({
            color: 0x171511,
            specular: 0xd0cbc7,
            shininess: 5,
            flatShading: true,
          });
        }
      });
      if ("geometry" in object.children[0]) {
        const geometry: any = object.children[0].geometry;
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }),
        );
        camera.position.set(0, 0, 100);
        line.position.set(0, 0, 0);
        modelGroup.current?.add(object, line);
        setModelLoaded(true); // 모델이 로드되었음을 설정
        gl.render(scene, camera);
      }
    }
  }, [object, isAnimationActive]);

  useFrame(() => {
    if (modelLoaded && modelGroup.current) {
      if (isAnimationActive) {
        setupAnimation(modelGroup.current, stopAnimation); // 매 프레임마다 애니메이션을 적용
      }
    }
    if (isAnimationActive) {
      console.log("render");
      gl.render(scene, camera);
    }
  });

  return (
    <>
      <group ref={modelGroup} position={[80, -32, -60]} rotation={[-Math.PI / 10, -Math.PI, 0]} />
      <OrbitControls />
    </>
  );
};

function setupAnimation(
  modelGroup: THREE.Group<THREE.Object3DEventMap> | null,
  stopAnimation: () => void,
) {
  if (!modelGroup) return;

  const { children } = modelGroup;
  const airplane = children[0];
  const line = children[1];

  if (airplane && line) {
    // console.log(modelGroup.position);
    if (modelGroup.position.z < -400) {
      console.log("stop");
      stopAnimation();
      setTimeout(() => {
        modelGroup.position.set(80, -32, -60);
      }, 500);
    }
    modelGroup.translateZ(3.5);
  }
}
