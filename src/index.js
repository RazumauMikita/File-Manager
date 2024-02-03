import { stdin, exit } from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getUsername } from "./modules/greeting.js";
import {
  showGreetingPhrase,
  showGoodbyePhrase,
  showCurrentDirectory,
} from "./modules/messages.js";
import {
  goToDedicated,
  goToHomeDir,
  goUpper,
  printListOfFiles,
} from "./modules/directory.js";
import {
  copyFile,
  createEmptyFile,
  moveFile,
  printFileContent,
  removeFile,
  renameFile,
} from "./modules/readFile.js";
import {
  showArchitecture,
  showCpu,
  showEOL,
  showHomeDir,
  showUserName,
} from "./modules/os.js";
import { compressFile, decompressFile } from "./modules/compress.js";
import { showFileHash } from "./modules/hash.js";
import { readCommands } from "./modules/commandsExec.js";
const __filename = fileURLToPath(import.meta.url);

const USERNAME = getUsername();

showGreetingPhrase(USERNAME);
goToHomeDir();
showCurrentDirectory();

readCommands();

stdin.on("data", (data) => {
  const dataString = data.toString().trim();
  if (dataString === ".exit") {
    showGoodbyePhrase(USERNAME);
    exit();
  }
});

process.on("SIGINT", () => {
  showGoodbyePhrase(USERNAME);
  exit();
});
