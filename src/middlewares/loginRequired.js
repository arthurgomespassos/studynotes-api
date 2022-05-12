import jwt from 'jsonwebtoken';
import User from '../models/User';

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['É necessário fazer login.'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = tokenData;

    const user = await User.findOne({ where: { id, email }, attributes: ['id'] });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    req.user_id = id;
    req.user_email = email;

    return next();
  } catch {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};

export default loginRequired;
