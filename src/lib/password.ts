import "server-only";

import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
const HASH_PREFIX = "scrypt";

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  return `${HASH_PREFIX}$${salt}$${derivedKey.toString("base64url")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [prefix, salt, encodedHash] = storedHash.split("$");

  if (prefix !== HASH_PREFIX || !salt || !encodedHash) {
    return false;
  }

  const expected = Buffer.from(encodedHash, "base64url");
  const actual = (await scryptAsync(password, salt, expected.length)) as Buffer;

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
