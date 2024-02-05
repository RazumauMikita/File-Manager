import { cwd, chdir } from "process";
import { readdir } from "fs/promises";
import { homedir } from "os";
import { resolve, parse } from "path";

import { showErrorMessage } from "./messages.js";

export const goToHomeDir = () => {
  try {
    chdir(homedir());
  } catch {
    showErrorMessage;
  }
};

export const goUpper = () => {
  try {
    const { root } = parse(cwd());
    const [, folders] = cwd().split(":");
    const currentDir = folders.split("\\");

    if (cwd() === root) {
      return;
    } else {
      currentDir.pop();
      if (currentDir.length === 1) {
        chdir("\\");
      } else {
        chdir(currentDir.join("\\"));
      }
    }
  } catch {
    showErrorMessage();
  }
};

export const goToDedicated = (path) => {
  try {
    const { root, dir } = parse(cwd());

    const { root: aimRoot } = parse(resolve(path));

    if (root !== aimRoot) {
      chdir(resolve(path + "/"));
      return;
    }
    chdir(path);
  } catch {
    showErrorMessage();
  }
};

export const printListOfFiles = async () => {
  try {
    const files = await readdir(cwd(), { withFileTypes: true });
    for (let file of files) {
      file.type = file.isFile() ? "file" : "directory";
    }
    files
      .sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      .sort((a, b) => {
        if (a.type === "directory" && b.type === "file") {
          return -1;
        }
        if (a.type === "file" && b.type === "directory") {
          return 1;
        }
        return 0;
      });
    console.table(files, ["name", "type"]);
  } catch {
    showErrorMessage();
  }
};
