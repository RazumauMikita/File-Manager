import { argv, stdout, cwd, chdir } from "node:process";

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
