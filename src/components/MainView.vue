<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import Datepicker from '@vuepic/vue-datepicker';
import {
  getAmountInLari,
  getCurrencyRate,
  getDefaultDate,
  beutify,
  type IMainState,
  getTotalTax,
} from '@/utils';
import { computed, onMounted, reactive } from 'vue';
import { useThemeStore } from '@/stores/theme';

import AmountInput from '@/components/AmountInput.vue';
import Loader from '@/components/LoaderView.vue';
import AmountDisplay from '@/components/AmountDisplay.vue';
import EntriesTable from '@/components/EntriesTable.vue';
import type { IEntry } from '@/utils';

const defaultDate = getDefaultDate();

const savedAmount = Number.parseInt(
  window.localStorage.getItem('amountInUSD') || '0'
);

const state = reactive<IMainState>({
  date: defaultDate,
  rate: '',
  amountInUSD: savedAmount || null,
  rateLoading: true,
  entries: [],
});

const themeStore = useThemeStore();

onMounted(async () => {
  state.rate = await getCurrencyRate(defaultDate);
  state.rateLoading = false;
});

const amountInLari = computed((): number => getAmountInLari(state));

const totalTax = computed((): number => getTotalTax(amountInLari.value));

const handleDateChange = async (newDate: Date) => {
  state.rateLoading = true;
  const newRate = await getCurrencyRate(newDate);

  window.setTimeout(function () {
    state.rate = newRate;
    state.rateLoading = false;
  }, 500);
};

const getDayClass = (date: Date) => {
  if (
    date.getDate() === state.date.getDate() &&
    date.getMonth() === state.date.getMonth() &&
    date.getFullYear() === state.date.getFullYear()
  ) {
    return 'bg-black text-white dark:bg-white dark:text-black';
  }
  return '';
};

const datePickerConfig = computed(() => ({
  autoApply: true,
  hideOffsetDates: true,
  arrowNavigation: true,
  monthNameFormat: 'long' as const,
  enableTimePicker: false,
  format: 'dd MMMM, yyyy',
  clearable: false,
  dark: themeStore.isDark,
  textColor: themeStore.isDark ? 'white' : 'black',
  maxDate: new Date(),
}));

const saveEntry = () => {
  if (!state.amountInUSD || !state.rate) return;

  const entry: IEntry = {
    date: new Date(state.date),
    usd: state.amountInUSD,
    rate: state.rate,
    gel: amountInLari.value,
  };

  state.entries.push(entry);
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-full font-plex-sans dark:bg-black dark:text-white"
  >
    <div class="flex flex-col gap-4 px-4">
      <div class="flex items-center justify-around gap-4 flex-wrap">
        <div class="w-fit">
          <Datepicker
            v-bind="datePickerConfig"
            :day-class="getDayClass"
            v-model="state.date"
            @update:modelValue="handleDateChange"
          />
        </div>
        <div
          class="border border-black dark:border-white rounded outline-none p-2 flex justify-center items-center w-60 h-9"
        >
          <Loader v-if="state.rateLoading" />
          <div v-else>{{ state.rate }} GEL/USD</div>
        </div>
      </div>

      <div class="flex items-center justify-around gap-4 flex-wrap">
        <AmountInput v-model:amount="state.amountInUSD" />
        <AmountDisplay :amount="beutify(amountInLari)" />
      </div>

      <div class="w-60 flex gap-4 self-center items-center">
        Total tax:
        <div
          class="border border-black dark:border-white rounded outline-none p-2 flex justify-center w-20"
        >
          {{ totalTax }} ლ
        </div>
      </div>

      <div class="mt-4 self-center">
        <button
          @click="saveEntry"
          class="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 disabled:opacity-50"
          :disabled="!state.amountInUSD || !state.rate"
        >
          Save Entry
        </button>
      </div>

      <EntriesTable :entries="state.entries" />
    </div>
  </div>
</template>

<style scoped>
:deep(.dp__today) {
  border-color: black !important;
}
</style>

<style>
.dark .dp__today {
  border-color: white !important;
}
</style>
