"use client";

import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createRoom } from "../_lib/actions";

export default function CreateRoomButton({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function createRoomAndRedirect() {
    const roomId = await createRoom();
    router.push(`/rooms/${roomId}`, { scroll: true });
  }

  return (
    <>
      <Button
        className={cn("w-full lg:w-auto", className)}
        size="lg"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => await createRoomAndRedirect())
        }
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : null}
        Start Playing
      </Button>
    </>
  );
}
