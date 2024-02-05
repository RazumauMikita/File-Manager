import zlib from "zlib";
import { open } from "fs/promises";
import path from "path";

import { showErrorMessage } from "./messages.js";
import { pipeline } from "stream/promises";

export const compressFile = async (pathToFile, pathToDestination) => {
  try {
    const fileName = path.basename(pathToFile);
    const file = await open(pathToFile);
    const newFile = await open(
      path.join(pathToDestination, fileName + ".br"),
      "w"
    );

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const gzip = zlib.createBrotliCompress();

    await pipeline(readStream, gzip, writeStream);
  } catch {
    showErrorMessage();
  }
};

export const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const fileName = path.basename(pathToFile).replace(".br", "");
    const file = await open(pathToFile);
    const newFile = await open(path.join(pathToDestination, fileName), "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const unzip = zlib.createBrotliDecompress();
    await pipeline(readStream, unzip, writeStream);
  } catch {
    showErrorMessage();
  }
};
