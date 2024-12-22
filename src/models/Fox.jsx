import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../assets/3d/dragon_boss.glb";

export function Fox({ currentAnimation, isRotating, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={46.949}
        >
          <group
            name="Dragon_Boss_05fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Dragon_Boss_05">
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.Dragon_Boss_05}
                      skeleton={nodes.Object_8.skeleton}
                    />
                    <group
                      name="Object_7"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={0.014}
                    />
                    <group
                      name="Dragon_Boss_05_1"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={0.014}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(scene);
