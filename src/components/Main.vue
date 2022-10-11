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

import AmountInput from '@/components/AmountInput.vue';
import Loader from '@/components/Loader.vue';
import AmountDisplay from '@/components/AmountDisplay.vue';

const defaultDate = getDefaultDate();

const savedAmount = Number.parseInt(
  window.localStorage.getItem('amountInUSD') || '0'
);

const state = reactive<IMainState>({
  date: defaultDate,
  rate: '',
  amountInUSD: savedAmount || null,
  rateLoading: true,
});

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
  if (date.getDate() === state.date.getDate()) {
    return 'bg-black';
  }
  return '';
};
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full font-plex-sans">
    <div class="flex flex-col gap-4 px-4">
      <div class="flex items-center justify-around gap-4 flex-wrap">
        <div class="w-fit">
          <Datepicker
            autoApply
            hideOffsetDates
            arrowNavigation
            monthNameFormat="long"
            :enableTimePicker="false"
            :day-class="getDayClass"
            format="dd MMMM, yyyy"
            v-model="state.date"
            @update:modelValue="handleDateChange"
          />
        </div>
        <div
          class="border border-black rounded outline-none p-2 flex justify-center items-center w-60 h-9"
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
          class="border border-black rounded outline-none p-2 flex justify-center w-20"
        >
          {{ totalTax }} ლ
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
