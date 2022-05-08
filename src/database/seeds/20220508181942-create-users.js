const bcryptjs = require('bcryptjs');

const NUMBER_OF_USERS = process.env.SEED_NUMBER_OF_USERS;

module.exports = {
  async up(queryInterface) {
    const generatedUsers = [];
    for (let i = 1; i <= NUMBER_OF_USERS; i++) {
      generatedUsers.push({
        id: i,
        name: `name${i}`,
        email: `email${i}@gmail.com`,
        password_hash: await bcryptjs.hash('12345678', 10),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', generatedUsers, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
