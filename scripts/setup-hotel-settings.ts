import { config } from "dotenv";
config({ path: ".env" });
import { neon } from "@neondatabase/serverless";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  const sql = neon(connectionString);

  console.log("Setting up hotel_settings table...");
  await sql.query(`
    CREATE TABLE IF NOT EXISTS hotel_settings (
      id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
      private_boat_price INTEGER NOT NULL DEFAULT 20000,
      standard_boat_price INTEGER NOT NULL DEFAULT 0,
      private_boat_title VARCHAR(255) DEFAULT 'Exclusive Private Boat',
      private_boat_description TEXT DEFAULT 'Dedicated luxury boat exclusively for your group.',
      private_transfer_price INTEGER NOT NULL DEFAULT 5000,
      group_transfer_price INTEGER NOT NULL DEFAULT 500,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await sql.query(`
    INSERT INTO hotel_settings (id, private_boat_price, standard_boat_price, private_boat_title, private_boat_description, private_transfer_price, group_transfer_price)
    VALUES ('default', 20000, 0, 'Exclusive Private Boat', 'Dedicated luxury boat exclusively for your group.', 5000, 500)
    ON CONFLICT (id) DO NOTHING;
  `);

  const rows = await sql.query("SELECT * FROM hotel_settings WHERE id = 'default'");
  console.log("hotel_settings ready:", rows);
}

main().catch(console.error);

