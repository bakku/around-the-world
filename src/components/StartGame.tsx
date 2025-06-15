import { Button } from "@/components/ui/button";
import { createGame } from "@/app/actions";

export default function StartGame() {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Start a New Game</h2>
      <p className="text-muted-foreground mb-4">
        No account needed! Just click below to start a new game. You&#39;ll get a
        unique link to bookmark so you can return to view and update your scores
        anytime.
      </p>
      <form action={createGame}>
        <Button className="w-full" type="submit">
          Start New Game
        </Button>
      </form>
    </div>
  );
}
