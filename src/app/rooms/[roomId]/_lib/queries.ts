import db from "@/db";
import { eq } from "drizzle-orm";
import { roomsTable } from "@/db/schema";

export async function getRoom(roomId: string) {
  return await db.query.roomsTable.findFirst({
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
}
