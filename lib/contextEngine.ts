import { countryIntel } from "../lib/countryIntel";

async function fetchNews(host: string) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        host
      )}&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await res.json();

    if (!data?.articles) return "";

    return data.articles
      .slice(0, 3)
      .map((a: any) => `- ${a.title}`)
      .join("\n");
  } catch (err) {
    console.warn("News fetch failed:", err);
    return "";
  }
}

export async function getContext(params: any) {
  const { host, event } = params;

  const intel = countryIntel[host] || {
    humanRightsRisk: "UNKNOWN",
    mediaScrutiny: "MEDIUM",
    sportsSoftPowerStrategy: "NEUTRAL",
    notes: [],
  };
  // 🔹 fetch first
  const news = await fetchNews(host);

  // 🔹 base global context
  const baseContext = `
Global environment:
- Increasing politicization of international sports
- Rising athlete activism
- Sponsors highly sensitive to public backlash
- Media cycles amplify controversy rapidly
`;

  // 🔹 host-specific context
  let hostContext = "";

  if (host === "Saudi Arabia") {
    hostContext = `
Host context:
- Ongoing international scrutiny regarding human rights
- Strategic use of sports for global image-building
- Western media coverage tends to be critical
`;
  } else if (host === "USA") {
    hostContext = `
Host context:
- Highly polarized domestic political environment
- Strong free press and activist ecosystem
- High athlete visibility and influence
`;
  } else {
    hostContext = `
Host context:
- Moderate geopolitical visibility
- Standard international scrutiny levels
`;
  }

  // 🔥 FINAL combined context
  return `
GLOBAL CONTEXT:
- Sports is increasingly politicized
- Athlete activism is rising globally
- Sponsors are highly reputation-sensitive

HOST INTELLIGENCE:
- Country: ${host}
- Human Rights Risk: ${intel.humanRightsRisk}
- Media Scrutiny: ${intel.mediaScrutiny}
- Strategy: ${intel.sportsSoftPowerStrategy}
RECENT NEWS:
${news || "- No recent news available"}
KEY NOTES:
${intel.notes.map((n: string) => `- ${n}`).join("\n")}
`;
}