import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Icon from "@/assets/images/main-icon.png";
import { Airplane } from "@/pages/login/components/Airplane";

// https://codepen.io/ste-vg/pen/GRooLza
export function Logo() {
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const showAnimation = () => {
    setIsAnimationActive(true);
  };

  const stopAnimation = () => {
    setIsAnimationActive(false);
  };

  return (
    <>
      <img
        src={Icon}
        alt="icon"
        className="w-[100%] drop-shadow-md hover:drop-shadow-2xl cursor-pointer"
        onClick={showAnimation}
      />

      <Canvas
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity: isAnimationActive ? 1 : 0,
          // visibility: showCanvas ? "visible" : "hidden",
          // zIndex: showCanvas ? 100000000000000 : 1,
          zIndex: 100000000000000,
          pointerEvents: isAnimationActive ? "auto" : "none",
          backdropFilter: "blur(10px)",
          transition: "opacity 0.6s",
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Airplane stopAnimation={stopAnimation} isAnimationActive={isAnimationActive} />
      </Canvas>
    </>
  );
}
