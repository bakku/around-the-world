import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface GameCompletedProps {
  throws: number;
  onStartNewGame: () => void;
}

export default function GameCompleted({
  throws,
  onStartNewGame,
}: GameCompletedProps) {
  return (
    <div className="mb-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-center mb-2">
          Game Completed!
        </h2>
        <p className="text-center text-muted-foreground mb-4">
          You completed the game in{" "}
          <span className="font-bold">{throws} throws</span>.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="touch-none select-none"
            style={{ touchAction: "manipulation" }}
            onClick={onStartNewGame}
          >
            Start New Game
          </Button>
        </div>
      </div>
    </div>
  );
}
