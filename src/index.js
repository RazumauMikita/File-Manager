import { getUsername } from "./modules/getUserName.js";
import {
  showGreetingPhrase,
  showCurrentDirectory,
} from "./modules/messages.js";
import { goToHomeDir } from "./modules/directoryOperations.js";
import { commandListener } from "./modules/commandHandle.js";

const startFileManager = () => {
  const USERNAME = getUsername();

  showGreetingPhrase(USERNAME);
  goToHomeDir();
  showCurrentDirectory();
  commandListener();
};

startFileManager();
