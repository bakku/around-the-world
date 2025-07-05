"use client";

import React, { useEffect, useState } from "react";
import { getRecentRooms, removeRecentRoom } from "@/lib/localStorage";
import type { RecentRoom as RecentRoomType } from "@/lib/types";
import RecentRoom from "./RecentRoom";

export default function RecentRooms() {
  const [recentRooms, setRecentRooms] = useState<RecentRoomType[]>([]);

  useEffect(() => {
    setRecentRooms(getRecentRooms());
  }, []);

  const handleDelete = (roomId: string) => {
    removeRecentRoom(roomId);
    setRecentRooms(getRecentRooms());
  };

  if (recentRooms.length === 0) {
    return <p>No recent rooms found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {recentRooms.map((room) => (
        <RecentRoom key={room.id} room={room} onDelete={handleDelete} />
      ))}
    </div>
  );
}
