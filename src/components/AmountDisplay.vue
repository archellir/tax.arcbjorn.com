<script setup lang="ts">
import CopyIcon from '@/components/CopyIcon.vue';
import { computed, ref } from 'vue';

export interface IAmountDisplayProps {
  amount: number;
}

const props = defineProps<IAmountDisplayProps>();
const showCopyTooltip = ref<boolean>(false);

const showCopyButton = computed((): boolean => !!props.amount);

const copyToClipboard = async () => {
  showCopyTooltip.value = true;
  await navigator.clipboard.writeText(props.amount.toString());

  setTimeout(function () {
    showCopyTooltip.value = false;
  }, 1500);
};
</script>

<template>
  <div
    class="border border-black rounded outline-none p-2 flex justify-center items-center w-60 relative"
  >
    {{ amount }} ლ

    <button
      v-if="showCopyButton"
      type="button"
      class="absolute right-4 rounded active:opacity-50"
      @click="copyToClipboard"
    >
      <CopyIcon />
    </button>

    <div
      v-if="showCopyTooltip"
      class="absolute z-100 -right-8 px-1 text-sm text-green-500 border border-black rounded animate-appear"
    >
      &#10003;
    </div>
  </div>
</template>
