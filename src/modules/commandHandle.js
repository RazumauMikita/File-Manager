import {
  goToDedicated,
  goUpper,
  printListOfFiles,
} from "./directoryOperations.js";
import {
  copyFile,
  createEmptyFile,
  moveFile,
  printFileContent,
  removeFile,
  renameFile,
} from "./fileOperations.js";
import {
  showArchitecture,
  showCpu,
  showEOL,
  showHomeDir,
  showUserName,
} from "./osOperations.js";
import { showCurrentDirectory, showGoodbyePhrase } from "./messages.js";
import { stdin } from "node:process";

import * as readline from "node:readline/promises";
import { showFileHash } from "./hashOperation.js";
import { compressFile, decompressFile } from "./compress/decompress.js";
import { getUsername } from "./getUserName.js";

const COMMANDS = {
  EXIT: ".exit",
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

const USERNAME = getUsername();

export const commandListener = () => {
  const rl = readline.createInterface(stdin);

  process.on("SIGINT", () => {
    showGoodbyePhrase(USERNAME);
    process.exit();
  });

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
        showCurrentDirectory();
        break;
      case COMMANDS.PRINT_CONTENT:
        printFileContent(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.CREATE_FILE:
        createEmptyFile(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.RENAME_FILE:
        renameFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.REMOVE_FILE:
        removeFile(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.COPY_FILE:
        copyFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.MOVE_FILE:
        moveFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.OPERATION_SYSTEM:
        switch (arg1) {
          case OS_FLAGS.SHOW_EOL:
            showEOL();
            showCurrentDirectory();
            break;
          case OS_FLAGS.SHOW_CPU:
            showCpu();
            showCurrentDirectory();
            break;
          case OS_FLAGS.SHOW_HOMEDIR:
            showHomeDir();
            showCurrentDirectory();
            break;
          case OS_FLAGS.SHOW_USERNAME:
            showUserName();
            showCurrentDirectory();
            break;
          case OS_FLAGS.SHOW_ARCH:
            showArchitecture();
            showCurrentDirectory();
            break;
        }
        break;
      case COMMANDS.SHOW_HASH:
        showFileHash(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.COMPRESS_FILE:
        compressFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.DECOMPRESS_FILE:
        decompressFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.EXIT:
        showGoodbyePhrase(USERNAME);
        process.exit();
    }
  });
};
