"use server";

import db from "@/db";
import { roomsTable } from "@/db/schema";

export async function createRoom() {
  const result = await db()
    .insert(roomsTable)
    .values({
      // TODO: Fill this with a proper name.
      name: "",
    })
    .returning();
  return result[0].id;
}
