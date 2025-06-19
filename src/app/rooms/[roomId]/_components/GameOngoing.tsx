import { Button } from "@/components/ui/button";
import { Target, X, RefreshCw } from "lucide-react";

interface GameOngoingProps {
  currentNumber: number;
  throwsCount: number;
  bestScore: number | null;
  onHit: () => void;
  onMiss: () => void;
  onReset: () => void;
}

export default function GameOngoing({
  currentNumber,
  throwsCount,
  bestScore,
  onHit,
  onMiss,
  onReset,
}: GameOngoingProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-center mb-4">
        <div className="relative w-40 h-40 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <div className="text-7xl font-bold text-primary">
            {currentNumber}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Current Throws</p>
          <p className="text-xl font-bold">{throwsCount}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">Best Score</p>
          <p className="text-xl font-bold">{bestScore ?? "-"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <Button
          variant="default"
          size="lg"
          className="h-16 text-lg touch-none select-none"
          onClick={onHit}
        >
          <Target className="mr-2 h-5 w-5" />
          Hit the Number
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-16 text-lg touch-none select-none"
          onClick={onMiss}
        >
          <X className="mr-2 h-5 w-5" />
          Missed
        </Button>
        <Button
          variant="destructive"
          size="lg"
          className="h-16 text-lg touch-none select-none"
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Reset Game
        </Button>
      </div>
    </div>
  );
} 