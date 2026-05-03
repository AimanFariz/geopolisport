export function mockSimulation(params: any) {
  const { hrs, activism, sponsor, host, event } = params;

  const pressure = (hrs + activism + sponsor) / 3;

  const governingBody =
    event === "Olympics" ? "IOC" : "FIFA";

  return {
    stakeholders: [
      {
        name: governingBody,
        score: 0.2 - pressure / 200,
        summary: "Balancing global legitimacy and commercial pressure.",
      },
      {
        name: "Host Government",
        score: 0.5 - hrs / 100,
        summary: "Seeks legitimacy boost but faces scrutiny.",
      },
      {
        name: "Sponsors",
        score: 0.3 - sponsor / 150,
        summary: "Sensitive to reputational risk.",
      },
      {
        name: "NGOs",
        score: -0.4 + hrs / 120,
        summary: "Amplifying human rights concerns.",
      },
      {
        name: "Athletes",
        score: -0.2 + activism / 120,
        summary: "Increasingly vocal on global issues.",
      },
      {
        name: "Rival Countries",
        score: 0.1,
        summary: "Monitoring diplomatic advantage.",
      },
    ],
    global_outcome: `The ${event} hosted by ${host} creates a mixed geopolitical outcome influenced by scrutiny and activism.`,
    risk_matrix: [
    { actor: "Sponsors", level: "HIGH", note: "Brand risk rising" },
    { actor: "Host Government", level: "MEDIUM", note: "Reputation volatile" }
  ],

  pressure_points: [
    { title: "Sponsor Withdrawal", impact: "Rapid legitimacy loss" },
    { title: "Athlete Protest", impact: "Global media amplification" }
  ],

  scenario_forks: [
    { if: "Sponsors withdraw", then: "Event legitimacy collapses" },
    { if: "FIFA enforces reforms", then: "Partial recovery" }
  ],

  timeline: [
    { phase: "Pre-event", detail: "Scrutiny builds" },
    { phase: "During", detail: "Peak pressure and protests" },
    { phase: "Post", detail: "Narrative battle" }
  ],

  recommendations: [
    { actor: "FIFA", action: "Announce reforms early" },
    { actor: "Sponsors", action: "Prepare risk mitigation strategy" }
  ],

  soft_power_score: -0.35,

  narrative: "Sport as spectacle vs accountability battleground"
  };
}