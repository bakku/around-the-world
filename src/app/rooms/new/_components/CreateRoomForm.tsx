"use client";

import { Loader2Icon } from "lucide-react";
import { z } from "zod/v4";
import React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormActionState = {
  error?: ReturnType<typeof z.flattenError>;
};

export default function CreateRoomForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    async (_prevState: FormActionState, formData: FormData) => {
      const result = await createRoom(formData);

      if (result.error) return result;

      router.push(`/rooms/${result.roomId}`);
      return { error: undefined };
    },
    { error: undefined },
  );

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
          <CardFooter className="px-0">
            <Button
              type="submit"
              className="w-full"
              disabled={pending}
              size="lg"
            >
              {pending ? <Loader2Icon className="animate-spin mr-2" /> : null}
              Create Room
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
