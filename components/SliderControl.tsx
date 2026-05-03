// components/SliderControl.tsx
"use client";

export default function SliderControl({ label, value, setValue }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        className="w-full accent-blue-500"
      />
    </div>
  );
}