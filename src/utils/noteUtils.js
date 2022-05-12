import utils from '.';
import partUtils from './partUtils';
import photoUtils from './photoUtils';

const removeAllPhotosAndTheirFilesFromANote = async (note_id) => {
  const partsIds = await utils.getTheIdsOfThePartsOfANote(note_id);
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

export default { removeAllPhotosAndTheirFilesFromANote };
