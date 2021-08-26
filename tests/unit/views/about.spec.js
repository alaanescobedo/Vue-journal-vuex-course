import AboutView from '@/views/About';
import { shallowMount } from '@vue/test-utils';

describe('About View', () => {
  const wrapper = shallowMount(AboutView);
  test('Debe renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
