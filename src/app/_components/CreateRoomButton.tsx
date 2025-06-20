"use client";

import { createRoom } from "../_lib/actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateRoomButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function createRoomAndRedirect() {
    const roomId = await createRoom();
    router.push(`/rooms/${roomId}`, { scroll: true });
  }

  return (
    <>
      <Button
        className="w-full"
        type="submit"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => await createRoomAndRedirect())
        }
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : null}
        Create New Room
      </Button>
    </>
  );
}
