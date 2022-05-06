import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Note from '../models/Note';
import User from '../models/User';

const connection = new Sequelize(databaseConfig);
const models = [User, Note];

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate?.(connection.models));
