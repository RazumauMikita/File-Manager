import { open } from "node:fs/promises";
import crypto from "node:crypto";
import { showErrorMessage } from "./messages.js";

export const showFileHash = async (pathToFile) => {
  try {
    const file = await open(pathToFile);
    const readableStream = file.createReadStream();

    readableStream.on("readable", () => {
      let chunk;
      while ((chunk = readableStream.read()) !== null) {
        const hashSum = crypto.createHash("sha256");
        hashSum.update(chunk);

        const hex = hashSum.digest("hex");

        process.stdout.write(hex + "\n");
      }
    });
  } catch {
    showErrorMessage();
  }
};
