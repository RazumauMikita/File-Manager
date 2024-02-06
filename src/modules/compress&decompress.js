import zlib from "zlib";
import { open } from "fs/promises";
import path from "path";

import { showErrorMessage } from "./messages.js";
import { pipeline } from "stream/promises";

export const compressFile = async (pathToFile, pathToDestination) => {
  let file, newFile;
  try {
    const fileName = path.basename(pathToFile);
    file = await open(pathToFile);
    newFile = await open(path.join(pathToDestination, fileName + ".br"), "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const gzip = zlib.createBrotliCompress();

    await pipeline(readStream, gzip, writeStream);
  } catch {
    showErrorMessage();
  } finally {
    file?.close();
    newFile?.close();
  }
};

export const decompressFile = async (pathToFile, pathToDestination) => {
  let file, newFile;
  try {
    const fileName = path.basename(pathToFile).replace(".br", "");
    file = await open(pathToFile);
    newFile = await open(path.join(pathToDestination, fileName), "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const unzip = zlib.createBrotliDecompress();
    await pipeline(readStream, unzip, writeStream);
  } catch {
    showErrorMessage();
  } finally {
    file?.close();
    newFile?.close();
  }
};
