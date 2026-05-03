// import { NextResponse } from "next/server";
// import { getContext } from "@/lib/contextEngine";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const context = await getContext(body);

// const prompt = `
// You are a geopolitical strategy analyst.

// Use the following real-world context:

// ${context}

// Scenario:
// Event: ${body.event}
// Host: ${body.host}
// Human Rights Scrutiny: ${body.hrs}
// Athlete Activism: ${body.activism}
// Sponsor Sensitivity: ${body.sponsor}
// You MUST incorporate the provided geopolitical context into your analysis.
// Do NOT ignore it.
// Return this exact structure:

// {
//   "stakeholders": [
//     {
//       "name": "",
//       "score": 0,
//       "risk": "LOW | MEDIUM | HIGH",
//       "trend": "RISING | FALLING | STABLE",
//       "summary": ""
//     }
//   ],
//   "global_outcome": "",
//   "risk_matrix": [
//     { "actor": "", "level": "", "note": "" }
//   ],
//   "pressure_points": [
//     { "title": "", "impact": "" }
//   ],
//   "scenario_forks": [
//     { "if": "", "then": "" }
//   ],
//   "timeline": [
//     { "phase": "", "detail": "" }
//   ],
//   "recommendations": [
//     { "actor": "", "action": "" }
//   ],
//   "soft_power_score": 0,
//   "narrative": "",
//    "critical_actions": [
//     {
//       "title": "Sponsor Risk Mitigation",
//       "priority": "HIGH",
//       "description": "Immediate engagement with top sponsors to prevent withdrawal.",
//       "steps": [
//         "Activate crisis comms team",
//         "Reaffirm contractual guarantees",
//         "Prepare fallback sponsorship pool"
//       ]
//     }
//   ]
//     These must be:
// - ranked by urgency
// - actionable (not descriptive)
// - focused on decision-making
// }
// `;

//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "x-api-key": process.env.ANTHROPIC_API_KEY!,
//         "anthropic-version": "2023-06-01",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "claude-haiku-4-5-20251001",
//         max_tokens: 1000,
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Claude API error", details: data },
//         { status: 500 }
//       );
//     }

//     const text = data.content?.[0]?.text;
//     if (!text) {
//       return NextResponse.json(
//         {
//           error: "Empty Claude response",
//           raw: data,
//         },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json({
//       result: text,
//     });

//   } catch (err: any) {
//     return NextResponse.json(
//       { error: "Server error", details: err.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getContext } from "@/lib/contextEngine";
export async function POST(req: Request) {
  try {
    const body = await req.json();
const context = await getContext(body);

    const prompt = `
You are a geopolitical strategy analyst.

Use the following real-world context:

${context}

Scenario:
Event: ${body.event}
Host: ${body.host}
Human Rights Scrutiny: ${body.hrs}
Athlete Activism: ${body.activism}
Sponsor Sensitivity: ${body.sponsor}
You MUST incorporate the provided geopolitical context into your analysis.
Do NOT ignore it.
Return this exact structure:

{
  "stakeholders": [
    {
      "name": "",
      "score": 0,
      "risk": "LOW | MEDIUM | HIGH",
      "trend": "RISING | FALLING | STABLE",
      "summary": ""
    }
  ],
  "global_outcome": "",
  "risk_matrix": [
    { "actor": "", "level": "", "note": "" }
  ],
  "pressure_points": [
    { "title": "", "impact": "" }
  ],
  "scenario_forks": [
    { "if": "", "then": "" }
  ],
  "timeline": [
    { "phase": "", "detail": "" }
  ],
  "recommendations": [
    { "actor": "", "action": "" }
  ],
  "soft_power_score": 0,
  "narrative": "",
   "critical_actions": [
    {
      "title": "Sponsor Risk Mitigation",
      "priority": "HIGH",
      "description": "Immediate engagement with top sponsors to prevent withdrawal.",
      "steps": [
        "Activate crisis comms team",
        "Reaffirm contractual guarantees",
        "Prepare fallback sponsorship pool"
      ]
    }
  ]
    These must be:
- ranked by urgency
- actionable (not descriptive)
- focused on decision-making
}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        // model: "llama-3.1-8b-instant",
        // model: "openai/gpt-oss-20b",        
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Groq API error", details: data },
        { status: 500 }
      );
    }

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "Empty response from Groq", raw: data },
        { status: 500 }
      );
    }

    return NextResponse.json({
      result: text,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}