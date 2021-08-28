import axios from 'axios';

const authApi = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1/accounts`,
  params: {
    key: 'AIzaSyC1e3mFHsQcRkfmALdU1_cCLpyzf7k0QQ4',
  },
});

export default authApi;
