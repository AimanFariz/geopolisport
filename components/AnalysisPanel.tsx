// components/AnalysisPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { runSimulationAPI } from "../lib/api";
import Card from "./Card";
import StakeholderGraph from "./StakeholderGraph";
// import Link from "next/link";
import CriticalActions from "./CriticalActions";
// import CriticalActionsPage from "@/app/dashboard/critical-actions/page";

export default function AnalysisPanel({ params }: any) {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      runSimulationAPI(params).then(setData);
    }, 400);

    return () => clearTimeout(timeout);
  }, [params]);

  if (!data) return <div className="animate-pulse text-gray-500">Running simulation...</div>;

  return (
    
      <div>
        <div className="grid grid-cols-2 gap-4">
      <Card title="Stakeholder Map">
        <StakeholderGraph data={data?.stakeholders ?? []} />
      </Card>
      <Card title="Critical Actions">
        <CriticalActions data={data?.critical_actions ?? []} />
      </Card>
      
        </div>
        <Card title="Strategic Analysis">
      <div className="space-y-6 text-md align-center">

        {/* Risk Matrix */}
        <div>
          <div className="text-blue-400 font-semibold mb-2">Risk Matrix</div>
          {data.risk_matrix?.map((r: any, i: number) => (
            <div key={i} className="flex justify-between text-gray-300">
              <span>{r.actor}</span>
              <span className="text-red-400">{r.level}</span>
            </div>
          ))}
        </div>

        {/* Pressure Points */}
        <div>
          <div className="text-blue-400 font-semibold mb-2">Pressure Points</div>
          {data.pressure_points?.map((p: any, i: number) => (
            <div key={i}>
              <div className="font-medium">{p.title}</div>
              <div className="text-gray-400">{p.impact}</div>
            </div>
          ))}
        </div>

        {/* Scenario Forks */}
        <div>
          <div className="text-blue-400 font-semibold mb-2">Scenario Forks</div>
          {data.scenario_forks?.map((f: any, i: number) => (
            <div key={i} className="text-gray-300">
              <span className="text-yellow-400">If:</span> {f.if} <br />
              <span className="text-green-400">Then:</span> {f.then}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <div className="text-blue-400 font-semibold mb-2">Timeline</div>
          {data.timeline?.map((t: any, i: number) => (
            <div key={i} className="text-gray-300">
              <span className="text-gray-400">{t.phase}:</span> {t.detail}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div>
          <div className="text-blue-400 font-semibold mb-2">Recommendations</div>
          {data.recommendations?.map((r: any, i: number) => (
            <div key={i}>
              <span className="text-gray-400">{r.actor}:</span> {r.action}
            </div>
          ))}
        </div>

        {/* Soft Power */}
        <div className="pt-4 border-t border-gray-800">
          <div className="text-blue-400 font-semibold">Soft Power Impact</div>
          <div className="text-lg">
            {data.soft_power_score}
          </div>
        </div>

        {/* Narrative */}
        <div>
          <div className="text-blue-400 font-semibold">Dominant Narrative</div>
          <p className="text-gray-300">{data.narrative}</p>
        </div>

      </div>
    </Card>
      </div>
  );
}