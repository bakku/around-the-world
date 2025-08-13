"use client";

import { Loader2Icon } from "lucide-react";
import React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRecentRooms } from "@/lib/localStorage";
import { createRoom } from "../_lib/actions";

type FormActionState = {
  error?: ReturnType<typeof z.flattenError>;
};

export default function CreateRoomForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    async (_prevState: FormActionState, formData: FormData) => {
      const result = await createRoom(formData);

      if (result.error) return result;

      router.push(`/rooms/${result.roomId}`, { scroll: true });

      return { error: undefined };
    },
    { error: undefined },
  );

  const recentRooms = getRecentRooms();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a new room</CardTitle>
        <CardDescription>
          All your games will be stored in your room.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="room-name">Room name</Label>
            <Input
              id="room-name"
              name="name"
              type="text"
              placeholder="Ally Pally"
              required
              aria-invalid={!!state.error}
              aria-describedby={state.error ? "room-name-error" : undefined}
              disabled={pending}
            />
            {state.error?.fieldErrors?.name && (
              <div id="room-name-error" className="text-destructive text-sm">
                {state.error.fieldErrors.name}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={pending} size="lg">
            {pending ? <Loader2Icon className="animate-spin mr-2" /> : null}
            Create Room
          </Button>
        </form>

        {recentRooms.length > 0 && (
          <>
            <div className="flex items-center my-4 gap-1">
              <div className="flex-grow border-t border-gray-300" />
              <span className="text-muted-foreground text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link href="/rooms/recent">View recently visited rooms</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
