import User from '../models/User';

const excludeOptionsToNormalUser = ['created_at', 'updated_at', 'password_hash', 'is_admin', 'is_banned'];

const show = async (req, res) => {
  try {
    const id = req.user_id;

    const user = await User.findByPk(
      id,
      { attributes: { exclude: excludeOptionsToNormalUser } },
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
    const user = await User.findByPk(req.user_id);
    if (!user) {
      return res.status(400).json({
        errors: ['Usuário não encontrado.'],
      });
    }

    const updatedUser = await user.update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const { id, name, email } = updatedUser;
    return res.json({ id, name, email });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};

export default { show, store, update };
