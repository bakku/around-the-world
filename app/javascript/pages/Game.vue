<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto flex flex-col gap-8">
        <div class="bg-card rounded-lg border shadow-sm p-8">
          <div class="flex items-center justify-between mb-1 gap-4">
            <h2 class="text-xl font-semibold">
              Around the World
            </h2>
            <div class="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                class="whitespace-nowrap touch-none select-none"
                style="touch-action: manipulation;"
                @click="copyLinkToClipboard"
              >
                <Copy class="w-4 h-4 mr-1" />
                <span class="hidden sm:block">Copy Link</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                class="whitespace-nowrap touch-none select-none"
                style="touch-action: manipulation;"
                @click="openSettings"
              >
                <Settings2 class="w-4 h-4 mr-1" />
                <span class="hidden sm:block">Settings</span>
              </Button>
            </div>
          </div>

          <p class="text-muted-foreground mb-4">
            Bookmark this page to return to your progress!
          </p>

          <div
            v-if="!gameFinished"
            class="mb-8"
          >
            <div class="flex justify-center mb-4">
              <div class="relative w-40 h-40 flex flex-col items-center justify-center">
                <div class="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                <div class="text-7xl font-bold text-primary">
                  {{ displayNumber }}
                </div>
                <div class="text-sm font-medium text-primary/80 mt-1 capitalize">
                  {{ requiredMultiplier }}
                </div>
              </div>
            </div>

            <div class="flex gap-2 mb-2">
              <div class="flex-1">
                <p class="text-sm text-muted-foreground mb-1">
                  Current Throws
                </p>
                <p class="text-xl font-bold">
                  {{ throwCount }}
                </p>
              </div>
              <div class="flex-1">
                <p class="text-sm text-muted-foreground mb-1">
                  Best Score
                </p>
                <p class="text-xl font-bold">
                  {{ bestScore > 0 ? bestScore : '-' }}
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-3 mt-8">
              <Button
                variant="default"
                size="lg"
                class="h-16 text-lg touch-none select-none"
                @click="handleHit"
              >
                <Target class="mr-2 h-5 w-5" />
                Hit the Number
              </Button>
              <Button
                variant="outline"
                size="lg"
                class="h-16 text-lg touch-none select-none"
                @click="handleMiss"
              >
                <X class="mr-2 h-5 w-5" />
                Missed
              </Button>
              <Button
                variant="destructive"
                size="lg"
                class="h-16 text-lg touch-none select-none"
                @click="resetGame"
              >
                <RefreshCw class="mr-2 h-5 w-5" />
                Reset Game
              </Button>
            </div>
          </div>

          <div
            v-else
            class="mb-6"
          >
            <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <CheckCircle class="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 class="text-xl font-semibold text-center mb-2">
                Game Completed!
              </h2>
              <p class="text-center text-muted-foreground mb-4">
                You completed the game in <span class="font-bold">{{ throwCount }} throws</span>.
              </p>
              <div class="flex justify-center">
                <Button
                  size="lg"
                  class="touch-none select-none"
                  style="touch-action: manipulation;"
                  @click="startNewGame"
                >
                  Start New Game
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-lg border shadow-sm p-8">
          <h2 class="text-xl font-semibold mb-1">
            Your Rounds
          </h2>
          <p class="text-muted-foreground mb-4">
            Showing rounds with {{ requiredMultiplier }} {{ includeBullsEye ? 'with' : 'without' }} bulls eye
          </p>
          <div
            v-if="filteredRounds.length === 0"
            class="text-center py-6 text-muted-foreground"
          >
            No rounds recorded with current settings. Complete a round with these settings to record your first score!
          </div>
          <div v-else>
            <div class="flex justify-between mb-2 px-4 py-2 text-sm text-muted-foreground">
              <span>Date</span>
              <span>Throws</span>
            </div>
            <div class="space-y-2">
              <div
                v-for="(round, index) in filteredRounds"
                :key="round.id"
                class="flex flex-col p-4 border rounded-md"
                :class="{'bg-primary/5 border-primary/20': index === 0}"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-muted-foreground">
                      {{ formatDate(new Date(round.createdAt)) }}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      {{ round.requiredMultiplier }}, {{ round.includeBullsEye ? 'with' : 'without' }} bulls eye
                    </p>
                  </div>
                  <div>
                    <p class="text-xl font-bold">
                      {{ round.totalThrows }}
                    </p>
                  </div>
                </div>

                <!-- Number attempts details (expandable) -->
                <div
                  v-if="round.numberAttempts && round.numberAttempts.length > 0"
                  class="mt-3 pt-3 border-t"
                >
                  <p class="text-xs text-muted-foreground font-medium mb-2">
                    Throws per number:
                  </p>
                  <div class="grid grid-cols-5 gap-2">
                    <div
                      v-for="attempt in round.numberAttempts"
                      :key="attempt.targetNumber"
                      class="text-center p-1 rounded-md bg-muted/60"
                    >
                      <div class="text-xs font-medium">
                        {{ displayTargetNumber(attempt.targetNumber) }}
                      </div>
                      <div class="text-sm font-bold">
                        {{ attempt.throwsNeeded }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Sheet -->
      <Sheet v-model:open="showSettings">
        <SheetContent class="sm:max-w-md">
          <SheetHeader>
            <SheetTitle class="text-left">
              Game Settings
            </SheetTitle>
            <SheetDescription class="text-left">
              Customize your Around the World game. Changes will apply when starting a new game.
            </SheetDescription>
          </SheetHeader>

          <div class="py-6 flex flex-col gap-6">
            <!-- Bulls Eye Option -->
            <div class="flex items-center justify-between gap-4">
              <div>
                <h3 class="font-medium">
                  Include Bull's Eye
                </h3>
                <p class="text-sm text-muted-foreground">
                  Add 25 and 50 (Bull's Eye) after number 20
                </p>
              </div>
              <Switch
                id="bulls-eye-switch"
                v-model="settingsForm.includeBullsEye"
              />
            </div>

            <!-- Required Multiplier Option -->
            <div class="space-y-2">
              <div>
                <h3 class="font-medium">
                  Required Hit Type
                </h3>
                <p class="text-sm text-muted-foreground">
                  Which part of the number must be hit
                </p>
              </div>

              <Select v-model="settingsForm.requiredMultiplier">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select hit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="option in multiplierOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter>
            <Button
              type="submit"
              class="touch-none select-none"
              style="touch-action: manipulation;"
              @click="applySettings"
            >
              Apply and Start New Game
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { router } from "@inertiajs/vue3";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast/use-toast.ts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../components/ui/sheet";
import {
  Target,
  X,
  RefreshCw,
  CheckCircle,
  Settings2,
  Copy,
} from "lucide-vue-next";
import Layout from "@/components/Layout.vue";

interface NumberAttempt {
  targetNumber: number;
  throwsNeeded: number;
}

interface Round {
  id: number;
  includeBullsEye: boolean;
  requiredMultiplier: string;
  totalThrows: number;
  createdAt: string;
  numberAttempts: NumberAttempt[];
}

interface BestScores {
  [key: string]: number;
}

const props = defineProps<{
  gameId: string;
  rounds?: Round[];
  bestScore?: BestScores;
}>();

const { toast } = useToast();

// Settings
const showSettings = ref(false);
const settingsForm = ref({
  includeBullsEye: false,
  requiredMultiplier: "singles", // singles, doubles, triples
});

// Multiplier options
const multiplierOptions = [
  { label: "Singles", value: "singles" },
  { label: "Doubles", value: "doubles" },
  { label: "Triples", value: "triples" },
];

// Game state
const currentNumber = ref(1);
const throwCount = ref(0);
const gameFinished = ref(false);
const includeBullsEye = ref(false);
const requiredMultiplier = ref("singles");

// Track attempts per number
const numberAttempts = ref<{ [key: number]: number; }>({});
// Computed to determine max number (20, 22, or 25 depending on settings)
const maxNumber = computed(() => {
  return includeBullsEye.value ? 22 : 20;
});

// Format display number (for bull's eye)
const displayNumber = computed(() => {
  if (currentNumber.value === 21) return "25";
  if (currentNumber.value === 22) return "50";
  return currentNumber.value.toString();
});

// Get the best score for the current settings
const bestScore = computed(() => {
  if (!props.bestScore) return 0;

  const settingsKey = `${includeBullsEye.value}-${requiredMultiplier.value}`;
  return props.bestScore[settingsKey] || 0;
});

// Filter rounds based on current settings
const filteredRounds = computed(() => {
  if (!props.rounds) return [];

  return props.rounds.filter((round) => round.includeBullsEye === includeBullsEye.value &&
    round.requiredMultiplier === requiredMultiplier.value);
});

// Initialize game
onMounted(() => {
  // Sync settings form with actual settings
  settingsForm.value.includeBullsEye = includeBullsEye.value;
  settingsForm.value.requiredMultiplier = requiredMultiplier.value;

  // Save this game to recent games list
  saveToRecentGames();
});

// Open settings sheet
const openSettings = () => {
  // Ensure settings form matches current settings
  settingsForm.value.includeBullsEye = includeBullsEye.value;
  settingsForm.value.requiredMultiplier = requiredMultiplier.value;
  showSettings.value = true;
};

// Apply settings and start new game
const applySettings = () => {
  includeBullsEye.value = settingsForm.value.includeBullsEye;
  requiredMultiplier.value = settingsForm.value.requiredMultiplier;
  showSettings.value = false;
  resetGame();
};

// Handle hit
const handleHit = () => {
  // Increment the throwCount
  throwCount.value++;

  // Track attempt for the current number
  if (!numberAttempts.value[currentNumber.value]) {
    numberAttempts.value[currentNumber.value] = 1;
  } else {
    numberAttempts.value[currentNumber.value]++;
  }

  // Move to the next number
  currentNumber.value++;

  // Check if game is finished based on settings
  if (currentNumber.value > maxNumber.value) {
    gameFinished.value = true;

    // Prepare data for the round
    const roundData = {
      includeBullsEye: includeBullsEye.value,
      requiredMultiplier: requiredMultiplier.value,
      totalThrows: throwCount.value,
      numberAttempts: Object.entries(numberAttempts.value).map(([targetNumber, throwsNeeded]) => ({
        targetNumber: parseInt(targetNumber),
        throwsNeeded,
      })),
    };

    // Send data to the backend
    router.post(`/games/${props.gameId}/rounds`, roundData, {
      onSuccess: () => {
        // Reload the page to refresh the rounds list
        router.reload();
      },
    });
  }
};

// Handle miss
const handleMiss = () => {
  // Increment the throwCount
  throwCount.value++;

  // Track attempt for the current number
  if (!numberAttempts.value[currentNumber.value]) {
    numberAttempts.value[currentNumber.value] = 1;
  } else {
    numberAttempts.value[currentNumber.value]++;
  }
};

// Reset the current game
const resetGame = () => {
  currentNumber.value = 1;
  throwCount.value = 0;
  gameFinished.value = false;

  // Initialize numberAttempts
  numberAttempts.value = {};
};

// Start a new game after completion
const startNewGame = () => {
  resetGame();
};

// Copy the current URL to clipboard
const copyLinkToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
  toast({
    title: "Link copied!",
    description: "The game link has been copied to your clipboard",
    variant: "default",
    class: "bg-green-50 border-green-200 text-green-800",
  });
};

// Format a date
const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper for displaying target numbers (especially for bulls eye)
const displayTargetNumber = (number: number) => {
  if (number === 21) return "25";
  if (number === 22) return "50";
  return number.toString();
};

// Save this game to the recent games list in localStorage
const saveToRecentGames = () => {
  const recentGames = JSON.parse(localStorage.getItem("atw_recent_games") || "[]");

  // Check if this game already exists in the recent games list
  const gameIndex = recentGames.findIndex((game: { id: string; }) => game.id === props.gameId);

  const gameData = {
    id: props.gameId,
    lastVisited: new Date().toISOString(),
    bestScore: bestScore.value || null,
  };

  if (gameIndex !== -1) {
    // Update existing game
    recentGames[gameIndex] = { ...recentGames[gameIndex], ...gameData };
  } else {
    // Add new game
    recentGames.unshift(gameData);
  }

  // Limit to 10 recent games
  const limitedGames = recentGames.slice(0, 10);

  localStorage.setItem("atw_recent_games", JSON.stringify(limitedGames));
};
</script>
