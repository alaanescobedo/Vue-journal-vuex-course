import EntryView from '@/modules/daybook/views/EntryView';
import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import journalModule from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock/test-journal-state';
import Swal from 'sweetalert2';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: { ...initialState },
      },
    },
  });

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Entry View', () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: '-Mi023nECy35q-nhyISU',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('debe redireccionar al usuario si el Id no existe', () => {
    shallowMount(EntryView, {
      props: {
        id: 'Este id no existe',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });

  test('debe mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test('debe de borrar la entrada y salir', async () => {
    Swal.fire.mockReturnValue(Promise.resolve({ isConfirmed: true }));

    const buttonDelete = wrapper.find('[data-testId="btn-delete"]');
    await buttonDelete.trigger('click');

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Estas seguro?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
    });

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-Mi023nECy35q-nhyISU');
  });
});
