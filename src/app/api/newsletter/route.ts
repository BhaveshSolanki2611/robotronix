import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { formatValidationError, newsletterSubscriptionSchema } from "@/lib/apiValidation";
import { checkRateLimit, publicFormRateLimit, rateLimitedResponse } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const limit = checkRateLimit(request, "newsletter-form", publicFormRateLimit);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfter);

    const prisma = getPrisma();
    const parsed = newsletterSubscriptionSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: formatValidationError(parsed.error) }, { status: 400 });
    }

    await prisma.newsletterSubscription.upsert({
      where: { email: parsed.data.email },
      update: { active: true },
      create: parsed.data,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
