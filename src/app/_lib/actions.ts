"use server";

import db from "@/db";
import { roomsTable } from "@/db/schema";
import { redirect } from "next/navigation";

export async function createRoom() {
  const result = await db.insert(roomsTable).values({}).returning();
  redirect(`/rooms/${result[0].id}`);
}
