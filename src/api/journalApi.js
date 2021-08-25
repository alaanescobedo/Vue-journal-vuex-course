import axios from 'axios';

const journalApi = axios.create({
  baseURL: `https://vue-demos-676b1-default-rtdb.firebaseio.com`,
});

export default journalApi;
