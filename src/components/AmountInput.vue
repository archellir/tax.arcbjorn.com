<script setup lang="ts">
defineProps(['amount']);
const emit = defineEmits(['update:amount']);

const onInput = (event: Event) => {
  event.preventDefault();
  const amount = (event.target as HTMLInputElement).value;
  if (+amount > 99999) {
    return;
  }
  emit('update:amount', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="flex relative w-min group justify-center items-center z-1001">
    <input
      type="number"
      min="0"
      step="1"
      placeholder="amount in USD"
      class="flex p-2 pr-8 text-black border border-gray-300 rounded outline-none"
      :value="amount"
      @input="onInput"
    />
    <span
      class="flex absolute right-2 bg-transparent rounded text-base text-gray-600 p-2"
    >
      $
    </span>
  </div>
</template>
