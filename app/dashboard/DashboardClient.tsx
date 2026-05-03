"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import SliderControl from "@/components/SliderControl";
import AnalysisPanel from "@/components/AnalysisPanel";
import Card from "@/components/Card";

export default function DashboardClient() {
  const params = useSearchParams();

  const [hrs, setHrs] = useState(Number(params.get("hrs")));
  const [activism, setActivism] = useState(Number(params.get("activism")));
  const [sponsor, setSponsor] = useState(Number(params.get("sponsor")));

  const scenario = {
    event: params.get("event"),
    host: params.get("host"),
    hrs,
    activism,
    sponsor,
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="p-4 space-y-4">
        <Card title="Scenario Controls">
          <div className="grid grid-cols-3 gap-4">
            <SliderControl label="Human Rights" value={hrs} setValue={setHrs} />
            <SliderControl label="Athlete Activism" value={activism} setValue={setActivism} />
            <SliderControl label="Sponsor Sensitivity" value={sponsor} setValue={setSponsor} />
          </div>
        </Card>

        <AnalysisPanel params={scenario} />
      </div>
    </div>
  );
}