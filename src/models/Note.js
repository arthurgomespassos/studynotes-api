import Sequelize, { Model } from 'sequelize';

export default class Note extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: Sequelize.STRING(80),
        defaultValue: '',
        validate: {
          len: {
            msg: 'Título deve conter entre 1 e 80 caracteres.',
            args: [1, 80],
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        len: {
          msg: 'Descrição deve ter no máximo 255 caracteres.',
          args: [0, 255],
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
