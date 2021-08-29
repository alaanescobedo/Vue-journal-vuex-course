import useAuth from '@/modules/auth/composables/useAuth';
import { testCreateUser, testUser } from '../../../mock/test-auth-state';

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    'auth/currentAuthStatus': 'authenticated',
    'auth/username': 'Test User',
  },
};

jest.mock('vuex', () => ({
  useStore: () => mockStore,
}));

describe('useAuth Composable', () => {
  beforeEach(() => jest.clearAllMocks());
  test('createUser - debe llamar al dispatch("auth/createUser")', async () => {
    const { createUser } = useAuth();

    mockStore.dispatch.mockReturnValue({ ok: true });

    const res = await createUser(testCreateUser);
    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', testCreateUser);
    expect(res).toEqual({ ok: true });
  });
  test('createUser - Error si el email ya existe', async () => {
    const { createUser } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' });
    const res = await createUser(testUser());

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', testUser());
    expect(res).toEqual({ ok: false, message: 'EMAIL_EXISTS' });
  });
  test('loginUser - debe llamar al dispatch("auth/signInUser")', async () => {
    const { loginUser } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: true });
    const res = await loginUser(testUser());

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', testUser());
    expect(res).toEqual({ ok: true });
  });
  test('loginUser - Error si el email/password no son validos', async () => {
    const { loginUser } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL/PASSWORD DO NOT EXIST' });
    const res = await loginUser(testUser());

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', testUser());
    expect(res).toEqual({ ok: false, message: 'EMAIL/PASSWORD DO NOT EXIST' });
  });
  test('checkAuthStatus - llamar dispatch("auth/checkAuthentication")', async () => {
    const { checkAuthStatus } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: true });
    const res = await checkAuthStatus(testUser());

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication');
    expect(res).toEqual({ ok: true });
  });
  test('checkAuthStatus - Error no se logro verificar', async () => {
    const { checkAuthStatus } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: false, message: 'No token' });
    const res = await checkAuthStatus(testUser());

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication');
    expect(res).toEqual({ ok: false, message: 'No token' });
  });
  test('logout - llamar al commit("auth/logout")', () => {
    const { logout } = useAuth();
    logout();

    expect(mockStore.commit).toHaveBeenCalledWith('auth/logout');
  });
  test('Computed - authStatus, username', () => {
    const { authStatus, username } = useAuth();

    expect(authStatus.value).toBe('authenticated');
    expect(username.value).toBe('Test User');
  });
});
