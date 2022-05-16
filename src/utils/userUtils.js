import User from '../models/User';
import Note from '../models/Note';
import Part from '../models/Part';
import Photo from '../models/Photo';

const getUserPartsIdsArray = async (user_id) => {
  const user = await User.findByPk(user_id, {
    attributes: [],
    include: {
      model: Note,
      attributes: ['id'],
      include: {
        model: Part,
        attributes: ['id'],
      },
    },
  });

  const notes = user.Notes;

  if (notes.length === 0) {
    return notes;
  }

  const parts = notes.map((Note) => Note.Parts).flat(1);

  if (parts.length === 0) {
    return parts;
  }

  const partsIds = parts.map(({ dataValues }) => dataValues.id);
  return partsIds;
};

const getAllUserPhotoFilenames = async (user_id) => {
  const photos = await Photo.findAll({ where: { user_id }, attributes: ['filename'] });
  const filenames = photos.map(({ filename }) => filename);
  return filenames;
};

export default { getUserPartsIdsArray, getAllUserPhotoFilenames };
