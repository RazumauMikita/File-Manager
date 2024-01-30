import {
  getUsername,
  showGreetingPhrase,
  showGoodbyePhrase,
  showCurrentDirectory,
} from "./modules/greeting.js";
import { stdout, stdin, exit } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = getUsername();

showGreetingPhrase(USERNAME);

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
