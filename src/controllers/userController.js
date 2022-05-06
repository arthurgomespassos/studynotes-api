import User from '../models/User';

const index = async (req, res) => {
  const users = await User.findAll({
    order: [['id', 'DESC']],
    attributes: { exclude: 'password_hash' },
  });
  return res.json(users);
};

const show = async (req, res) => {
  try {
    console.log(req);
    const id = req.userId;
    if (!id) {
      return res.status(400).json({
        errors: ['id não recebido pelo token.'],
      });
    }

    const user = await User.findByPk(
      id,
      { attributes: { exclude: 'password_hash' } },
    );
    return res.json(user);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const store = async (req, res) => {
  try {
    const user = await User.create(req.body, {
      fields: ['name', 'email', 'password_hash'],
    });

    const { id, name, email } = user;
    return res.json({ id, name, email });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const update = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({
        errors: ['id não enviado pelo token.'],
      });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não encontrado.'],
      });
    }

    const updatedUser = await user.update(req.body);
    const { id, name, email } = updatedUser;
    return res.json({ id, name, email });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.userId;
    if (!id) {
      return res.status(400).json({
        errors: ['id não enviado pelo token.'],
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não encontrado.'],
      });
    }

    await user.destroy();
    return res.json(null);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

export default {
  index, show, store, update, remove,
};
