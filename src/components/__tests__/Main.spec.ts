import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import MainView from '@/components/MainView.vue';

describe('Main', () => {
  it('renders properly', () => {
    const wrapper = mount(MainView);
    expect(wrapper.text()).toContain('Tax');
  });
});
