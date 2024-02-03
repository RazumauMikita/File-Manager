import { stdout, cwd } from "process";

export const showGreetingPhrase = (username) => {
  stdout.write(`> Welcome to the File Manager, ${username}!\n`);
};

export const showGoodbyePhrase = (username) =>
  stdout.write(`> Thank you for using File Manager, ${username}, goodbye!\n`);

export const showCurrentDirectory = () => {
  const currentDirectory = cwd();
  stdout.write(`> You are currently in ${currentDirectory}\n`);
};

export const showErrorMessage = () => {
  stdout.write(`> Operation fail.\n`);
};
