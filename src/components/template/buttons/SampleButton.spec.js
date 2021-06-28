import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';

import SampleButton from '@/components/template/buttons/SampleButton.vue';

describe('SampleButton.vue', () => {
  let localVue, vuetify;
  const buttonId = '[data-testid="sample-button"]';

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
  });

  const mountFunction = (component, options) => {
    return mount(component, {
      localVue,
      vuetify,
      ...options,
    });
  };

  describe('Verify initial state of button', () => {
    it('onClick callback is required', async () => {
      const wrapper = mountFunction(SampleButton);
      const onClickRequired = wrapper.vm.$options.props.onClick.required;

      expect(onClickRequired).toBe(true);
    });

    it('onClick callback prop should be a function', async () => {
      const wrapper = mountFunction(SampleButton, {
        propsData: {
          onClick: () => {},
        },
      });

      expect(typeof wrapper.vm.onClick).toBe('function');
    });
  });

  describe('Verify button functionality', () => {
    it('When button is clicked, onCLick callback should be called', async () => {
      const onClick = jest.fn();

      const wrapper = mountFunction(SampleButton, {
        propsData: {
          onClick,
        },
      });

      wrapper.find(buttonId).trigger('click');
      await wrapper.vm.$nextTick();

      expect(onClick).toHaveBeenCalled();
    });
  });
});
