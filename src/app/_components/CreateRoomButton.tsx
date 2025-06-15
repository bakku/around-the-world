"use client";

import { createRoom } from "../_lib/actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";

export default function CreateRoomButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <form action={createRoom}>
        <Button
          className="w-full"
          type="submit"
          disabled={isPending}
          onClick={() => startTransition(async () => createRoom())}
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : null}
          Create New Room
        </Button>
      </form>
    </>
  );
}
