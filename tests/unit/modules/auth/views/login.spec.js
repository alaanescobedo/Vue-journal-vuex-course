import { shallowMount } from '@vue/test-utils';
import Login from '@/modules/auth/views/Login';
import createVuexStore from '../../../mock/mock-store';
import { testUser } from '../../../mock/test-auth-state';

import Swal from 'sweetalert2';

const mockRouter = {
  push: jest.fn(),
};

jest.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Login Component', () => {
  const store = createVuexStore(testUser('not-authenticated'));

  store.dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe hacer match con el snapshot', () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('credenciales incorrectas disparan el swiftaler', async () => {
    store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en las credenciales' });
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
      },
    });

    await wrapper.find('form').trigger('submit');
    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', { email: '', password: '' });
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error en las credenciales', 'error');
  });
  test('credenciales correctas - router.push debe ser llamado con no-entry', async () => {
    store.dispatch.mockReturnValueOnce({ ok: true });
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store],
        stubs: ['router-link'],
      },
    });
    const [txtEmail, txtPassword] = wrapper.findAll('input');

    await txtEmail.setValue('alan@test.com');
    await txtPassword.setValue('test123');

    await wrapper.find('form').trigger('submit');

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: 'alan@test.com',
      password: 'test123',
    });
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });
});
