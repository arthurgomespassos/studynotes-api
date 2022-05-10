import bcryptjs from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING(40),
        defaultValue: '',
        validate: {
          len: {
            msg: 'Campo nome deve ter entre 3 e 40 caracteres.',
            args: [3, 40],
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe.',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido.',
          },
          len: {
            args: [3, 255],
            msg: 'Campo email deve ter entre 3 e 255 caracteres.',
          },
        },
      },
      password_hash: {
        type: Sequelize.CHAR(60),
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            msg: 'A senha precisa ter entre 8 e 60 caracteres.',
            args: [8, 60],
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 10);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Note, { foreignKey: 'user_id' });
    this.hasMany(models.Photo, { foreignKey: 'user_id' });
  }
}
