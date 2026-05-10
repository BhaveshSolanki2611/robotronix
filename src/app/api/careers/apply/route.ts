import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { hasAdminSession, unauthorizedResponse } from "@/lib/adminAuth";
import { careerApplicationSchema, formatValidationError } from "@/lib/apiValidation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const parsed = careerApplicationSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: formatValidationError(parsed.error) }, { status: 400 });
    }

    const application = await prisma.careerApplication.create({
      data: parsed.data,
    });

    return NextResponse.json({ success: true, id: application.id }, { status: 201 });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!hasAdminSession(request)) return unauthorizedResponse();

  const prisma = getPrisma();
  const applications = await prisma.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ applications });
}
