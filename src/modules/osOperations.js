import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { stdout } from "node:process";

export const showEOL = () => {
  stdout.write(EOL);
};
export const showCpu = () => {
  const amountCPU = cpus().length;
  stdout.write(`Amount of CPUs: ${amountCPU}\n`);
  console.table(cpus(), ["model"]);
};
export const showHomeDir = () => {
  stdout.write(homedir());
  showEOL();
};
export const showUserName = () => {
  const username = userInfo().username;
  stdout.write(username);
  showEOL();
};
export const showArchitecture = () => {
  stdout.write(arch());
  showEOL();
};
