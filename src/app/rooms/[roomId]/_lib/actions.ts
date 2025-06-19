"use server";

import { UnpersistedThrow } from "./types";
import db from "@/db";
import { gamesTable, throwsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function saveGame(roomId: string, throws: UnpersistedThrow[]) {
  const newGame = await db().insert(gamesTable).values({ roomId }).returning();

  await db()
    .insert(throwsTable)
    .values(throws.map((t) => ({ ...t, gameId: newGame[0].id })));

  revalidatePath(`/rooms/${roomId}`);
}
