import { drizzle } from "drizzle-orm/libsql";
import * as schema from './schema';

const db = drizzle({
  connection: { url: process.env.DB_FILE_NAME! },
  logger: true,
  schema,
});

export default db;
