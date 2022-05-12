import fs from 'fs';
import utils from '.';

const removeFileIfItExists = async (filePath) => {
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    await fs.unlink(filePath, (err) => {
      if (err) {
        const errorMessageWithoutFilePath = err.message.split(',')[0];
        throw utils.throwErrorObj(errorMessageWithoutFilePath);
      }
    });
  }
};

export default { removeFileIfItExists };
