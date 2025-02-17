<script setup lang="ts">
import DarkModeToggle from '@/components/DarkModeToggle.vue';
</script>

<template>
  <div class="flex justify-between gap-4 flex-wrap p-12">
    <a
      href="/"
      class="cursor-pointer text-xl font-plex-mono font-semibold dark:text-white"
    >
      arcbjorn
    </a>
    <div class="flex items-center gap-4">
      <div class="text-lg font-plex-sans dark:text-white">tax calculator</div>
      <DarkModeToggle />
    </div>
  </div>
</template>
