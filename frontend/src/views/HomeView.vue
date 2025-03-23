<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-2">
      Around the World
    </h1>
    <p class="text-muted-foreground text-center mb-8">
      Track your progress in the dart game "Around the World"
    </p>

    <div class="bg-card rounded-lg border shadow-sm p-8 max-w-3xl mx-auto">
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
          Start Tracking
        </h2>
        <p class="text-muted-foreground mb-4">
          No account needed! Just click below to start tracking your game. You'll get a unique link to bookmark so you can return to view and update your scores anytime.
        </p>
        <Button
          class="w-full"
          @click="startTracking"
        >
          Start Tracking Now
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";

const router = useRouter();

const startTracking = () => {
  // Generate a random tracking ID
  const trackingId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  router.push(`/${trackingId}`);
};
</script>
