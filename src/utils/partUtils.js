import Photo from '../models/Photo';
import photoUtils from './photoUtils';

const getThePhotoIdOfAPart = async (part_id) => {
  const photo = await Photo.findOne({ where: { part_id }, attributes: ['id'] });
  return photo ? photo.id : null;
};

const removeAPhotoAndFileFromAPart = async (part_id) => {
  const photoId = await getThePhotoIdOfAPart(part_id);
  if (photoId) {
    await photoUtils.removeAPhotoAndFile(photoId);
  }
};

export default { getThePhotoIdOfAPart, removeAPhotoAndFileFromAPart };
