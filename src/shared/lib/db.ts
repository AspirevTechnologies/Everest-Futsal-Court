/**
 * SADP Pattern: Singleton Pattern for Database Connection Client
 * Prevents multiple instances across Next.js Hot Module Reloading (HMR)
 */

type DatabaseClient = {
  // Plug in PrismaClient, Drizzle, or Supabase here
  connected: boolean;
};

const globalForDb = globalThis as unknown as {
  dbClient: DatabaseClient | undefined;
};

export const db: DatabaseClient =
  globalForDb.dbClient ?? {
    connected: true,
  };

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbClient = db;
}
