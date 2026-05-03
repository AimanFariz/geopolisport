"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Slider({ label, value, setValue }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{label}</span>
        <span className="text-blue-400">{value}</span>
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

export default function ScenarioBuilder() {
  const router = useRouter();

  const [event, setEvent] = useState("World Cup");
  const [host, setHost] = useState("Saudi Arabia");
  const [hrs, setHrs] = useState(70);
  const [activism, setActivism] = useState(50);
  const [sponsor, setSponsor] = useState(60);

  const runSimulation = () => {
    const query = new URLSearchParams({
      event,
      host,
      hrs: String(hrs),
      activism: String(activism),
      sponsor: String(sponsor),
    });

    router.push(`/dashboard?${query.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-wide">
          Sports Diplomacy Simulator
        </h1>
        <p className="text-sm text-gray-400">
          Configure geopolitical scenario parameters
        </p>
      </div>

      {/* Event + Host */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Event</label>
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="w-full bg-[#0B0F14] border border-gray-700 rounded-lg p-2 text-sm"
          >
            <option>World Cup</option>
            <option>Olympics</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-400">Host Nation</label>
          <input
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full bg-[#0B0F14] border border-gray-700 rounded-lg p-2 text-sm"
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 pt-2">
        <Slider label="Human Rights Scrutiny" value={hrs} setValue={setHrs} />
        <Slider label="Athlete Activism" value={activism} setValue={setActivism} />
        <Slider label="Sponsor Sensitivity" value={sponsor} setValue={setSponsor} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 pt-4" />

      {/* Action */}
      <button
        onClick={runSimulation}
        className="
          w-full
          bg-blue-600 hover:bg-blue-500
          transition
          text-white
          py-3
          rounded-lg
          font-medium
          tracking-wide
          shadow-lg shadow-blue-500/20
        "
      >
        Run Simulation
      </button>
    </div>
  );
}