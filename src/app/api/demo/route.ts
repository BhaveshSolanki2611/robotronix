import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { requireAdminSession, unauthorizedResponse } from "@/lib/adminAuth";
import { demoRequestSchema, formatValidationError } from "@/lib/apiValidation";
import { checkRateLimit, publicFormRateLimit, rateLimitedResponse } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const limit = checkRateLimit(request, "demo-form", publicFormRateLimit);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);

    const prisma = getPrisma();
    const parsed = demoRequestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: formatValidationError(parsed.error) }, { status: 400 });
    }

    const demo = await prisma.demoRequest.create({
      data: parsed.data,
    });

    return NextResponse.json({ success: true, id: demo.id }, { status: 201 });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!(await requireAdminSession(request, { action: "admin.read_demos", resource: "demos" }))) {
    return unauthorizedResponse();
  }

  const prisma = getPrisma();
  const demos = await prisma.demoRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ demos });
}
