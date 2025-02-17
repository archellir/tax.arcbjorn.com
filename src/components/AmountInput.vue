<script setup lang="ts">
import { restrictToIntegers } from '@/helpers';
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
  const amountString = (event.target as HTMLInputElement).value;
  const amountNumber = Number.parseInt(amountString);

  if (amountNumber > 99999 || amountNumber < 0) {
    return;
  }

  emit('update:amount', amountNumber);

  debounce(() => window.localStorage.setItem('amountInUSD', amountString));
};
</script>

<template>
  <div class="flex relative w-min group justify-center items-center z-1001">
    <input
      type="number"
      min="0"
      step="1"
      placeholder="amount in USD"
      class="flex p-2 pr-8 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:border-gray-400 dark:focus:border-gray-500 rounded outline-none dark:bg-black hide-number-spinners"
      :value="amount"
      @input="onInput"
      @keydown="restrictToIntegers"
    />
    <span
      class="flex absolute right-2 bg-transparent rounded text-base text-gray-600 dark:text-gray-400 p-2"
    >
      $
    </span>
  </div>
</template>

<style>
/* Chrome, Safari, Edge, Opera */
.hide-number-spinners::-webkit-outer-spin-button,
.hide-number-spinners::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.hide-number-spinners {
  -moz-appearance: textfield;
}
</style>
