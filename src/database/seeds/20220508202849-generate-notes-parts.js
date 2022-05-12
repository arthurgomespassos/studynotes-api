const NUMBER_OF_USERS = +process.env.SEED_NUMBER_OF_USERS;
const NUMBER_OF_NOTES_PER_USER = +process.env.SEED_NUMBER_OF_NOTES_PER_USER;
const NUMBER_OF_PARTS_PER_NOTE = +process.env.SEED_NUMBER_OF_PARTS_PER_NOTE;

const getActualNoteId = (i, j) => (i - 1) * NUMBER_OF_NOTES_PER_USER + j;

const getActualPartId = (i, j, k) => (getActualNoteId(i, j) - 1) * NUMBER_OF_PARTS_PER_NOTE + k;

module.exports = {
  async up(queryInterface) {
    const generatedParts = [];
    for (let i = 1; i <= NUMBER_OF_USERS; i++) {
      for (let j = 1; j <= NUMBER_OF_NOTES_PER_USER; j++) {
        for (let k = 1; k <= NUMBER_OF_PARTS_PER_NOTE; k++) {
          generatedParts.push({
            id: getActualPartId(i, j, k),
            note_id: getActualNoteId(i, j),
            title: `title ${k} of note ${getActualNoteId(i, j)}`,
            description: `description ${k} of note ${getActualNoteId(i, j)}`,
            text: `text ${k} of note ${getActualNoteId(i, j)}`,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }
    }

    await queryInterface.bulkInsert('parts', generatedParts, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('parts', null, {});
  },
};
