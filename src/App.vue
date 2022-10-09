<script setup lang="ts">
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="min-h-fit">
    <Header />
  </div>
  <div class="grow border-t border-dashed border-gray-400">
    <Main />
  </div>
  <div class="min-h-fit border-t border-dashed border-gray-400">
    <Footer />
  </div>
</template>

<style scoped></style>
