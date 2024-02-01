import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { stdout } from "node:process";

export const showEOL = () => {
  stdout.write(EOL);
};
export const showCpu = () => {
  console.table(cpus(), ["model"]);
};
export const showHomeDir = () => {
  stdout.write(homedir() + "n\\");
};
export const showUserName = () => {
  stdout.write(userInfo().username + "n\\");
};
export const showArchitecture = () => {
  stdout.write(arch() + "n\\");
};
