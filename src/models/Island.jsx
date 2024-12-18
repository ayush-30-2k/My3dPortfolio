/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

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
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
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

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
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
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
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
                      name="ISLE_17_roc_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.ISLE_17_roc_0.geometry}
                      material={materials.material}
                    />
                    <mesh
                      name="ISLE_17_buisson_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.ISLE_17_buisson_0.geometry}
                      material={materials.buisson}
                    />
                    <mesh
                      name="ISLE_17_maison-toit_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_maison-toit_0"].geometry}
                      material={materials["maison-toit"]}
                    />
                    <mesh
                      name="ISLE_17_maison-bois_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_maison-bois_0"].geometry}
                      material={materials["maison-bois"]}
                    />
                    <mesh
                      name="ISLE_17_maison-light_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_maison-light_0"].geometry}
                      material={materials["maison-light"]}
                    />
                    <mesh
                      name="ISLE_17_phare-light_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_phare-light_0"].geometry}
                      material={materials["phare-light"]}
                    />
                    <mesh
                      name="ISLE_17_maison-or_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_maison-or_0"].geometry}
                      material={materials["maison-or"]}
                    />
                    <mesh
                      name="ISLE_17_bato-bois_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_bato-bois_0"].geometry}
                      material={materials["bato-bois"]}
                    />
                    <mesh
                      name="ISLE_17_bato-voile_0"
                      castShadow
                      receiveShadow
                      geometry={nodes["ISLE_17_bato-voile_0"].geometry}
                      material={materials["bato-voile"]}
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
      </a.group>{" "}
    </a.group>
  );
}
