<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b bg-background">
      <div class="container mx-auto px-4 h-16 flex justify-start items-center">
        <Link
          href="/"
          class="flex items-center gap-3"
        >
          <Globe class="h-6 w-6 text-primary" />
          <span class="text-xl font-semibold">Around the World</span>
        </Link>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="border-t py-6 md:py-0">
      <div class="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p class="text-center text-sm text-muted-foreground">
          Made by <a
            href="https://railsmatic.com"
            class="underline underline-offset-4"
          >bakku</a> and Claude in Upper Palatine.
        </p>
        <div class="flex gap-4">
          <Link
            href="/imprint"
            class="text-sm text-muted-foreground hover:text-foreground"
          >
            Imprint
          </Link>
          <Link
            href="/privacy"
            class="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>

    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { Globe } from "lucide-vue-next";
import { Link } from "@inertiajs/vue3";
import { Toaster } from "@/components/ui/toast";
</script>
