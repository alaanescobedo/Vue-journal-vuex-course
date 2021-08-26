import FabComponent from '../../../../../src/modules/daybook/components/Fab';
import { shallowMount } from '@vue/test-utils';

describe('Fab Daybook-Component', () => {
  test('debe mostrar el icono por defecto - fa-plus', () => {
    const wrapper = shallowMount(FabComponent);
    const icon = wrapper.find('i');

    expect(icon.classes('fa-plus')).toBe(true);
  });
  test('debe mostrar el icono por argumento - fa-circle', () => {
    const props = {
      icon: 'fa-circle',
    };

    const wrapper = shallowMount(FabComponent, { props });
    const icon = wrapper.find('i');

    expect(icon.classes('fa-circle')).toBe(true);
  });
  test('debe emitir el evento on:click cuando se hace click', () => {
    const wrapper = shallowMount(FabComponent);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('on:click')).toHaveLength(1);
  });
});
