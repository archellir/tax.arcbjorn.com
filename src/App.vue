<script setup lang="ts">
import Header from '@/components/HeaderView.vue';
import Main from '@/components/MainView.vue';
import Footer from '@/components/FooterView.vue';
</script>

<template>
  <div class="min-h-fit dark:bg-black">
    <Header />
  </div>
  <div class="grow border-t border-dashed border-gray-400 dark:bg-black">
    <Main />
  </div>
  <div class="min-h-fit border-t border-dashed border-gray-400 dark:bg-black">
    <Footer />
  </div>
</template>

<style scoped></style>
