import fs from 'fs';

const removeFileIfItExists = async (filePath) => {
  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    await fs.unlink(filePath, (err) => {
      if (err) {
        const errorMessageWithoutFilePath = err.message.split(',')[0];
        throwErrorObj(errorMessageWithoutFilePath);
      }
    });
  }
};

const throwErrorObj = (message) => {
  throw ({ errors: [{ message }] });
};

const moveFiles = (oldPath, newPath, errorMsg) => {
  fs.rename(oldPath, newPath, (err) => {
    if (err) throwErrorObj(errorMsg);
  });
};

export default { removeFileIfItExists, throwErrorObj, moveFiles };
