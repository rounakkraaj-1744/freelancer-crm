import { NextResponse } from "next/server";
import { prisma } from "@/lib/supabase-server";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { score: "desc" },
    });
    return NextResponse.json(contacts);
  }
   catch (error) {
    return NextResponse.json({ error: "Failed to fetch pipeline data" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { contactId, stage } = await request.json();

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: { 
        stage,
        updatedAt: new Date(),
      },
    });

    await prisma.history.create({
      data: {
        contactId,
        type: "note",
        content: `Contact moved to stage: ${stage}`,
        direction: "system",
      },
    });

    return NextResponse.json(updatedContact);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update contact stage" }, { status: 500 });
  }
}