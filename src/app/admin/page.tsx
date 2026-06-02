import AdminDashboardClient from "@/app/admin/AdminDashboardClient";
import { getAdminSessionFromCookies, logAdminAuditFromHeaders } from "@/lib/adminAuth";
import { getPrisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const prisma = getPrisma();
  const [contactCount, demoCount, careerCount, newsletterCount, recentContacts, recentDemos, recentApplications] =
    await Promise.all([
      prisma.contactSubmission.count(),
      prisma.demoRequest.count(),
      prisma.careerApplication.count(),
      prisma.newsletterSubscription.count({ where: { active: true } }),
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.careerApplication.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  return {
    stats: { contactCount, demoCount, careerCount, newsletterCount },
    contacts: recentContacts.map((item) => ({ ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() })),
    demos: recentDemos.map((item) => ({ ...item, createdAt: item.createdAt.toISOString(), updatedAt: item.updatedAt.toISOString() })),
    applications: recentApplications.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    })),
  };
}

export default async function AdminPage() {
  const session = await getAdminSessionFromCookies();
  const isAdmin = session?.user.role === "admin";

  if (isAdmin) {
    await logAdminAuditFromHeaders("admin.read_dashboard", { userId: session.user.id, resource: "dashboard" });
  }

  const dashboardData = isAdmin ? await getDashboardData() : { stats: null, contacts: [], demos: [], applications: [] };

  return <AdminDashboardClient initialAuthenticated={isAdmin} {...dashboardData} />;
}
