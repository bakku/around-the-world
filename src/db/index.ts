import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>>;

function db() {
  if (!_db) {
    _db = drizzle({
      connection: { url: process.env.DB_FILE_NAME! },
      logger: true,
      schema,
    });
  }

  return _db;
}

export default db;
