// components/Header.tsx
"use client"
import { useRouter } from "next/navigation";
export default function Header() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/"); // or any route you want
  };
  return (
    <div onClick={handleClick} className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <h1 className="text-xl font-semibold tracking-wide">
        🌐 Sports Diplomacy Simulator
      </h1>
      
      <div  className="text-sm text-gray-400">
        Strategic Scenario Modeling
      </div>
    </div>
  );
}