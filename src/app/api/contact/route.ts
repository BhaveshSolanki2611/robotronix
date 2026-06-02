import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { requireAdminSession, unauthorizedResponse } from "@/lib/adminAuth";
import { contactSubmissionSchema, formatValidationError } from "@/lib/apiValidation";
import { checkRateLimit, publicFormRateLimit, rateLimitedResponse } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const limit = checkRateLimit(request, "contact-form", publicFormRateLimit);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);

    const prisma = getPrisma();
    const parsed = contactSubmissionSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: formatValidationError(parsed.error) }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!(await requireAdminSession(request, { action: "admin.read_contacts", resource: "contacts" }))) {
    return unauthorizedResponse();
  }

  const prisma = getPrisma();
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ submissions });
}
