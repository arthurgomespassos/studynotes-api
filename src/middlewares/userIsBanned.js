import User from '../models/User';

const userIsBanned = async (req, res, next) => {
  const { user_id } = req;

  const user = await User.findOne({ where: { id: user_id, is_banned: 1 }, attributes: ['id'] });
  if (user) {
    return res.status(403).json({
      errors: ['Você foi banido e portanto não pode acessar este conteúdo.'],
    });
  }

  return next();
};

export default userIsBanned;
