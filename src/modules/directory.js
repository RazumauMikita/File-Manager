import { stdout, cwd, chdir } from "node:process";
import { readdir } from "node:fs/promises";
import { homedir } from "node:os";

export const goToHomeDir = () => {
  chdir(homedir());
};

export const goUpper = () => {
  const [, folders] = cwd().split(":");
  const currentDir = folders.split("\\");
  const isRootDir = currentDir.length === 1 ? true : false;
  if (isRootDir) {
    return;
  } else {
    currentDir.pop();
    if (currentDir.length === 1) {
      chdir(currentDir.toString() + "\\");
    } else {
      chdir(currentDir.join("\\"));
    }
  }
};

export const goToDedicated = (path) => {
  try {
    chdir(path);
  } catch {
    stdout.write(`Error: Incorrect path!\n${path}\n`);
  }
};

export const printListOfFiles = async () => {
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
};
