<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">
        Imprint
      </h1>

      <div class="bg-card rounded-lg border shadow-sm p-8">
        <p class="text-muted-foreground">
          Imprint content will be added here.
        </p>
      </div>

      <div class="mt-8 flex justify-start">
        <Button
          variant="outline"
          @click="router.push('/')"
        >
          Back to Home
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
