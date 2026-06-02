import "server-only";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  windowMs: number;
  max: number;
};

const buckets = new Map<string, Bucket>();
let lastPrunedAt = 0;

function pruneExpiredBuckets(now: number) {
  if (now - lastPrunedAt < 60_000) return;

  lastPrunedAt = now;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown";
}

export function checkRateLimit(request: NextRequest, scope: string, options: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${scope}:${getClientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const bucket = { count: 1, resetAt: now + options.windowMs };
    buckets.set(key, bucket);

    return {
      allowed: true,
      limit: options.max,
      remaining: options.max - 1,
      retryAfter: 0,
      resetAt: bucket.resetAt,
    };
  }

  current.count += 1;

  return {
    allowed: current.count <= options.max,
    limit: options.max,
    remaining: Math.max(options.max - current.count, 0),
    retryAfter: Math.ceil((current.resetAt - now) / 1000),
    resetAt: current.resetAt,
  };
}

export function rateLimitedResponse(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    },
  );
}

export const adminLoginRateLimit = {
  windowMs: 15 * 60 * 1000,
  max: 5,
};

export const publicFormRateLimit = {
  windowMs: 10 * 60 * 1000,
  max: 20,
};
