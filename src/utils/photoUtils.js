import { resolve } from 'path';

import Photo from '../models/Photo';
import commons from './commonsUtils';

const removeAPhotoAndFile = async (photo_id) => {
  const photo = await Photo.findByPk(photo_id);
  const photoFilePath = resolve(__dirname, '..', '..', 'uploads', 'images', `${photo.filename}`);
  await commons.removeFileIfItExists(photoFilePath);
  await photo.destroy();
};

export default { removeAPhotoAndFile };
