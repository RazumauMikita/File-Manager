import { open, writeFile, rename, rm } from "node:fs/promises";
import { stdout, cwd } from "node:process";

export const printFileContent = async (path) => {
  try {
    const file = await open(path);
    const readStream = file.createReadStream();
    readStream.pipe(stdout);
  } catch {
    console.log("Error read file");
  }
};

export const createEmptyFile = async (newFileName) => {
  try {
    await writeFile(newFileName, "", { flag: "w" });
  } catch {
    console.log("Error create file");
  }
};

export const renameFile = async (oldPath, newPath) => {
  try {
    await rename(oldPath, newPath);
  } catch {
    console.log("Error rename file");
  }
};

export const removeFile = async (pathToFile) => {
  try {
    await rm(pathToFile);
  } catch {
    console.log("Error remove file");
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
    console.log("Error copy file");
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
    console.log("Error move file");
  }
};
