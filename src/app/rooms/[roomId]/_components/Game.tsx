"use client";

import { useState, useMemo, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Target, X, RefreshCw, CheckCircle, Copy } from "lucide-react";
import { RecentRoom, RoomWithGamesWithThrows } from "@/lib/types";
import { saveGame } from "../_lib/actions";
import { UnpersistedThrow } from "../_lib/types";
import RecentScores from "./RecentScores";
import RecentScoresSkeleton from "@/app/rooms/[roomId]/_components/RecentScoresSkeleton";
import GameCompleted from "./GameCompleted";
import GameOngoing from "./GameOngoing";
import { addRecentRoom } from "@/lib/localStorage";

async function copyLinkToClipboard() {
  await navigator.clipboard.writeText(window.location.href);
  toast.success("Link copied!", {
    description: "The game link has been copied to your clipboard.",
  });
}

export default function Game({ room }: { room: RoomWithGamesWithThrows }) {
  const [isLoadingScores, startLoadingScoresTransition] = useTransition();
  const [throws, setThrows] = useState<UnpersistedThrow[]>([]);

  useEffect(() => {
    addRecentRoom(room.id);
  }, [room.id]);

  const currentNumber = useMemo(() => {
    const reverseHitThrows = throws
      .filter(({ hit }) => hit)
      .map(({ target }) => target)
      .toSorted((a, b) => b - a);

    return (reverseHitThrows.at(0) || 0) + 1;
  }, [throws]);

  useEffect(() => {
    if (currentNumber > 20) {
      startLoadingScoresTransition(async () => await saveGame(room.id, throws));
    }
    // `currentNumber` is being calculated when `throws` updates, so `throws`
    // shouldn't be tracked as useEffect dependencies. `room.id` is static for
    // this room, so it also does not make sense to track it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber]);

  const gameFinished = useMemo(() => currentNumber > 20, [currentNumber]);

  const bestScore = useMemo(() => {
    if (room.games.length === 0) return null;

    return room.games.map(({ throws }) => throws.length).toSorted()[0];
  }, [room]);

  function resetGame() {
    setThrows([]);
  }

  function handleHit() {
    setThrows((prev) => [...prev, { hit: true, target: currentNumber }]);
  }

  function handleMiss() {
    setThrows((prev) => [...prev, { hit: false, target: currentNumber }]);
  }

  function startNewGame() {
    resetGame();
  }

  return (
    <>
      <div className="bg-card rounded-lg border shadow-sm p-8">
        <div className="flex items-center justify-between mb-1 gap-4">
          <h2 className="text-xl font-semibold">Around the World</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap touch-none select-none"
              style={{ touchAction: "manipulation" }}
              onClick={copyLinkToClipboard}
            >
              <Copy className="w-4 h-4 mr-1" />
              <span className="hidden sm:block">Copy Link</span>
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mb-4">
          Bookmark this page to return to your progress!
        </p>

        {!gameFinished ? (
          <GameOngoing
            currentNumber={currentNumber}
            throwsCount={throws.length}
            bestScore={bestScore}
            onHit={handleHit}
            onMiss={handleMiss}
            onReset={resetGame}
          />
        ) : (
          <GameCompleted throws={throws.length} onStartNewGame={startNewGame} />
        )}
      </div>

      {isLoadingScores ? (
        <RecentScoresSkeleton />
      ) : (
        <RecentScores room={room} />
      )}
    </>
  );
}
