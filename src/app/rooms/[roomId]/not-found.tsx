import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RoomNotFound() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8 flex flex-col gap-8">
      <div className="bg-card rounded-lg border shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-4">Room Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn&apos;t find the room you&apos;re looking for. It may
          have been deleted or the link might be incorrect.
        </p>
        <Button asChild>
          <Link href="/" className="inline-flex items-center">
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
