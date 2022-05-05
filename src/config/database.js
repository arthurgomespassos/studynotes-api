require('dotenv').config();

const config = {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  define: {
    timestamps: true, // created_at and updated_at by default
    underscored: true, // 'tableName' => 'table_name'
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: {
    timezone: 'local',
  },
  timezone: 'America/Sao_Paulo',
};

module.exports = config;
