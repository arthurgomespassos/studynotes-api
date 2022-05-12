import Part from '../models/Part';

import utils from '../utils';
import partUtils from '../utils/partUtils';

const index = async (req, res) => {
  try {
    const { user_id } = req;
    const { note_id } = req.body;

    if (!note_id) {
      return res.status(400).json({
        errors: ['note_id não não recebido.'],
      });
    }

    if (!await utils.userHasThisNote(note_id, user_id)) {
      return res.status(400).json({
        errors: ['note_id não pertence a este usuário ou é inválido.'],
      });
    }

    const parts = await Part.findAll({ where: { note_id } });
    return res.json(parts.length === 0 ? null : parts);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const store = async (req, res) => {
  try {
    const { user_id } = req;
    const { note_id } = req.body;

    if (!note_id) {
      return res.status(400).json({
        errors: ['note_id não não recebido.'],
      });
    }

    if (!await utils.userHasThisNote(note_id, user_id)) {
      return res.status(400).json({
        errors: ['note_id não pertence a este usuário ou é inválido.'],
      });
    }

    const part = await Part.create(req.body, {
      fields: ['note_id', 'title', 'text', 'description'],
    });

    return res.json(part);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const update = async (req, res) => {
  try {
    const { user_id } = req;
    const { note_id, id } = req.body;

    if (!note_id) {
      return res.status(400).json({
        errors: ['note_id não não recebido.'],
      });
    }

    if (!id) {
      return res.status(400).json({
        errors: ['id da part não não recebido.'],
      });
    }

    if (!await utils.userHasThisNote(note_id, user_id)) {
      return res.status(400).json({
        errors: ['note_id não pertence a este usuário ou é inválido.'],
      });
    }

    const part = await Part.findOne({ where: { id, note_id } });

    if (!part) {
      return res.status(400).json({
        errors: ['part com este id não existe nesta note.'],
      });
    }

    const updatedPart = await part.update(req.body, {
      fields: ['title', 'text', 'description'],
    });

    return res.json(updatedPart);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const remove = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        errors: ['id da part não não recebido.'],
      });
    }

    if (!await utils.userHasThisPart(user_id, id)) {
      return res.status(400).json({
        errors: ['Não é possível deletar uma part que não é sua.'],
      });
    }

    await partUtils.removeAPhotoAndFileFromAPart(id);

    await Part.destroy({ where: { id } });
    return res.json(null);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

export default {
  index, store, update, remove,
};
