"use server";

import db from "@/db";
import { roomsTable } from "@/db/schema";

export async function createRoom() {
  const result = await db().insert(roomsTable).values({}).returning();
  return result[0].id;
}
