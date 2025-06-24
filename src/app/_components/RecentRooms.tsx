"use client";

import { ExternalLink, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecentRooms, removeRecentRoom } from "@/lib/localStorage";
import { formatDate } from "@/lib/utils";

interface RecentRoom {
  roomId: string;
  lastVisited: string;
}

export default function RecentRooms() {
  const [recentRooms, setRecentRooms] = useState<RecentRoom[]>([]);

  useEffect(() => {
    setRecentRooms(getRecentRooms());
  }, []);

  const handleDelete = (e: React.MouseEvent, roomId: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeRecentRoom(roomId);
    setRecentRooms(getRecentRooms());
  };

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
          <div
            key={room.roomId}
            className="w-full text-left flex items-center p-4 border rounded-lg bg-muted/50"
          >
            <div className="flex-1">
              <div className="font-medium">Room {index + 1}</div>
              <div className="text-sm text-muted-foreground">
                Last played: {formatDate(new Date(room.lastVisited))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild variant="outline" size="icon">
                <Link href={`/rooms/${room.roomId}`}>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={(e) => handleDelete(e, room.roomId)}
                aria-label={`Delete Room ${index + 1}`}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
