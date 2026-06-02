import { scrypt, randomBytes } from "node:crypto";
import { promisify } from "node:util";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
const HASH_PREFIX = "scrypt";

async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH);

  return `${HASH_PREFIX}$${salt}$${Buffer.from(derivedKey).toString("base64url")}`;
}

function requiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

const databaseUrl = requiredEnv("DATABASE_URL");
const email = requiredEnv("ADMIN_BOOTSTRAP_EMAIL").toLowerCase();
const password = requiredEnv("ADMIN_BOOTSTRAP_PASSWORD");
const name = process.env.ADMIN_BOOTSTRAP_NAME?.trim() || "Robotronix Admin";

if (password.length < 14) {
  throw new Error("ADMIN_BOOTSTRAP_PASSWORD must be at least 14 characters.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

try {
  const passwordHash = await hashPassword(password);
  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name, role: "admin", active: true },
    create: { email, passwordHash, name, role: "admin", active: true },
  });

  console.log(`Admin user ready: ${user.email}`);
} finally {
  await prisma.$disconnect();
}
