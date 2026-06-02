import "server-only";

import { createHash, randomBytes } from "crypto";
import type { Prisma } from "@prisma/client";
import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { getClientIp } from "@/lib/rateLimit";

const ADMIN_SESSION_COOKIE = "robotronix_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid admin email address.").max(254),
  password: z.string().min(1, "Password is required.").max(256),
});

export type AdminSessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

function shouldUseSecureCookie(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  return process.env.NODE_ENV === "production" && !isLocalhost && forwardedProto !== "http";
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getRequestMetadata(request: NextRequest) {
  return {
    ipAddress: getClientIp(request),
    userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
  };
}

function getHeadersMetadata(headerStore: Headers) {
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headerStore.get("x-real-ip")?.trim();

  return {
    ipAddress: forwardedFor || realIp || "unknown",
    userAgent: headerStore.get("user-agent")?.slice(0, 500) ?? null,
  };
}

function sessionCookieOptions(request: NextRequest) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: shouldUseSecureCookie(request),
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  };
}

export async function logAdminAudit(
  request: NextRequest,
  action: string,
  options: { userId?: string; resource?: string; metadata?: Prisma.InputJsonValue } = {},
) {
  const prisma = getPrisma();
  const { ipAddress, userAgent } = getRequestMetadata(request);

  await prisma.adminAuditLog.create({
    data: {
      userId: options.userId,
      action,
      resource: options.resource,
      metadata: options.metadata,
      ipAddress,
      userAgent,
    },
  });
}

export async function logAdminAuditFromHeaders(
  action: string,
  options: { userId?: string; resource?: string; metadata?: Prisma.InputJsonValue } = {},
) {
  const prisma = getPrisma();
  const headerStore = await headers();
  const { ipAddress, userAgent } = getHeadersMetadata(headerStore);

  await prisma.adminAuditLog.create({
    data: {
      userId: options.userId,
      action,
      resource: options.resource,
      metadata: options.metadata,
      ipAddress,
      userAgent,
    },
  });
}

export async function authenticateAdmin(email: string, password: string, request: NextRequest) {
  const prisma = getPrisma();
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } });

  if (!user || !user.active) {
    await logAdminAudit(request, "admin.login_failed", {
      metadata: { reason: "invalid_credentials", email: normalizedEmail },
    });
    return null;
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);

  if (!passwordMatches) {
    await logAdminAudit(request, "admin.login_failed", {
      userId: user.id,
      metadata: { reason: "invalid_credentials", email: normalizedEmail },
    });
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function createAdminSessionResponse(request: NextRequest, user: AdminSessionUser) {
  const prisma = getPrisma();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  const { ipAddress, userAgent } = getRequestMetadata(request);
  const response = NextResponse.json({ success: true });

  await prisma.adminSession.create({
    data: {
      tokenHash: hashSessionToken(token),
      userId: user.id,
      ipAddress,
      userAgent,
      expiresAt,
    },
  });

  await logAdminAudit(request, "admin.login_success", { userId: user.id });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, sessionCookieOptions(request));

  return response;
}

export async function clearAdminSessionResponse(request: NextRequest) {
  const prisma = getPrisma();
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const response = NextResponse.json({ success: true });

  if (token) {
    const tokenHash = hashSessionToken(token);
    const session = await prisma.adminSession.findUnique({ where: { tokenHash } });

    if (session) {
      await prisma.adminSession.delete({ where: { tokenHash } });
      await logAdminAudit(request, "admin.logout", { userId: session.userId });
    }
  }

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...sessionCookieOptions(request),
    maxAge: 0,
  });

  return response;
}

async function getSessionByToken(token: string | undefined) {
  if (!token) return null;

  const prisma = getPrisma();
  const tokenHash = hashSessionToken(token);
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session || session.expiresAt <= new Date() || !session.user.active) {
    if (session) {
      await prisma.adminSession.delete({ where: { tokenHash } }).catch(() => undefined);
    }
    return null;
  }

  await prisma.adminSession.update({
    where: { tokenHash },
    data: { lastUsedAt: new Date() },
  });

  return {
    id: session.id,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
    },
  };
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  const value = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  return getSessionByToken(value);
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return getSessionByToken(value);
}

export async function requireAdminSession(request: NextRequest, audit?: { action: string; resource?: string }) {
  const session = await getAdminSessionFromRequest(request);

  if (!session || session.user.role !== "admin") return null;

  if (audit) {
    await logAdminAudit(request, audit.action, { userId: session.user.id, resource: audit.resource });
  }

  return session;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
