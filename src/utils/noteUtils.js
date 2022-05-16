import partUtils from './partUtils';
import photoUtils from './photoUtils';

import Note from '../models/Note';
import Part from '../models/Part';

const userHasThisNote = async (note_id, user_id) => {
  const note = await Note.findOne({ where: { id: note_id, user_id }, attributes: ['id'] });
  return !!note;
};

const getTheIdsOfThePartsOfANote = async (note_id) => {
  const parts = await Part.findAll({ where: { note_id }, attributes: ['id'] });
  const ids = parts.map(({ id }) => id);
  return ids;
};

const removeAllPhotosAndTheirFilesFromANote = async (note_id) => {
  const partsIds = await getTheIdsOfThePartsOfANote(note_id);
  const photosIds = [];
  for (const id of partsIds) {
    const photoId = await partUtils.getThePhotoIdOfAPart(id);
    if (photoId) {
      photosIds.push(photoId);
    }
  }

  for (const id of photosIds) {
    await photoUtils.removeAPhotoAndFile(id);
  }
};

export default { removeAllPhotosAndTheirFilesFromANote, userHasThisNote, getTheIdsOfThePartsOfANote };
