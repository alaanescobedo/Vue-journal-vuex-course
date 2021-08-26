import EntryComponent from '@/modules/daybook/components/Entry';
import { shallowMount } from '@vue/test-utils';
import { journalState } from '../../../mock/test-journal-state';
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear';

describe('Entry Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockEntry = journalState.entries[0];

  const wrapper = shallowMount(EntryComponent, {
    props: {
      entry: mockEntry,
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  test('debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test('debe de redireccionar al hacer click en el container', () => {
    const entryContainer = wrapper.find('.entry-container');
    entryContainer.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: mockEntry.id } });
  });
  test('pruebas en las propiedades computadas', () => {
    const { day, month, year } = getDayMonthYear(mockEntry.date);

    expect(wrapper.vm.day).toBe(day);
    expect(wrapper.vm.month).toBe(month);
    expect(wrapper.vm.year).toBe(year);
  });
});
