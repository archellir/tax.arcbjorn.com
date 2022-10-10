<script setup lang="ts">
import type { IMainState } from '@/utils';

export interface IAmountInputProps {
  amount: IMainState['amountInUSD'];
}

defineProps<IAmountInputProps>();

const emit = defineEmits(['update:amount']);

let debounceTimer: number;
const debounce = (callback: () => void, time: number = 300) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

const onInput = (event: Event) => {
  event.preventDefault();
  const amount = (event.target as HTMLInputElement).value;
  if (+amount > 99999 || +amount < 0) {
    return;
  }
  emit('update:amount', amount);

  debounce(() => window.localStorage.setItem('amountInUSD', amount));
};
</script>

<template>
  <div class="flex relative w-min group justify-center items-center z-1001">
    <input
      type="number"
      min="0"
      step="1"
      placeholder="amount in USD"
      class="flex p-2 pr-8 text-black border border-gray-300 hover:border-gray-400 focus:border-gray-400 rounded outline-none"
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
