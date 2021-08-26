import cloudinaryApi from '@/api/cloudinaryApi';

const uploadImage = async (file) => {
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append('upload_preset', 'curso-vue');
    formData.append('file', file);

    const { data } = await cloudinaryApi.post('', formData);
    console.log(data);
    return data.secure_url;
  } catch (error) {
    console.log('Error al cargar la imagen');
    console.log(error);
    return null;
  }
};

export default uploadImage;
