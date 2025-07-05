import { ExternalLink, Trash2Icon } from "lucide-react";
import React from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RecentRoom as RecentRoomType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function RecentRoom({
  room,
  onDelete,
}: {
  room: RecentRoomType;
  onDelete: (roomId: string) => void;
}) {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between">
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>
              Last played: {formatDate(new Date(room.lastVisited))}
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter>
          <div className="flex-grow flex flex-row gap-2">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 md:flex-none"
            >
              <Link href={`/rooms/${room.id}`}>
                <ExternalLink className="h-4 w-4" /> Open
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="lg"
                  aria-label={`Delete Room ${room.name}`}
                  className="flex-1 md:flex-none"
                >
                  <Trash2Icon className="h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Room?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove <b>{room.name}</b> from your
                    recent rooms?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => onDelete(room.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
