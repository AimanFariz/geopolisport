"use client";

export default function CriticalActions({ data }: any) {
  if (!data?.length) {
    return (
      <div className="text-gray-500 text-sm">
        No critical actions available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((a: any, i: number) => (
        <div
          key={i}
          className="border border-gray-800 rounded-lg p-3 bg-[#0F172A]"
        >
          <div className="flex justify-between">
            <div className="text-blue-400 font-semibold">
              {a.title}
            </div>
            <div className="text-xs text-gray-400">
              {a.priority}
            </div>
          </div>

          <p className="text-sm text-gray-300 mt-1">
            {a.description}
          </p>
        </div>
      ))}
    </div>
  );
}