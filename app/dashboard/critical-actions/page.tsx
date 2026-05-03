import { runSimulationAPI } from "@/lib/api";

export default async function CriticalActionsPage({ searchParams }: any) {
  const data = await runSimulationAPI(searchParams);

  const actions = data?.critical_actions || [];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-200 p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-blue-400">
          Critical Actions Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Ranked geopolitical decision signals
        </p>
      </div>

      {actions.length === 0 ? (
        <div className="text-gray-500">No critical actions available.</div>
      ) : (
        <div className="space-y-4">
          {actions.map((a: any, i: number) => (
            <div
              key={i}
              className="border border-gray-800 rounded-xl p-4 bg-[#0F172A]"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-blue-400 font-semibold">
                  {a.title}
                </div>

                <div
                  className={`text-xs px-2 py-1 rounded ${
                    a.priority === "HIGH"
                      ? "bg-red-500/20 text-red-400"
                      : a.priority === "MEDIUM"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {a.priority}
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-2">
                {a.description}
              </p>

              {a.steps && (
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                  {a.steps.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}