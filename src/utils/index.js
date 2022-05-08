import Note from '../models/Note';
import Part from '../models/Part';
import User from '../models/User';

const userHasThisNote = async (note_id, user_id) => {
  const note = await Note.findOne({ where: { id: note_id, user_id } });
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

export default { userHasThisNote, userHasThisPart };
