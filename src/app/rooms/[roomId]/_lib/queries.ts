import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import db from "@/db";
import { roomsTable } from "@/db/schema";

export async function getRoom(roomId: string) {
  const room = await db().query.roomsTable.findFirst({
    with: {
      games: {
        with: {
          throws: true,
        },
        orderBy: (games, { desc }) => [desc(games.createdAt)],
      },
    },
    where: eq(roomsTable.id, roomId),
  });

  if (!room) return notFound();

  return room;
}
