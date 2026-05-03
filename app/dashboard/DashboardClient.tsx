"use client";

import { useSearchParams } from "next/navigation";
import AnalysisPanel from "@/components/AnalysisPanel";

export default function DashboardClient() {
  const searchParams = useSearchParams();

  const params = {
    event: searchParams.get("event"),
    host: searchParams.get("host"),
    hrs: searchParams.get("hrs"),
    activism: searchParams.get("activism"),
    sponsor: searchParams.get("sponsor"),
  };

  return <AnalysisPanel params={params} />;
}