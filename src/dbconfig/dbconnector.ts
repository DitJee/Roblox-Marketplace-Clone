import { Pool } from "pg";
import "dotenv/config";

const user: string = process.env.DB_USER;
const password: string = process.env.DB_PASSWORD;
const hostname: string = process.env.DB_HOSTNAME;
const port: string = process.env.DB_PORT;
const dbName: string = process.env.DB_NAME;
const connectionString = `postgres://${user}:${password}@${hostname}:${port}/${dbName}`;

// "postgres://postgres:postgres@localhost:5432/postgres"
export default new Pool({
  max: 20,
  connectionString: connectionString,
  idleTimeoutMillis: 30000,
});
