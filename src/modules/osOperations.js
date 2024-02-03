import { EOL, cpus, homedir, userInfo, arch } from "os";
import { stdout } from "process";

export const showEOL = () => {
  stdout.write(JSON.stringify(EOL) + "\n");
};
export const showCpu = () => {
  const amountCPU = cpus().length;
  stdout.write(`Amount of CPUs: ${amountCPU}\n`);
  console.table(cpus(), ["model"]);
};
export const showHomeDir = () => {
  stdout.write(homedir() + "\n");
};
export const showUserName = () => {
  const username = userInfo().username;
  stdout.write(username + "\n");
};
export const showArchitecture = () => {
  stdout.write(arch() + "\n");
};
