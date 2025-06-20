"use server";

import { revalidatePath } from "next/cache";
import db from "@/db";
import { gamesTable, throwsTable } from "@/db/schema";
import { UnpersistedThrow } from "./types";

export async function saveGame(roomId: string, throws: UnpersistedThrow[]) {
  await db().transaction(async (tx) => {
    const newGame = await tx.insert(gamesTable).values({ roomId }).returning();
    await tx
      .insert(throwsTable)
      .values(throws.map((t) => ({ ...t, gameId: newGame[0].id })));
  });

  revalidatePath(`/rooms/${roomId}`);
}
