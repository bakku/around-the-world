<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto flex flex-col gap-8">
      <div class="bg-card rounded-lg border shadow-sm p-8">
        <div class="flex items-center justify-between mb-1 gap-4">
          <h2 class="text-xl font-semibold">Around the World</h2>
          <div class="flex gap-2">
            <Button variant="outline" size="sm" @click="copyLinkToClipboard" class="whitespace-nowrap touch-none select-none" style="touch-action: manipulation;">
              <Copy class="w-4 h-4 mr-1" />
              <span class="hidden sm:block">Copy Link</span>
            </Button>
            <Button variant="outline" size="sm" @click="openSettings" class="whitespace-nowrap touch-none select-none" style="touch-action: manipulation;">
              <Settings2 class="w-4 h-4 mr-1" />
              <span class="hidden sm:block">Settings</span>
            </Button>
          </div>
        </div>

        <p class="text-muted-foreground mb-4">Bookmark this page to return to your progress!</p>

        <div v-if="!gameFinished" class="mb-8">
          <div class="flex justify-center mb-4">
            <div class="relative w-40 h-40 flex flex-col items-center justify-center">
              <div class="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
              <div class="text-7xl font-bold text-primary">{{ displayNumber }}</div>
              <div class="text-sm font-medium text-primary/80 mt-1 capitalize">{{ requiredMultiplier }}</div>
            </div>
          </div>

          <div class="flex gap-2 mb-2">
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-1">Current Throws</p>
              <p class="text-xl font-bold">{{ throwCount }}</p>
            </div>
            <div class="flex-1">
              <p class="text-sm text-muted-foreground mb-1">Best Score</p>
              <p class="text-xl font-bold">{{ bestScore > 0 ? bestScore : '-' }}</p>
            </div>
          </div>

          <div class="flex flex-col gap-3 mt-8">
            <Button
              variant="default"
              size="lg"
              @click="handleHit"
              class="h-16 text-lg touch-none select-none"
            >
              <Target class="mr-2 h-5 w-5" />
              Hit the Number
            </Button>
            <Button
              variant="outline"
              size="lg"
              @click="handleMiss"
              class="h-16 text-lg touch-none select-none"
            >
              <X class="mr-2 h-5 w-5" />
              Missed
            </Button>
            <Button
              variant="destructive"
              size="lg"
              @click="resetGame"
              class="h-16 text-lg touch-none select-none"
            >
              <RefreshCw class="mr-2 h-5 w-5" />
              Reset Game
            </Button>
          </div>
        </div>

        <div v-else class="mb-6">
          <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <CheckCircle class="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 class="text-xl font-semibold text-center mb-2">Game Completed!</h2>
            <p class="text-center text-muted-foreground mb-4">
              You completed the game in <span class="font-bold">{{ throwCount }} throws</span>.
            </p>
            <div class="flex justify-center">
              <Button
                @click="startNewGame"
                size="lg"
                class="touch-none select-none"
                style="touch-action: manipulation;"
              >
                Start New Game
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-card rounded-lg border shadow-sm p-8">
        <h2 class="text-xl font-semibold mb-1">Your High Scores</h2>
        <p class="text-muted-foreground mb-4">
          Showing scores matching your current game settings
        </p>
        <div v-if="filteredScores.length === 0" class="text-center py-6 text-muted-foreground">
          No scores recorded yet for current settings. Complete a game to record your first score!
        </div>
        <div v-else>
          <div class="flex justify-between mb-2 px-4 py-2 text-sm text-muted-foreground">
            <span>Date</span>
            <span>Throws</span>
          </div>
          <div class="space-y-2">
            <div v-for="(score, index) in filteredScores" :key="index" 
              class="flex items-center justify-between p-4 border rounded-md"
              :class="{'bg-primary/5 border-primary/20': index === 0}">
              <div>
                <p class="text-sm text-muted-foreground">{{ formatDate(score.date) }}</p>
              </div>
              <div>
                <p class="text-xl font-bold">{{ score.throws }}</p>
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
          <SheetTitle class="text-left">Game Settings</SheetTitle>
          <SheetDescription class="text-left">
            Customize your Around the World game. Changes will apply when starting a new game.
          </SheetDescription>
        </SheetHeader>
        
        <div class="py-6 flex flex-col gap-6">
          <!-- Bulls Eye Option -->
          <div class="flex items-center justify-between gap-4">
            <div>
              <h3 class="font-medium">Include Bull's Eye</h3>
              <p class="text-sm text-muted-foreground">Add 25 and 50 (Bull's Eye) after number 20</p>
            </div>
            <Switch 
              v-model:checked="settingsForm.includeBullsEye"
              id="bulls-eye-switch"
            />
          </div>
          
          <!-- Required Multiplier Option -->
          <div class="space-y-2">
            <div>
              <h3 class="font-medium">Required Hit Type</h3>
              <p class="text-sm text-muted-foreground">Which part of the number must be hit</p>
            </div>

            <Select v-model="settingsForm.requiredMultiplier">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select hit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="option in multiplierOptions" :key="option.value" :value="option.value">
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/toast/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { 
  Target, 
  X, 
  RefreshCw, 
  CheckCircle, 
  Settings2, 
  Copy
} from 'lucide-vue-next';

const route = useRoute();
const { toast } = useToast();
const trackingId = computed(() => route.params.trackingId as string);

// Settings
const showSettings = ref(false);
const settingsForm = ref({
  includeBullsEye: false,
  requiredMultiplier: 'singles' // singles, doubles, triples
});

// Multiplier options
const multiplierOptions = [
  { label: 'Singles', value: 'singles' },
  { label: 'Doubles', value: 'doubles' },
  { label: 'Triples', value: 'triples' }
];

// Game state
const currentNumber = ref(1);
const throwCount = ref(0);
const gameFinished = ref(false);
const includeBullsEye = ref(false);
const requiredMultiplier = ref('singles');
const scores = ref<{ 
  date: Date; 
  throws: number; 
  includedBullsEye?: boolean;
  requiredMultiplier?: string;
}[]>([]);
// Computed to determine max number (20, 22, or 25 depending on settings)
const maxNumber = computed(() => {
  return includeBullsEye.value ? 22 : 20;
});

// Format display number (for bull's eye)
const displayNumber = computed(() => {
  if (currentNumber.value === 21) return '25';
  if (currentNumber.value === 22) return '50';
  return currentNumber.value.toString();
});

// Filter scores based on current settings
const filteredScores = computed(() => {
  return scores.value
    .filter(score => 
      (score.includedBullsEye || false) === includeBullsEye.value && 
      (score.requiredMultiplier || 'singles') === requiredMultiplier.value
    )
    .sort((a, b) => a.throws - b.throws);
});

// Get the best score based on filtered scores
const bestScore = computed(() => {
  if (filteredScores.value.length === 0) return 0;
  return filteredScores.value[0].throws;
});

// Load data from localStorage
onMounted(() => {
  const savedState = localStorage.getItem(`atw_game_${trackingId.value}`);
  if (savedState) {
    const state = JSON.parse(savedState);
    currentNumber.value = state.currentNumber || 1;
    throwCount.value = state.throwCount || 0;
    gameFinished.value = state.gameFinished || false;
    includeBullsEye.value = state.includeBullsEye || false;
    requiredMultiplier.value = state.requiredMultiplier || 'singles';
    
    // Sync settings form with actual settings
    settingsForm.value.includeBullsEye = includeBullsEye.value;
    settingsForm.value.requiredMultiplier = requiredMultiplier.value;
  }
  
  const savedScores = localStorage.getItem(`atw_scores_${trackingId.value}`);
  if (savedScores) {
    scores.value = JSON.parse(savedScores).map((score: any) => ({
      ...score,
      date: new Date(score.date)
    }));
    // Sort scores by throws (lowest first)
    scores.value.sort((a, b) => a.throws - b.throws);
  }
});

// Save state to localStorage
const saveState = () => {
  localStorage.setItem(`atw_game_${trackingId.value}`, JSON.stringify({
    currentNumber: currentNumber.value,
    throwCount: throwCount.value,
    gameFinished: gameFinished.value,
    includeBullsEye: includeBullsEye.value,
    requiredMultiplier: requiredMultiplier.value
  }));
};

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

// Save scores to localStorage
const saveScores = () => {
  localStorage.setItem(`atw_scores_${trackingId.value}`, JSON.stringify(scores.value));
};

// Handle hit
const handleHit = () => {
  throwCount.value++;
  currentNumber.value++;
  
  // Check if game is finished based on settings
  if (currentNumber.value > maxNumber.value) {
    gameFinished.value = true;
    
    // Record score
    scores.value.push({
      date: new Date(),
      throws: throwCount.value,
      includedBullsEye: includeBullsEye.value,
      requiredMultiplier: requiredMultiplier.value
    });
    
    // Sort scores by throws (lowest first)
    scores.value.sort((a, b) => a.throws - b.throws);
    saveScores();
  }
  
  saveState();
};

// Handle miss
const handleMiss = () => {
  throwCount.value++;
  saveState();
};

// Reset the current game
const resetGame = () => {
  currentNumber.value = 1;
  throwCount.value = 0;
  gameFinished.value = false;
  saveState();
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
    description: "The tracking link has been copied to your clipboard",
    variant: "default",
    class: "bg-green-50 border-green-200 text-green-800",
  });
};

// Format a date
const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
};
</script>