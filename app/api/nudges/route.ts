import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { prisma } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { contactId } = await request.json();

    const contact = await prisma.contact.findUnique({
      where: {
        id: contactId
      },
      include: {
        history: {
          take: 5,
          orderBy: {
            createdAt: "desc"
          }
        }
      },
    });

    if (!contact) 
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });

    const historyString = contact.history.map((h: { direction: string; type: string; content: string }) => `${h.direction === "inbound" ? "They" : "I"} ${h.type}: ${h.content}`).join("\n");

    const prompt = `
      You are an AI Freelancer CRM assistant. 
      Help me generate a personalized, professional but friendly follow-up message (nudge) for my client ${contact.name}.
      
      Company: ${contact.company || "Not specified"}
      Recent Interactions:
      ${historyString || "No recent history."}
      
      Context: ${contact.notes || "Just following up on their interest."}
      
      Requirements:
      - Keep it short (max 3 sentences).
      - Reference their specific context (Upwork/LinkedIn/Rust/API etc if known).
      - Maintain a helpful, low-pressure tone.
      - Start with "Hi ${contact.name.split(" ")[0]},".
      
      Generate only the message content. No explanations.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 150,
    });

    const message = chatCompletion.choices[0]?.message?.content || "Hi reach out soon!";

    await prisma.history.create({
      data: {
        contactId,
        type: "ai_nudge",
        content: `AI generated nudge: "${message.substring(0, 50)}..."`,
        direction: "system",
      },
    });

    return NextResponse.json({ message });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate nudge" }, { status: 500 });
  }
}