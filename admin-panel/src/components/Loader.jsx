import { LuLoader } from "react-icons/lu";

export default function Loader() {
  return (
    <div className="w-full h-full bg-black/50 absolute z-50 flex items-center justify-center">
      <LuLoader className="text-white text-5xl animate-spin" />
    </div>
  );
}
