const bcryptjs = require('bcryptjs');

const NUMBER_OF_USERS = +process.env.SEED_NUMBER_OF_USERS;

module.exports = {
  async up(queryInterface) {
    const generatedUsers = [];
    for (let i = 1; i <= NUMBER_OF_USERS; i++) {
      generatedUsers.push({
        id: i,
        name: `name${i}`,
        email: `email${i}@gmail.com`,
        password_hash: await bcryptjs.hash('12345678', 10),
        is_admin: 0,
        is_banned: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    generatedUsers.push({
      id: NUMBER_OF_USERS + 1,
      name: 'admin',
      email: 'admin@gmail.com',
      password_hash: await bcryptjs.hash('adminadmin', 10),
      is_admin: 1,
      is_banned: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert('users', generatedUsers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
