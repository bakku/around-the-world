"use server";

import { z } from "zod";
import db from "@/db";
import { roomsTable } from "@/db/schema";

const RoomSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required." }),
});

export async function createRoom(formData: FormData) {
  const result = RoomSchema.safeParse({
    name: formData.get("name"),
  });

  if (!result.success) {
    return { error: z.flattenError(result.error) };
  }

  const createdRooms = await db()
    .insert(roomsTable)
    .values({
      ...result.data,
    })
    .returning();

  return { roomId: createdRooms[0].id };
}
