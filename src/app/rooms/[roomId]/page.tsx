import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Game from "./_components/Game";
import { getRoom } from "./_lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roomId: string }>;
}): Promise<Metadata> {
  const { roomId } = await params;
  return {
    title: `Room ${roomId}`,
  };
}

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
