<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-2">
        Around the World
      </h1>
      <p class="text-muted-foreground text-center mb-8">
        Track your progress in the dart game "Around the World"
      </p>

      <div class="bg-card rounded-lg border shadow-sm p-8 max-w-3xl mx-auto mb-8">
        <div class="bg-muted rounded-lg p-6 mb-8">
          <h2 class="text-2xl font-semibold mb-4">
            How to Play
          </h2>
          <ul class="space-y-2 list-disc pl-6 text-muted-foreground">
            <li>Start at number 1 and work your way up to 20</li>
            <li>Hit each number once to proceed to the next number</li>
            <li>The goal is to complete the game as quickly as possible</li>
            <li>Track your progress and high scores using the unique link</li>
          </ul>
        </div>

        <div class="bg-muted rounded-lg p-6">
          <h2 class="text-2xl font-semibold mb-4">
            Start a New Game
          </h2>
          <p class="text-muted-foreground mb-4">
            No account needed! Just click below to start a new game. You'll get a unique link to bookmark so you can return to view and update your scores anytime.
          </p>
          <Button
            class="w-full"
            @click="startGame"
          >
            Start New Game
          </Button>
        </div>
      </div>

      <!-- Recent Games Section -->
      <div
        v-if="recentGames.length > 0"
        class="bg-card rounded-lg border shadow-sm p-8 max-w-3xl mx-auto"
      >
        <h2 class="text-2xl font-semibold mb-4">
          Recent Games
        </h2>
        <p class="text-muted-foreground mb-6">
          Continue one of your recent games:
        </p>

        <div class="space-y-4">
          <div
            v-for="(game, index) in recentGames"
            :key="game.id"
            class="flex items-center justify-between p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
            @click="continueGame(game.id)"
          >
            <div>
              <div class="font-medium">
                Game {{ index + 1 }}
              </div>
            </div>
            <div class="flex flex-col items-end">
              <div class="text-sm">
                Last played: {{ formatDate(new Date(game.lastVisited)) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { router } from "@inertiajs/vue3";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout.vue";

// Define type for recent game data
interface RecentGame {
  id: string;
  lastVisited: string;
  bestScore: number | null;
}

const recentGames = ref<RecentGame[]>([]);

onMounted(() => {
  // Load recent games from localStorage
  const savedGames = localStorage.getItem("atw_recent_games");
  if (savedGames) {
    recentGames.value = JSON.parse(savedGames);
  }
});

const startGame = () => {
  // Let the backend create the game and generate the UUID
  router.post("/games");
};

const continueGame = (gameId: string) => {
  router.get(`/games/${gameId}`);
};

// Format a date
const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
