import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export const roomsTable = sqliteTable("rooms", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const roomsRelations = relations(roomsTable, ({ many }) => ({
  games: many(gamesTable),
}));

export const gamesTable = sqliteTable("games", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  roomId: text("room_id")
    .references(() => roomsTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const gamesRelations = relations(gamesTable, ({ one, many }) => ({
  room: one(roomsTable, {
    fields: [gamesTable.roomId],
    references: [roomsTable.id],
  }),
  throws: many(throwsTable),
}));

export const throwsTable = sqliteTable("throws", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  gameId: text("game_id")
    .references(() => gamesTable.id, { onDelete: "cascade" })
    .notNull(),
  target: integer("target").notNull(),
  hit: integer("hit", { mode: "boolean" }).notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const throwsRelations = relations(throwsTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [throwsTable.gameId],
    references: [gamesTable.id],
  }),
}));
