<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IEntry } from '@/utils';
import { formatDate } from '@/utils';
import CopyIcon from '@/components/CopyIcon.vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

const props = defineProps<{
  entries: IEntry[];
}>();

const showCopyTooltip = ref<boolean>(false);

const subtotal = computed(() => {
  return props.entries.reduce((sum, entry) => sum + entry.gel, 0);
});

const formatDateForDisplay = (date: Date) => {
  const [year, month, day] = formatDate(date).split('-');
  return `${day}.${month}.${year}`;
};

const getMarkdownTable = () => {
  const header =
    '| Date       | USD  | Exchange | GEL  |\n| ---------- | ---- | -------- | ---- |';
  const rows = props.entries
    .map(
      (entry) =>
        `| ${formatDateForDisplay(entry.date)} | ${entry.usd} | ${
          entry.rate
        } | ${Math.round(entry.gel)} |`
    )
    .join('\n');
  const subtotalRow = `Subtotal: ${Math.round(subtotal.value)} GEL`;

  return `${header}\n${rows}\n${subtotalRow}`;
};

const copyToClipboard = async () => {
  const markdown = getMarkdownTable();
  await navigator.clipboard.writeText(markdown);

  showCopyTooltip.value = true;
  window.setTimeout(() => {
    showCopyTooltip.value = false;
  }, 1500);
};
</script>

<template>
  <div v-if="entries.length > 0" class="mt-8 w-full max-w-2xl">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b dark:border-gray-700">
            <th class="py-2 px-4">Date</th>
            <th class="py-2 px-4">USD</th>
            <th class="py-2 px-4">Exchange</th>
            <th class="py-2 px-4">GEL</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in entries"
            :key="formatDateForDisplay(entry.date)"
            class="border-b dark:border-gray-700"
          >
            <td class="py-2 px-4">{{ formatDateForDisplay(entry.date) }}</td>
            <td class="py-2 px-4">{{ entry.usd }}</td>
            <td class="py-2 px-4">{{ entry.rate }}</td>
            <td class="py-2 px-4">{{ Math.round(entry.gel) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 flex justify-between">
      <div class="relative w-fit mt-2">
        <button
          @click="copyToClipboard"
          class="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:opacity-80 flex items-center gap-2"
        >
          <CopyIcon :dark="!themeStore.isDark" />
          Copy as Markdown
        </button>
        <div
          v-if="showCopyTooltip"
          class="absolute md:left-full md:top-1/2 md:-translate-y-1/2 md:ml-4 left-1/2 -translate-x-1/2 top-full mt-2 md:mt-0 px-1 text-sm text-green-500 border border-black dark:border-white rounded animate-appear"
        >
          &#10003;
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row text-center md:text-right items-center pr-4"
      >
        <span class="md:mr-1">Subtotal:</span>
        <span>{{ Math.round(subtotal) }} GEL</span>
      </div>
    </div>
  </div>
</template>
