export const testUser = (status) => ({
  status,
  user: { name: 'Test Existing User', email: 'test@existinguser.com', password: 'test123' },
  idToken: 'ABC-123',
  refreshToken: 'XYZ-789',
});

export const testCreateUser = {
  name: 'Test Create User',
  email: 'test@createUser.com',
  password: 'test123',
};
