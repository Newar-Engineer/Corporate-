import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let client: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder";
  if (!process.env.DATABASE_URL) {
    console.warn("Warning: DATABASE_URL environment variable is not set. Using dummy connection string for build.");
  }
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}

const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!client) {
      client = createPrismaClient();
    }
    return (client as any)[prop];
  },
});

export { prisma };