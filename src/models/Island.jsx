import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      <a.group name="Sketchfab_Scene">
        <a.group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.625}
        >
          <a.group
            name="bde2a52c2bcc4654b1515c2b3e89a71bfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <a.group name="Object_2">
              <a.group name="RootNode">
                <a.group name="MOUETTE_DEF">
                  <mesh
                    name="0"
                    castShadow
                    receiveShadow
                    geometry={nodes["0"].geometry}
                    material={materials.MOUETTE}
                    morphTargetDictionary={nodes["0"].morphTargetDictionary}
                    morphTargetInfluences={nodes["0"].morphTargetInfluences}
                  />
                  <mesh
                    name="1"
                    castShadow
                    receiveShadow
                    geometry={nodes["1"].geometry}
                    material={materials["MOUETTE.jaune"]}
                    morphTargetDictionary={nodes["1"].morphTargetDictionary}
                    morphTargetInfluences={nodes["1"].morphTargetInfluences}
                  />
                  <mesh
                    name="2"
                    castShadow
                    receiveShadow
                    geometry={nodes["2"].geometry}
                    material={materials["MOUETTE.noir"]}
                    morphTargetDictionary={nodes["2"].morphTargetDictionary}
                    morphTargetInfluences={nodes["2"].morphTargetInfluences}
                  />
                </a.group>
                <a.group name="ROT">
                  <a.group name="ISLE_17">
                    <mesh
                      name="ISLE_17_ile-sable_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-sable_0"].geometry}
                      material={materials["ile-sable"]}
                    />
                    <mesh
                      name="ISLE_17_ile-herbe_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-herbe_0"].geometry}
                      material={materials["ile-herbe"]}
                    />
                    <mesh
                      name="ISLE_17_ile-roc_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-roc_0"].geometry}
                      material={materials["ile-roc"]}
                    />

                    <mesh
                      name="ISLE_17_palmier-tronc_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_palmier-tronc_0"].geometry}
                      material={materials["palmier-tronc"]}
                    />
                    <mesh
                      name="ISLE_17_palmier-feuilles_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_palmier-feuilles_0"].geometry}
                      material={materials["palmier-feuilles"]}
                    />
                    <mesh
                      name="ISLE_17_ile-o_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-o_0"].geometry}
                      material={materials["ile-o"]}
                    />
                    <mesh
                      name="ISLE_17_ile-ecume_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-ecume_0"].geometry}
                      material={materials["ile-ecume"]}
                    />
                    <mesh
                      name="ISLE_17_ile-nuage_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-nuage_0"].geometry}
                      material={materials["ile-nuage"]}
                    />
                    <mesh
                      name="ISLE_17_LUNE_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.ISLE_17_LUNE_0.geometry}
                      material={materials.LUNE}
                    />
                    <mesh
                      name="ISLE_17_ile-lave_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_ile-lave_0"].geometry}
                      material={materials["ile-lave"]}
                    />
                  </a.group>
                </a.group>
              </a.group>
            </a.group>
          </a.group>
        </a.group>
      </a.group>
    </a.group>
  );
}
