import { Throw } from "@/lib/types";

export type UnpersistedThrow = Omit<
  Throw,
  "id" | "gameId" | "createdAt" | "updatedAt"
>;
