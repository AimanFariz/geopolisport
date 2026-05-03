import { mockSimulation } from "./mockSimulation";
const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";
export async function runSimulationAPI(params: any) {
  try {
    const res = await fetch(`${baseUrl}/api/simulate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

    const data = await res.json();

    if (!res.ok) {
      console.warn("API failed, using mock:", data);
      return mockSimulation(params);
    }

    // if Claude returns string → parse safely
    if (typeof data.result === "string") {
      try {
        return JSON.parse(data.result);
      } catch {
        return mockSimulation(params);
      }
    }

    return data;

  } catch (err) {
    console.warn("Network/API error, using mock:", err);
    return mockSimulation(params);
  }
}