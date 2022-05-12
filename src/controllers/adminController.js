import { resolve } from 'path';

import User from '../models/User';
import utils from '../utils';

const IMAGES_DIR_PATH = resolve(__dirname, '..', '..', 'uploads', 'images');
const BAN_DIR_PATH = resolve(__dirname, '..', '..', 'uploads', 'imagesOfBannedUsers');

const index = async (req, res) => {
  const page_number = +req.body.page_number ?? 1;

  const isValidPageNumber = (page_number) => {
    if (!Number.isInteger(page_number)) return false;
    if (page_number < 1) return false;
    if (page_number > 1000000000) return false;

    return true;
  };

  if (!isValidPageNumber(page_number)) {
    return res.status(400).json({
      errors: ['page_number não recebido ou é inválido.'],
    });
  }

  const users = await User.findAll({
    order: [['id', 'DESC']],
    attributes: { exclude: 'password_hash' },
    limit: 50,
    offset: (page_number - 1) * 50
  });

  return res.json(users.length > 0 ? users : null);
};

const ban = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      errors: ['user_id não enviado.'],
    });
  }

  const user = await User.findOne({ where: { id: user_id, is_admin: 0, is_banned: 0 } });
  if (!user) {
    return res.status(400).json({
      errors: ['Usuário não encontrado para realizar banimento.'],
    });
  }

  await user.update({ is_banned: 1 });

  try {
    const photoFilenames = await utils.getAllUserPhotoFilenames(user_id);
    const oldPhotoPaths = photoFilenames.map((filename) => resolve(IMAGES_DIR_PATH, filename));
    const newPhotoPaths = photoFilenames.map((filename) => resolve(BAN_DIR_PATH, filename));

    photoFilenames.forEach((filename, index) => {
      utils.moveFiles(
        oldPhotoPaths[index],
        newPhotoPaths[index],
        `Erro ao mover foto ${filename} do usuário ${user_id}.`);
    });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }

  return res.json(null);
};

const unban = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      errors: ['user_id não enviado.'],
    });
  }

  const user = await User.findOne({ where: { id: user_id, is_admin: 0, is_banned: 1 } });
  if (!user) {
    return res.status(400).json({
      errors: ['Usuário não encontrado para realizar desbanimento.'],
    });
  }

  await user.update({ is_banned: 0 });

  try {
    const photoFilenames = await utils.getAllUserPhotoFilenames(user_id);
    const oldPhotoPaths = photoFilenames.map((filename) => resolve(BAN_DIR_PATH, filename));
    const newPhotoPaths = photoFilenames.map((filename) => resolve(IMAGES_DIR_PATH, filename));

    photoFilenames.forEach((filename, index) => {
      utils.moveFiles(
        oldPhotoPaths[index],
        newPhotoPaths[index],
        `Erro ao mover foto ${filename} do usuário ${user_id}.`);
    });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }

  return res.json(null);
};


export default { index, ban, unban };
