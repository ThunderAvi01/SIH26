import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json(); // type: "tutor" | "quiz"
    const apiKey = process.env.GROK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GROK_API_KEY is not configured" }, { status: 500 });
    }

    let systemPrompt = "";
    if (type === "tutor") {
      systemPrompt = "You are a friendly, encouraging, and highly effective AI tutor named GramLearn Tutor, designed for school students in rural India. Explain concepts in extremely simple terms, using real-life rural analogies (farming, sharing food, village community, cricket, etc.). Always suggest: 1) One simple explanation, 2) One concrete real-life example, and 3) A short 1-question quiz to test understanding. Adapt explanation to the user's Grade 6-10 level.";
    } else if (type === "quiz") {
      systemPrompt = "You are an educational curriculum assistant helping rural school teachers. Generate a structured quiz on the requested topic for grade 6-8 students. The response must be a JSON array of questions, each having fields: 'questionText' (string), 'options' (array of 4 strings), 'correctAnswer' (string, matching one option exactly), and 'explanation' (string). Return ONLY the raw JSON array (no markdown code blocks, no backticks, no wrap text).";
    }

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-2",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      return NextResponse.json({ error: `Grok API error: ${errData}` }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (type === "quiz") {
      try {
        // Clean markdown code fence formatting if the model ignored system prompt constraints
        const cleanContent = content.replace(/```json/g, "").replace(/```/g, "").trim();
        const quizData = JSON.parse(cleanContent);
        return NextResponse.json(quizData);
      } catch (parseError) {
        return NextResponse.json({ error: "Failed to parse generated quiz JSON", rawContent: content }, { status: 500 });
      }
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
