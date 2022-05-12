import Sequelize, { Model } from 'sequelize';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo originalname não pode ficar vazio.'
          }
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo filename não pode ficar vazio.'
          }
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${process.env.APP_URL}/images/${this.getDataValue('filename')}`;
        }
      }
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Part, { foreignKey: 'part_id' });

  }
}
