import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Note from '../models/Note';
import Part from '../models/Part';
import Photo from '../models/Photo';

const connection = new Sequelize(databaseConfig);
const models = [User, Note, Part, Photo];

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate?.(connection.models));
