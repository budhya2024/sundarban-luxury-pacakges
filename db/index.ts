import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Safe fallback to avoid build time crashes if env is missing
  console.warn("DATABASE_URL environment variable is not defined");
}

const client = neon(connectionString || "");
export const db = drizzle(client, { schema });
