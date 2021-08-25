import axios from 'axios';

const cloudinaryAPi = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/desxpqy6n/image/upload',
});

export default cloudinaryAPi;
