import { RoomWithGamesWithThrows } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function RecentScores({
  room,
}: {
  room: RoomWithGamesWithThrows;
}) {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-8">
      <h2 className="text-xl font-semibold mb-1">Your Recent Games</h2>

      {room.games.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No games recorded yet.
        </div>
      ) : (
        <div>
          <div className="flex justify-between my-2 px-4 py-2 text-sm text-muted-foreground">
            <span>Date</span>
            <span>Throws</span>
          </div>
          <div className="space-y-2">
            {room.games.map((game, index) => (
              <div
                key={game.id}
                className={`flex flex-col p-4 border rounded-md ${index === 0 ? "bg-primary/5 border-primary/20" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(new Date(game.createdAt))}
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{game.throws.length}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
