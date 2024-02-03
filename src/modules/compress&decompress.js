import zlib from "zlib";
import { open } from "fs/promises";

import { showErrorMessage } from "./messages.js";

export const compressFile = async (pathToFile, pathToDestination) => {
  try {
    const file = await open(pathToFile);
    const newFile = await open(pathToDestination, "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const gzip = zlib.createBrotliCompress();

    readStream.pipe(gzip).pipe(writeStream);
  } catch {
    showErrorMessage();
  }
};

export const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const file = await open(pathToFile);
    const newFile = await open(pathToDestination, "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const unzip = zlib.createBrotliDecompress();

    readStream.pipe(unzip).pipe(writeStream);
  } catch {
    showErrorMessage();
  }
};
