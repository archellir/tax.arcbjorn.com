import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false);

  isDark.value = document.documentElement.classList.contains('dark');

  watch(isDark, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = 'black';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = 'white';
    }
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
  });

  const toggleDark = () => {
    isDark.value = !isDark.value;
  };

  return { isDark, toggleDark };
});
