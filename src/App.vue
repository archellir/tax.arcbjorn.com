<script setup lang="ts">
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="bg-sky-500 min-h-fit">
    <Header />
  </div>
  <div class="bg-yellow-900 grow">
    <Main />
  </div>
  <div class="bg-emerald-500 min-h-fit">
    <Footer />
  </div>
</template>

<style scoped></style>
