import { RecentRoom } from "@/lib/types";

const RECENT_ROOMS_KEY = "atw_recent_rooms";
const MAX_RECENT_ROOMS = 10;

export function getRecentRooms(): RecentRoom[] {
  try {
    const data = localStorage.getItem(RECENT_ROOMS_KEY);
    if (!data) return [];
    const rooms: RecentRoom[] = JSON.parse(data);
    if (!Array.isArray(rooms)) return [];
    return rooms;
  } catch {
    return [];
  }
}

export function addRecentRoom(id: string, name: string) {
  const now = new Date().toISOString();
  let rooms = getRecentRooms();
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx !== -1) {
    rooms[idx].lastVisited = now;
  } else {
    rooms.unshift({ id, name, lastVisited: now });
  }
  // Sort by lastVisited descending
  rooms = rooms
    .sort(
      (a, b) =>
        new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime(),
    )
    .slice(0, MAX_RECENT_ROOMS);
  localStorage.setItem(RECENT_ROOMS_KEY, JSON.stringify(rooms));
}

export function removeRecentRoom(id: string) {
  try {
    const rooms = getRecentRooms().filter((room) => room.id !== id);
    localStorage.setItem(RECENT_ROOMS_KEY, JSON.stringify(rooms));
  } catch {
    // ignore
  }
}
