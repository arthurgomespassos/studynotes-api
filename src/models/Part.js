import Sequelize, { Model } from 'sequelize';

export default class Part extends Model {
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
        validate: {
          len: {
            msg: 'Descrição deve ter no máximo 255 caracteres.',
            args: [0, 255],
          },
        },
      },
      text: {
        type: Sequelize.STRING(4000),
        defaultValue: '',
        validate: {
          len: {
            msg: 'Texto deve ter entre 1 e 4000 caracteres.',
            args: [1, 4000],
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Note, { foreignKey: 'note_id' });
  }
}
