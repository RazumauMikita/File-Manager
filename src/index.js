import { stdin, exit } from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  getUsername,
  showGreetingPhrase,
  showGoodbyePhrase,
  showCurrentDirectory,
} from "./modules/greeting.js";

import { goToDedicated, goUpper } from "./modules/directory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = getUsername();

showGreetingPhrase(USERNAME);
showCurrentDirectory();

stdin.on("data", (data) => {
  const dataString = data.toString().trim();
  if (dataString === ".exit") {
    showGoodbyePhrase(USERNAME);
    exit();
  }
});

process.on("SIGINT", () => {
  showGoodbyePhrase(USERNAME);
  exit();
});

stdin.on("data", (data) => {
  const dataString = data.toString().trim();
  const [command, arg1, arg2] = dataString
    .split(" ")
    .filter((el) => el !== "")
    .map((el) => el.trim());

  if (command === "up") {
    goUpper();
    showCurrentDirectory();
  }
  if (command === "cd") {
    goToDedicated(arg1);
    showCurrentDirectory();
  }
});
