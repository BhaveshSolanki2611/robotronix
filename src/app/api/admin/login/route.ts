import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema, authenticateAdmin, createAdminSessionResponse } from "@/lib/adminAuth";
import { adminLoginRateLimit, checkRateLimit, rateLimitedResponse } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const limit = checkRateLimit(request, "admin-login", adminLoginRateLimit);
    if (!limit.allowed) {
      return rateLimitedResponse(limit.retryAfter);
    }

    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request body." }, { status: 400 });
    }

    const user = await authenticateAdmin(parsed.data.email, parsed.data.password, request);

    if (!user) {
      return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
    }

    return createAdminSessionResponse(request, user);
  } catch (error) {
    console.error("Admin login error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to sign in. Please try again." }, { status: 500 });
  }
}
