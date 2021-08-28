const authState = () => ({
  status: 'authenticating',
  user: null,
  idToken: null,
  refreshToken: null,
});

export default authState;
