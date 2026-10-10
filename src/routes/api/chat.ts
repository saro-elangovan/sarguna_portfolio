import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, type UIMessage } from "ai";
import { createResponsesCall } from "@/lib/ai/responses";
import { contact, stats, skills, experience, projects, certifications, services } from "@/lib/portfolio-data";

function buildInstructions() {
  const kb = {
    name: "Sarguna E",
    title: "AI & Data Science Graduate | Data Analyst | Aspiring AI/ML Developer",
    objective: "Seeking entry-level opportunities in AI/ML Development, Data Analytics, and related technology roles.",
    contact,
    highlights: stats,
    skills,
    experience,
    projects,
    education: [
      { degree: "B.Tech in Artificial Intelligence & Data Science", institution: "Adhi College of Engineering and Technology", university: "Anna University", location: "Kancheepuram, Tamil Nadu", duration: "2021–2025", cgpa: "8.6 / 10" },
      { degree: "Higher Secondary Education", institution: "Government Girls Higher Secondary School", location: "Villupuram, Tamil Nadu" },
    ],
    certifications,
    areasOfInterest: services,
  };
  return `You are the portfolio assistant on Sarguna E's personal website. Answer visitors' (often recruiters') questions about Sarguna's experience, projects, skills, education and certifications.

Rules:
- Answer ONLY from the portfolio facts below. If something isn't covered, say you don't have that information and suggest contacting Sarguna at ${contact.email}.
- Never invent employers, dates, grades, metrics, certificates or links.
- Refer to Sarguna in the third person. Be warm, concise (usually 2–5 sentences or a short list), and use markdown.
- The disease prediction project is an academic project, not a clinical tool; the chatbot project does not replace professional mental health care.
- Politely decline unrelated requests.

PORTFOLIO FACTS (JSON):
${JSON.stringify(kb)}`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return Response.json({ error: "The assistant isn't configured yet." }, { status: 500 });
        let messages: UIMessage[];
        try {
          const body = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(body.messages) || body.messages.length === 0) throw new Error();
          messages = body.messages.slice(-20);
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        const call = createResponsesCall(
          request,
          { baseURL: "https://ai.gateway.lovable.dev/v1", apiKey, model: "openai/gpt-6-astra" },
          await convertToModelMessages(messages),
          buildInstructions(),
        );
        return call.response();
      },
    },
  },
});
