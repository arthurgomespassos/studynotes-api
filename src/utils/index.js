import fs from 'fs';

import User from '../models/User';
import Note from '../models/Note';
import Part from '../models/Part';
import Photo from '../models/Photo';

const userHasThisNote = async (note_id, user_id) => {
  const note = await Note.findOne({ where: { id: note_id, user_id }, attributes: ['id'] });
  return !!note;
};

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

  if (notes.lenght === 0) {
    return notes;
  }

  const parts = notes.map((Note) => Note.Parts).flat(1);

  if (parts.lenght === 0) {
    return parts;
  }

  const partsIds = parts.map(({ dataValues }) => dataValues.id);
  return partsIds;
};

const userHasThisPart = async (user_id, part_id) => {
  const userPartsIds = await getUserPartsIdsArray(user_id);
  if (userPartsIds.lenght === 0) {
    return false;
  }
  return userPartsIds.includes(+part_id);
};

const throwErrorObj = (message) => {
  throw ({ errors: [{ message }] });
};

const moveFiles = (oldPath, newPath, errorMsg) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) throwErrorObj(errorMsg);
  });
};

const getAllUserPhotoFilenames = async (user_id) => {
  const photos = await Photo.findAll({ where: { user_id }, attributes: ['filename'] });
  const userHavePhotos = photos.length > 0 ? true : false;

  if (!userHavePhotos) {
    return [];
  }

  const filenames = photos.map(({ filename }) => filename);
  return filenames;
};

const getTheIdsOfThePartsOfANote = async (note_id) => {
  const parts = await Part.findAll({ where: { note_id }, attributes: ['id'] });
  const ids = parts.map(({ id }) => id);
  return ids;
};

export default {
  userHasThisNote,
  userHasThisPart,
  throwErrorObj,
  moveFiles,
  getAllUserPhotoFilenames,
  getTheIdsOfThePartsOfANote
};
