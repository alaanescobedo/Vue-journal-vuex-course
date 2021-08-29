import createVuexStore from '../../../mock/mock-store';
import authState from '@/modules/auth/store/state';
import { testUser } from '../../../mock/test-auth-state';
import axios from 'axios';

describe('Vuex - auth module', () => {
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = createVuexStore(authState());
  });
  test('estado inicial', () => {
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('authenticating');
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });
  test('mutation: loginUser', () => {
    store.commit('auth/loginUser', testUser('authenticating'));

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('authenticated');
    expect(user).toEqual(testUser().user);
    expect(idToken).toBe(testUser().idToken);
    expect(refreshToken).toBe(testUser().refreshToken);
    expect(localStorage.getItem('idToken')).toBe('ABC-123');
    expect(localStorage.getItem('refreshToken')).toBe('XYZ-789');
  });
  test('mutation: logout', () => {
    store.commit('auth/loginUser', testUser('authenticating'));
    store.commit('auth/logout');

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('not-authenticated');
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
    expect(localStorage.getItem('idToken')).toBe(null);
    expect(localStorage.getItem('refreshToken')).toBe(null);
  });
  test('getters: currentAuthStatus', () => {
    const status = store.getters['auth/currentAuthStatus'];
    expect(status).toBe('authenticating');
  });
  test('getters: username', () => {
    const name = store.getters['auth/username'];
    expect(name).toBe('');
  });
  test('actions: createUser - Error, usuario ya existe', async () => {
    const existingUser = {
      name: 'Test Existing User',
      email: 'test@existingUser.com',
      password: 'test123',
    };

    const { ok, message } = await store.dispatch('auth/createUser', existingUser);
    expect(ok).toBe(false);
    expect(message).toBe('EMAIL_EXISTS');

    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe('authenticating');
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });
  test('actions: createUser ', async () => {
    const newUser = {
      name: 'Test New User',
      email: 'test@newUser.com',
      password: 'test123',
    };

    const { ok } = await store.dispatch('auth/createUser', newUser);
    const { user, idToken, refreshToken } = store.state.auth;

    expect(ok).toBe(true);
    expect(user).toMatchObject({ name: 'Test New User', email: 'test@newUser.com' });
    expect(typeof idToken).toBe('string');
    expect(typeof refreshToken).toBe('string');

    //Delete User //Clear DB
    const api_key = 'AIzaSyC1e3mFHsQcRkfmALdU1_cCLpyzf7k0QQ4';

    await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${api_key}`, {
      idToken,
    });
  });
  test('actions: signInUser', async () => {
    const { ok } = await store.dispatch('auth/signInUser', testUser('authenticating').user);
    const { user } = store.state.auth;

    const testUserWithoutPassword = testUser().user;
    delete testUserWithoutPassword.password;

    expect(ok);
    expect(user).toEqual(testUserWithoutPassword);
  });
  test('actions: checkAuthentication', async () => {
    await store.dispatch('auth/signInUser', testUser('authenticating').user);
    const { idToken } = store.state.auth;

    store.commit('auth/logout', testUser('authenticated'));

    localStorage.setItem('idToken', idToken);

    const { ok } = await store.dispatch('auth/checkAuthentication');

    const testUserWithoutPassword = testUser().user;
    delete testUserWithoutPassword.password;
    const { user, idToken: token } = store.state.auth;

    expect(ok).toBe(true);
    expect(user).toMatchObject(testUserWithoutPassword);
    expect(typeof token).toBe('string');
  });
  test('actions: checkAutentication - Error', async () => {
    localStorage.removeItem('idToken');
    const checkResp1 = await store.dispatch('auth/checkAuthentication');

    expect(checkResp1.ok).toBe(false);
    expect(checkResp1.message).toBe('No hay token');
    expect(store.state.auth.status).toBe('not-authenticated');
    expect(store.state.auth.user).toBe(null);

    localStorage.setItem('idToken', 'Error-Token');
    const checkResp2 = await store.dispatch('auth/checkAuthentication');

    expect(checkResp2.ok).toBe(false);
    expect(checkResp2.message).toBe('INVALID_ID_TOKEN');
    expect(store.state.auth.status).toBe('not-authenticated');
    expect(store.state.auth.user).toBe(null);
  });
});
