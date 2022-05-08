import Note from '../models/Note';

const index = async (req, res) => {
  const { user_id } = req;

  const notes = await Note.findAll({
    where: { user_id },
    order: [['updated_at', 'DESC']],
  });

  return res.json(notes.length === 0 ? null : notes);
};

const store = async (req, res) => {
  try {
    const { user_id } = req;

    if (req.body.user_id) {
      return res.status(400).json({
        errors: ['user_id não deve ser enviado pelo corpo da requisição.'],
      });
    }

    const note = await Note.create(
      { ...req.body, user_id },
      { fields: ['title', 'description', 'user_id'] },
    );

    return res.json(note);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const show = async (req, res) => {
  try {
    const { user_id } = req;
    const { note_id } = req.params;

    if (!note_id) {
      return res.status(400).json({
        errors: ['noteId não recebido no parâmetro.'],
      });
    }

    const note = await Note.findOne({
      where: {
        id: note_id,
        user_id,
      },
    });

    return res.json(note);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const update = async (req, res) => {
  try {
    const { user_id } = req;
    const { note_id } = req.body;

    if (!note_id) {
      return res.status(400).json({
        errors: ['note_id não recebido no corpo da requisição.'],
      });
    }

    const note = await Note.findOne({
      where: {
        id: note_id,
        user_id,
      },
    });

    if (!note) {
      return res.status(400).json({
        errors: ['Não existe nenhuma note com esse id.'],
      });
    }

    const updatedNote = await note.update(req.body, {
      fields: ['title', 'description'],
    });

    return res.json(updatedNote);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const remove = async (req, res) => {
  try {
    const { user_id } = req;
    const { note_id } = req.body;

    if (!note_id) {
      return res.status(400).json({
        errors: ['note_id não recebido no corpo da requisição.'],
      });
    }

    const note = await Note.findOne({
      where: {
        id: note_id,
        user_id,
      },
    });

    if (!note) {
      return res.status(400).json({
        errors: ['Não existe nenhuma note com esse id.'],
      });
    }

    await note.destroy();
    return res.json(null);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

export default {
  store, index, show, update, remove,
};
