import { createStore } from 'vuex';
import EntryList from '../../../../../src/modules/daybook/components/EntryList';
import { shallowMount } from '@vue/test-utils';
import journalModule from '../../../../../src/modules/daybook/store/journal';
import { journalState } from '../../../mock/test-journal-state';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

describe('EntryList Component', () => {
  const store = createVuexStore(journalState);
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('debe llamar y mostrar las entradas', () => {
    const entries = wrapper.findAll('entry-stub');
    expect(entries.length).toBe(2);
  });
  test('debe llamar y filtrar las entradas', async () => {
    const input = wrapper.find('input');
    await input.setValue('Vue');

    const entries = wrapper.findAll('entry-stub');
    expect(entries.length).toBe(1);
  });
  test('el boton de nuevo debe redireccionar a /new', () => {
    const button = wrapper.find('button');
    button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: 'new' },
    });
  });
});
