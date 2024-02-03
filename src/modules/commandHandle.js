import { stdin, stdout } from "process";
import readline from "readline/promises";

import { showCurrentDirectory, showGoodbyePhrase } from "./messages.js";
import { showFileHash } from "./hashOperation.js";
import { compressFile, decompressFile } from "./compress&decompress.js";
import { getUsername } from "./getUserName.js";
import { COMMANDS, OS_FLAGS } from "./commands.js";
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

const USERNAME = getUsername();

export const commandListener = () => {
  const rl = readline.createInterface(stdin, stdout);

  rl.on("line", async (input) => {
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
        await printListOfFiles();
        showCurrentDirectory();
        break;
      case COMMANDS.PRINT_CONTENT:
        await printFileContent(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.CREATE_FILE:
        await createEmptyFile(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.RENAME_FILE:
        await renameFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.REMOVE_FILE:
        await removeFile(arg1);
        showCurrentDirectory();
        break;
      case COMMANDS.COPY_FILE:
        await copyFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.MOVE_FILE:
        await moveFile(arg1, arg2);
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
        await showFileHash(arg1);

        break;
      case COMMANDS.COMPRESS_FILE:
        await compressFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.DECOMPRESS_FILE:
        await decompressFile(arg1, arg2);
        showCurrentDirectory();
        break;
      case COMMANDS.EXIT:
        showGoodbyePhrase(USERNAME);
        rl.close();
    }
  });

  rl.on("SIGINT", () => {
    showGoodbyePhrase(USERNAME);
    rl.close();
  });
};
