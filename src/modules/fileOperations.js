import { open, writeFile, rename, rm } from "fs/promises";
import { stdout } from "process";

import { showErrorMessage } from "./messages.js";

export const printFileContent = async (path) => {
  return new Promise(async (resolve) => {
    let file;
    try {
      file = await open(path);
      const readStream = file.createReadStream();
      readStream.pipe(stdout);
      readStream.on("end", () => {
        file.close();
        stdout.write("\n");
        resolve();
      });
    } catch {
      file?.close();
      showErrorMessage();
    }
  });
};

export const createEmptyFile = async (newFileName) => {
  try {
    await writeFile(newFileName, "", { flag: "w" });
  } catch {
    showErrorMessage();
  }
};

export const renameFile = async (oldPath, newPath) => {
  try {
    await rename(oldPath, newPath);
  } catch {
    showErrorMessage();
  }
};

export const removeFile = async (pathToFile) => {
  try {
    await rm(pathToFile);
  } catch {
    showErrorMessage();
  }
};

export const copyFile = async (filePath, newDirPath) => {
  try {
    const file = await open(filePath);
    const newFile = await open(newDirPath, "w");
    const readStream = file.createReadStream();
    const writeStream = newFile.createWriteStream();
    readStream.pipe(writeStream);
  } catch {
    showErrorMessage();
  }
};

export const moveFile = async (filePath, newDirPath) => {
  try {
    const file = await open(filePath);
    const newFile = await open(newDirPath, "w");
    const readStream = file.createReadStream();
    const writeStream = newFile.createWriteStream();
    readStream.pipe(writeStream);
    readStream.on("end", () => {
      removeFile(filePath);
    });
  } catch {
    showErrorMessage();
  }
};
