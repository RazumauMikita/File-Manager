import { argv, stdout } from "node:process";

export const getUsername = () => {
  const args = argv.slice(2);
  const username = args
    .map((el) => {
      if (el.startsWith("--username")) {
        return el.split("=")[1];
      }
    })
    .toString();

  const formatterUsername = username
    ? username.slice(0, 1).toUpperCase() + username.slice(1)
    : "User";

  return formatterUsername;
};

export const showGreetingPhrase = (username) => {
  stdout.write(`Welcome to the File Manager, ${username}!\n`);
};

export const showGoodbyePhrase = (username) =>
  stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);

export const showCurrentDirectory = (workingDirectory) => {
  stdout.write(`You are currently in ${workingDirectory}`);
};
