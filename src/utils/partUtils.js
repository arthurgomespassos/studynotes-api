import Photo from '../models/Photo';
import photoUtils from './photoUtils';
import userUtils from './userUtils';

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

const userHasThisPart = async (user_id, part_id) => {
  const userPartsIds = await userUtils.getUserPartsIdsArray(user_id);
  if (userPartsIds.length === 0) {
    return false;
  }
  return userPartsIds.includes(+part_id);
};

export default { getThePhotoIdOfAPart, removeAPhotoAndFileFromAPart, userHasThisPart };
