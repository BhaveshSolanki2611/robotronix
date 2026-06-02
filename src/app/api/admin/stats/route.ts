import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { requireAdminSession, unauthorizedResponse } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await requireAdminSession(request, { action: "admin.read_dashboard", resource: "dashboard" }))) {
    return unauthorizedResponse();
  }

  const prisma = getPrisma();
  const [contactCount, demoCount, careerCount, newsletterCount, recentContacts, recentDemos, recentApplications] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.demoRequest.count(),
    prisma.careerApplication.count(),
    prisma.newsletterSubscription.count({ where: { active: true } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.careerApplication.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return NextResponse.json({
    stats: { contactCount, demoCount, careerCount, newsletterCount },
    recentContacts,
    recentDemos,
    recentApplications,
  });
}
