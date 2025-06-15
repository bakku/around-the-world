"use client";

import { useState, useEffect } from 'react';

interface Game {
  id: string;
  lastVisited: string;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function RecentGames() {
  const [recentGames, setRecentGames] = useState<Game[]>([]);

  useEffect(() => {
    const savedGames = localStorage.getItem("atw_recent_games");
    if (savedGames) {
      try {
        const games: Game[] = JSON.parse(savedGames);
        if (Array.isArray(games) && games.length > 0) {
          setRecentGames(games);
        }
      } catch (error) {
        console.error("Failed to parse recent games from localStorage", error);
        localStorage.removeItem("atw_recent_games");
      }
    }
  }, []);

  const continueGame = (gameId: string) => {
    console.log("Continuing game", gameId);
    // e.g., router.push(`/game/${gameId}`);
  };

  if (recentGames.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-4">Your recent games</h2>
      <p className="text-muted-foreground mb-6">
        It seems like you were recently playing the following games:
      </p>
      <div className="space-y-4">
        {recentGames.map((game, index) => (
          <button
            key={game.id}
            className="w-full text-left flex items-center justify-between p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            onClick={() => continueGame(game.id)}
          >
            <div>
              <div className="font-medium">Game {index + 1}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm">
                Last played: {formatDate(new Date(game.lastVisited))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
