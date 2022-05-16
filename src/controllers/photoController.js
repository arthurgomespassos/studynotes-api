import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Photo from '../models/Photo';
import partUtils from '../utils/partUtils';
import photoUtils from '../utils/photoUtils';

const upload = multer(multerConfig).single('picture');

const show = async (req, res) => {
  const { user_id } = req;
  const { part_id } = req.params;

  if (!await partUtils.userHasThisPart(user_id, part_id)) {
    return res.status(400).json({
      errors: ['Você não pode ver uma photo que não é sua.'],
    });
  };

  const photo = await Photo.findOne({ where: { part_id }, attributes: ['filename', 'url'] });
  return res.json(photo ? { url: photo.url } : null);
};

const store = async (req, res) => {
  const { user_id } = req;
  const { part_id } = req.params;

  if (!await partUtils.userHasThisPart(user_id, part_id)) {
    return res.status(400).json({
      errors: ['Você não pode adicionar uma photo em uma part que não é sua.'],
    });
  };

  const photoExistsInThisPart = await Photo.findOne({ where: { part_id }, });
  if (photoExistsInThisPart) {
    return res.status(400).json({
      errors: ['Você não pode inserir mais de uma photo na mesma part.'],
    });
  }

  return upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        errors: [err.code],
      });
    }

    const { originalname, filename } = req.file;

    try {
      const photo = await Photo.create({ user_id, part_id, originalname, filename });
      return res.json({ url: photo.url });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(({ message }) => message),
      });
    }
  });
};

const remove = async (req, res) => {
  const { user_id } = req;
  const { part_id } = req.params;

  if (!await partUtils.userHasThisPart(user_id, part_id)) {
    return res.status(400).json({
      errors: ['Você não pode remover uma foto de uma part que não é sua.'],
    });
  };

  const photo = await Photo.findOne({ where: { part_id } });
  if (!photo) {
    return res.status(400).json({
      errors: ['Você não pode remover uma photo que nem sequer existe.'],
    });
  }

  try {
    await photoUtils.removeAPhotoAndFile(photo.id);
    return res.json(null);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map(({ message }) => message),
    });
  }
};


export default { show, store, remove };
