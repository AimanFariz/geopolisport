"use client";

import { countryIntel } from "../lib/countryIntel";

export default function IntelFeed({ host }: any) {
  const intel = countryIntel[host];

  if (!intel) return null;

  return (
    <div className="bg-[#0B0F14] border border-gray-800 rounded-xl p-4">
      <div className="text-xs text-blue-400 mb-2">
        LIVE INTELLIGENCE
      </div>

      <div className="text-sm space-y-2 text-gray-300">
        <div>
          Risk:{" "}
          <span className="text-red-400">{intel.humanRightsRisk}</span>
        </div>

        <div>
          Media:{" "}
          <span className="text-yellow-400">{intel.mediaScrutiny}</span>
        </div>

        <div>
          Strategy:{" "}
          <span className="text-green-400">
            {intel.sportsSoftPowerStrategy}
          </span>
        </div>
      </div>
    </div>
  );
}