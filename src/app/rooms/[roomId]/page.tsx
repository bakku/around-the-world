import { notFound } from "next/navigation";
import Game from "@/app/rooms/[roomId]/_components/Game";
import { getRoom } from "@/app/rooms/[roomId]/_lib/queries";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  const room = await getRoom(roomId);

  if (!room) return notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 flex flex-col gap-8">
      <Game room={room} />
    </main>
  );
}
