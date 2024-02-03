import { stdout, cwd } from "node:process";

export const showGreetingPhrase = (username) => {
  stdout.write(`Welcome to the File Manager, ${username}!\n`);
};

export const showGoodbyePhrase = (username) =>
  stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);

export const showCurrentDirectory = () => {
  stdout.write(`You are currently in ${cwd()}\n`);
};

export const showErrorMessage = () => {
  stdout.write(`Operation fail.\n`);
};
