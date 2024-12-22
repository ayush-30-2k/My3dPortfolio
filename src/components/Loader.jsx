import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <div className="flex justify-center items-center w-full">
        <div className="relative left-[-30px] w-20 h-20 border-2 border-opacity-20 self-center  white-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </Html>
  );
};

export default Loader;
