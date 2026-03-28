import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  return new PrismaClient().$extends(withAccelerate());
}

/** Single instance per runtime — avoids exhausting DB connections (P2037) when modules reload. */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = prisma;

export default prisma;
