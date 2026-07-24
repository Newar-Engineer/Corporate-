import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

let client: PrismaClient | null = null;

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
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