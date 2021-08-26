import axios from 'axios';
import uploadImage from '@/modules/daybook/helpers/uploadImage';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'desxpqy6n',
  api_key: '629985423884592',
  api_secret: 'XjVq3sFD7j_Cb-uA3fvg9u4dyDY',
});

describe('Upload Image - Helper', () => {
  test('debe de cargar el archivo y retornar el url', async (done) => {
    const { data } = await axios.get(
      'https://res.cloudinary.com/desxpqy6n/image/upload/v1629919213/Test-1/lzo0oqtnxqaeshtluo61.jpg',
      {
        responseType: 'arraybuffer',
      }
    );

    const file = new File([data], 'picture.jpg');
    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    //Borrar imagen subida para no generar basura
    const segments = url.split('/');
    const folder = segments[segments.length - 2];
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    cloudinary.v2.api.delete_resources(`${folder}/${imageId}`, {}, () => {
      done();
    });
  });
});
