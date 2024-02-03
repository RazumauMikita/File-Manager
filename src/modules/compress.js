import zlib from "node:zlib";
import { open } from "node:fs/promises";

export const compressFile = async (pathToFile, pathToDestination) => {
  try {
    const file = await open(pathToFile);
    const newFile = await open(pathToDestination, "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream);
  } catch {
    process.stdout.write("Operation fail.\n");
  }
};

export const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const file = await open(pathToFile);
    const newFile = await open(pathToDestination, "w");

    const writeStream = newFile.createWriteStream();
    const readStream = file.createReadStream();
    const unzip = zlib.createUnzip();

    readStream.pipe(unzip).pipe(writeStream);
  } catch {
    process.stdout.write("Operation fail.\n");
  }
};
