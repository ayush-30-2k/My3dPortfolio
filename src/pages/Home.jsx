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
    if (window.innerWidth < 768) {
      screenScale = [1.7, 1.7, 1.7];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3.5, 3.5, 3.5];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustDragonForScreenSize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth >= 950) {
      screenScale = [9.8, 9.8, 4.7];
      screenPosition = [4.5, 1, -34.01];
    } else if (window.innerWidth < 950 && window.innerWidth >= 670) {
      screenScale = [6.5, 6.5, 1.9];
      screenPosition = [4.5, 12.2, -50.014];
    } else if ((window.innerWidth < 680 && window, innerWidth >= 400)) {
      screenScale = [6.5, 6.5, 1.9];
      screenPosition = [-2.5, 9.2, -42.014];
    } else {
      screenScale = [6, 5.3, 1.1];
      screenPosition = [-3, 9.2, -35.014];
    }

    return [screenScale, screenPosition];
  };

  const [changeposition, setChangeposition] = useState(60.5);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.27, 0.27, 0.27];
      screenPosition = [-6, changeposition, -45.4];
    } else if (window.innerWidth < 600) {
      screenScale = [0.22, 0.22, 0.22];
      screenPosition = [-12.8, changeposition, -45.4];
    } else {
      screenScale = [0.35, 0.35, 0.35];
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
  const [dragonScale, dragonPosition] = adjustDragonForScreenSize();

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
          <Fox
            currentAnimation={currentAnimation}
            position={dragonPosition}
            scale={dragonScale}
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
