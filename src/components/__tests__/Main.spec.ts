import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import Main from '@/components/Main.vue';

describe('Main', () => {
  it('renders properly', () => {
    const wrapper = mount(Main);
    expect(wrapper.text()).toContain('Tax');
  });
});
