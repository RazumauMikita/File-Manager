import { goToDedicated, goUpper, printListOfFiles } from "./directory.js";
import {
  copyFile,
  createEmptyFile,
  moveFile,
  printFileContent,
  removeFile,
  renameFile,
} from "./readFile.js";
import {
  showArchitecture,
  showCpu,
  showEOL,
  showHomeDir,
  showUserName,
} from "./os.js";
import { showCurrentDirectory } from "./messages.js";
import { stdin } from "node:process";

import * as readline from "node:readline/promises";
import { showFileHash } from "./hash.js";
import { compressFile, decompressFile } from "./compress.js";

const COMMANDS = {
  GO_UP: "up",
  CHANGE_DIR: "cd",
  LIST_OF_FILES: "ls",
  PRINT_CONTENT: "cat",
  CREATE_FILE: "add",
  RENAME_FILE: "rn",
  REMOVE_FILE: "rm",
  COPY_FILE: "cp",
  MOVE_FILE: "mv",
  OPERATION_SYSTEM: "os",
  COMPRESS_FILE: "compress",
  DECOMPRESS_FILE: "decompress",
  SHOW_HASH: "hash",
};

const OS_FLAGS = {
  SHOW_EOL: "--EOL",
  SHOW_CPU: "--cpus",
  SHOW_HOMEDIR: "--homedir",
  SHOW_USERNAME: "--username",
  SHOW_ARCH: "--architecture",
};

export const readCommands = () => {
  const rl = readline.createInterface(stdin);
  rl.on("line", (input) => {
    const dataString = input.trim();
    const [command, arg1, arg2] = dataString
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => el.trim());

    switch (command) {
      case COMMANDS.GO_UP:
        goUpper();
        showCurrentDirectory();
        break;
      case COMMANDS.CHANGE_DIR:
        goToDedicated(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.LIST_OF_FILES:
        printListOfFiles();
        break;
      case COMMANDS.PRINT_CONTENT:
        printFileContent(arg1);
        break;
      case COMMANDS.CREATE_FILE:
        createEmptyFile(arg1);
        break;
      case COMMANDS.RENAME_FILE:
        renameFile(arg1, arg2);
        break;
      case COMMANDS.REMOVE_FILE:
        removeFile(arg1);
        break;
      case COMMANDS.COPY_FILE:
        copyFile(arg1, arg2);
        break;
      case COMMANDS.MOVE_FILE:
        moveFile(arg1, arg2);
        break;
      case COMMANDS.OPERATION_SYSTEM:
        switch (arg1) {
          case OS_FLAGS.SHOW_EOL:
            showEOL();
            break;
          case OS_FLAGS.SHOW_CPU:
            showCpu();
            break;
          case OS_FLAGS.SHOW_HOMEDIR:
            showHomeDir();
            break;
          case OS_FLAGS.SHOW_USERNAME:
            showUserName();
          case OS_FLAGS.SHOW_ARCH:
            showArchitecture();
            break;
        }
        break;
      case COMMANDS.SHOW_HASH:
        showFileHash(arg1);
        break;
      case COMMANDS.COMPRESS_FILE:
        compressFile(arg1, arg2);
        break;
      case COMMANDS.DECOMPRESS_FILE:
        decompressFile(arg1, arg2);
        break;
    }
  });
  stdin.on("data", (data) => {
    const dataString = data.toString().trim();
    const [command, arg1, arg2] = dataString
      .split(" ")
      .filter((el) => el !== "")
      .map((el) => el.trim());
    //directory operations
    /* if (command === "up") {
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

    //compress/decompress
    if (command === "compress") {
      compressFile(arg1, arg2);
    }
    if (command === "decompress") {
      decompressFile(arg1, arg2);
    }

    //hash

    if (command === "hash") {
      showFileHash(arg1);
    }
    */
  });
};
