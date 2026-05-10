import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "robotronix_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const MIN_PRODUCTION_SECRET_LENGTH = 32;

function getAdminSecret() {
  const secret = process.env.ADMIN_SECRET_KEY?.trim() ?? "";

  if (process.env.NODE_ENV === "production" && secret.length < MIN_PRODUCTION_SECRET_LENGTH) {
    throw new Error(`ADMIN_SECRET_KEY must be at least ${MIN_PRODUCTION_SECRET_LENGTH} characters in production.`);
  }

  return secret;
}

function shouldUseSecureCookie(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  return process.env.NODE_ENV === "production" && !isLocalhost && forwardedProto !== "http";
}

function signSession(issuedAt: string, secret: string) {
  return createHmac("sha256", secret).update(issuedAt).digest("hex");
}

function signaturesMatch(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");

  return left.length === right.length && timingSafeEqual(left, right);
}

export function isValidAdminPassword(password: unknown) {
  const secret = getAdminSecret();
  const isConfigured =
    process.env.NODE_ENV === "production" ? secret.length >= MIN_PRODUCTION_SECRET_LENGTH : secret.length > 0;

  return typeof password === "string" && isConfigured && password === secret;
}

export function createAdminSessionResponse(request: NextRequest) {
  const secret = getAdminSecret();
  const issuedAt = Date.now().toString();
  const signature = signSession(issuedAt, secret);
  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, `${issuedAt}.${signature}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return response;
}

export function clearAdminSessionResponse(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    maxAge: 0,
    path: "/",
  });

  return response;
}

export function hasAdminSession(request: NextRequest) {
  let secret = "";
  try {
    secret = getAdminSecret();
  } catch {
    return false;
  }
  const value = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!secret || !value) return false;

  const [issuedAt, signature] = value.split(".");
  const issuedAtMs = Number(issuedAt);

  if (!issuedAt || !signature || !Number.isFinite(issuedAtMs)) return false;
  if (Date.now() - issuedAtMs > SESSION_MAX_AGE_SECONDS * 1000) return false;

  return signaturesMatch(signature, signSession(issuedAt, secret));
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
