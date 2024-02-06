import { open, writeFile, rename, rm } from "fs/promises";
import { stdout } from "process";
import path from "path";

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

export const copyFile = async (pathToFile, pathToNewDirectory) => {
  let file, newFile;
  try {
    const fileName = path.basename(pathToFile);
    file = await open(pathToFile);
    newFile = await open(path.join(pathToNewDirectory, fileName), "w");
    const readStream = file.createReadStream();
    const writeStream = newFile.createWriteStream();
    const stream = readStream.pipe(writeStream);
    stream.on("end", () => {
      file.close();
      newFile.close();
    });
  } catch {
    file?.close();
    newFile?.close();
    showErrorMessage();
  }
};

export const moveFile = async (pathToFile, pathToNewDirectory) => {
  let file, newFile;
  try {
    const fileName = path.basename(pathToFile);
    file = await open(pathToFile);
    newFile = await open(path.join(pathToNewDirectory, fileName), "w");
    const readStream = file.createReadStream();
    const writeStream = newFile.createWriteStream();
    readStream.pipe(writeStream);
    readStream.on("end", () => {
      file.close();
      newFile.close();
      removeFile(pathToFile);
    });
  } catch {
    file?.close();
    newFile?.close();
    showErrorMessage();
  }
};
