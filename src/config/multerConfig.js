import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

const generateRandomString = () => crypto.randomBytes(64).toString('hex');

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser PNG, JPG ou JPEG.'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${generateRandomString()}${extname(file.originalname)}`);
    },
  }),
};
