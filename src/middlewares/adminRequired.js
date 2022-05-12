import User from '../models/User';

const adminRequired = async (req, res, next) => {
  const { user_id } = req;

  const user = await User.findOne({ where: { id: user_id, is_admin: 1 }, attributes: ['id'] });
  if (!user) {
    return res.status(403).json({
      errors: ['Você não é um administrador para acessar esta rota.'],
    });
  }

  return next();
};

export default adminRequired;
