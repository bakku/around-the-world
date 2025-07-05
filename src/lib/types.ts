import { gamesTable, roomsTable, throwsTable } from "@/db/schema";

export type Room = typeof roomsTable.$inferSelect;
export type Game = typeof gamesTable.$inferSelect;
export type Throw = typeof throwsTable.$inferSelect;

export type GameWithThrows = Game & { throws: Throw[] };

export type RoomWithGamesWithThrows = Room & {
  games: GameWithThrows[];
};

export type RecentRoom = {
  id: string;
  name: string;
  lastVisited: string;
};
