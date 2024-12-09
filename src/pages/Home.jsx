import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Fox, Island, Plane } from "../models";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [changeposition, setChangeposition] = useState(60.5);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.4, 0.4, 0.4];
      screenPosition = [0, changeposition, -45.4];
    } else {
      screenScale = [0.4, 0.3, 0.3];
      screenPosition = [0, changeposition, -45.4];
    }

    return [screenScale, screenPosition];
  };

  const [currentAnimation, setCurrentAnimation] = useState(
    "Dragon_Boss_05_show"
  );

  const updatePositionOnRotation = () => {
    if (currentStage % 2 && changeposition < 120) {
      setChangeposition(changeposition + 5);
    } else if (!(currentStage % 2) && changeposition > 30)
      setChangeposition(changeposition - 5);
  };

  const animationToPlay = [
    "Dragon_Boss_05_show",
    "Take 001",
    "Dragon_Boss_05_idle",
    "Dragon_Boss_05_skill01",
    "Dragon_Boss_05_skill02",
    "Dragon_Boss_05_skill03",
    "Dragon_Boss_05_skill04",
    // "Dragon_Boss_05_skill05",
    "Dragon_Boss_05_skill06",
  ];

  const [num, setNum] = useState(0);

  const changeAnimation = useRef(0);

  useEffect(() => {
    if (changeAnimation.current === 10) {
      changeAnimation.current = 0;
    }
    if (num > 8 || num === 8) setNum(0);
    if (changeAnimation.current < 10) {
      changeAnimation.current += 1;
      const timer = setTimeout(() => setNum(num + 1), 10000);
      setCurrentAnimation(animationToPlay[num]);
      return () => clearTimeout(timer);
    }
  }, [num]);

  useEffect(() => {
    updatePositionOnRotation();
  }, [currentStage]);

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center opacity-70">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-blue-950 ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1.3, 1.8, 2.9]} intensity={2} />
          <ambientLight intensity={-0.5} />
          <pointLight position={[7, 2, 3]} intensity={8} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={0.25}
          />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={0.46}
          />
          {/* dynamic z-positioning for small devices --- desktop : -- [4.5, 1, -24.01], tablet -- [], smartphone : [] */}
          {/* Task :-- Optimize the position and scale of the dragon for all the device -- Responsive */}
          <Fox
            currentAnimation={currentAnimation}
            // isRotating={isRotating}
            position={[4.5, 1, -34.01]}
            scale={[6.8, 8.8, 6.8]}
            rotation={[12.629, -0.8, 0]}
          />

          <Bird />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.2, 1.7077, 0.12]}
            scale={islandScale}
          />

          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="jukebox"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </section>
  );
};

export default Home;
