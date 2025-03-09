import { auth } from "@/app/(auth)/auth";
import { getUserCredits, decrementUserCredits } from "@/lib/db/queries";
import { NextResponse } from "next/server";

// GET /api/credits - Get current user credits
export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const credits = await getUserCredits(session.user.id);

  return NextResponse.json({ credits });
}

// POST /api/credits/decrement - Decrement user credits by 1
export async function POST(request: Request) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const success = await decrementUserCredits(session.user.id);

  if (!success) {
    return NextResponse.json(
      { error: "Insufficient credits or update failed" },
      { status: 400 }
    );
  }

  const updatedCredits = await getUserCredits(session.user.id);

  return NextResponse.json({
    success: true,
    credits: updatedCredits,
  });
}
