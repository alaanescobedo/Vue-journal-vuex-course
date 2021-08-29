import { shallowMount } from '@vue/test-utils';
import Navbar from '@/modules/daybook/components/Navbar';

import createVuexStore from '../../../mock/mock-store';
import { testUser } from '../../../mock/test-auth-state';

const mockRouter = {
  push: jest.fn(),
};

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

describe('Navbar Component', () => {
  const store = createVuexStore(testUser('authenticated'));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe mostrar el componente correctamente', () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
  test('click en el logout, debe cerrar sesion y redireccionar', async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'login' });
    expect(store.state.auth).toEqual({
      user: null,
      status: 'not-authenticated',
      idToken: null,
      refreshToken: null,
    });
  });
});
