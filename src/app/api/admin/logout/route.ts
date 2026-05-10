import { clearAdminSessionResponse } from "@/lib/adminAuth";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return clearAdminSessionResponse(request);
}
