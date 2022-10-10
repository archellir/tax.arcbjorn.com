<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import Datepicker from '@vuepic/vue-datepicker';
import {
  getAmountInLari,
  getCurrencyRate,
  getDefaultDate,
  beutify,
  type IMainState,
} from '@/utils';
import { computed, onMounted, reactive } from 'vue';
import AmountInput from '@/components/AmountInput.vue';

const defaultDate = getDefaultDate();

const state = reactive<IMainState>({
  date: defaultDate,
  rate: '',
  amountInUSD: null,
});

onMounted(async () => {
  state.rate = await getCurrencyRate(defaultDate);
});

const amountInLari = computed((): number => getAmountInLari(state));

const totalTax = computed((): number => {
  return amountInLari.value ? Math.round(amountInLari.value / 100) : 0;
});

const handleDateChange = async (newDate: Date) => {
  state.rate = await getCurrencyRate(newDate);
};
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <div class="flex flex-col gap-4 px-4">
      <div class="flex items-center justify-around gap-4 flex-wrap">
        <div class="w-fit">
          <Datepicker
            autoApply
            hideOffsetDates
            arrowNavigation
            monthNameFormat="long"
            :enableTimePicker="false"
            format="dd MMMM, yyyy"
            v-model="state.date"
            @update:modelValue="handleDateChange"
          />
        </div>
        <div
          class="border border-black rounded outline-none p-2 flex justify-center items-center w-60"
        >
          {{ state.rate }} GEL/USD
        </div>
      </div>

      <div class="flex items-center justify-around gap-4 flex-wrap">
        <AmountInput v-model:amount="state.amountInUSD" />

        <div
          class="border border-black rounded outline-none p-2 flex justify-center items-center w-60"
        >
          {{ beutify(amountInLari) }} ლ
        </div>
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
