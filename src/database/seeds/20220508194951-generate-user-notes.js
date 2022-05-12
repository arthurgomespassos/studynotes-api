const NUMBER_OF_USERS = +process.env.SEED_NUMBER_OF_USERS;
const NUMBER_OF_NOTES_PER_USER = +process.env.SEED_NUMBER_OF_NOTES_PER_USER;

const getActualNoteId = (i, j) => (i - 1) * NUMBER_OF_NOTES_PER_USER + j;

module.exports = {
  async up(queryInterface) {
    const generatedNotes = [];
    for (let i = 1; i <= NUMBER_OF_USERS; i++) {
      for (let j = 1; j <= NUMBER_OF_NOTES_PER_USER; j++) {
        generatedNotes.push({
          id: getActualNoteId(i, j),
          user_id: i,
          title: `title ${j} of user ${i}`,
          description: `description ${j} of user ${i}`,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('notes', generatedNotes, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('notes', null, {});
  },
};
