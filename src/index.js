import { stdin, exit } from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  getUsername,
  showGreetingPhrase,
  showGoodbyePhrase,
  showCurrentDirectory,
} from "./modules/greeting.js";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = getUsername();

showGreetingPhrase(USERNAME);
goToHomeDir();
showCurrentDirectory();

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

stdin.on("data", (data) => {
  const dataString = data.toString().trim();
  const [command, arg1, arg2] = dataString
    .split(" ")
    .filter((el) => el !== "")
    .map((el) => el.trim());
  //directory operations
  if (command === "up") {
    goUpper();
    showCurrentDirectory();
  }
  if (command === "cd") {
    goToDedicated(arg1);
    showCurrentDirectory();
  }

  if (command === "ls") {
    printListOfFiles();
  }
  // file operations
  if (command === "cat") {
    printFileContent(arg1);
  }
  if (command === "add") {
    createEmptyFile(arg1);
  }
  if (command === "rn") {
    renameFile(arg1, arg2);
  }
  if (command === "rm") {
    removeFile(arg1);
  }
  if (command === "cp") {
    copyFile(arg1, arg2);
  }
  if (command === "mv") {
    moveFile(arg1, arg2);
  }
  //os operations
  if (command === "os") {
    if (arg1 === "--EOL") {
      showEOL();
    }
    if (arg1 === "--cpus") {
      showCpu();
    }
    if (arg1 === "--homedir") {
      showHomeDir();
    }
    if (arg1 === "--username") {
      showUserName();
    }
    if (arg1 === "--architecture") {
      showArchitecture();
    }
  }
});
