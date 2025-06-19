"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import { getRecentRooms } from "@/lib/localStorage";
import Link from "next/link";

interface RecentRoom {
  roomId: string;
  lastVisited: string;
}

export default function RecentRooms() {
  const [recentRooms, setRecentRooms] = useState<RecentRoom[]>([]);

  useEffect(() => {
    setRecentRooms(getRecentRooms());
  }, []);

  if (recentRooms.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-4">Your recent rooms</h2>
      <p className="text-muted-foreground mb-6">
        It seems like you were recently playing the following rooms:
      </p>
      <div className="space-y-4">
        {recentRooms.map((room, index) => (
          <Link
            key={room.roomId}
            href={`/rooms/${room.roomId}`}
            className="w-full text-left flex items-center justify-between p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div>
              <div className="font-medium">Room {index + 1}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm">
                Last played: {formatDate(new Date(room.lastVisited))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
