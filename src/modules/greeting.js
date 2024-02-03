import { argv } from "node:process";
import { showErrorMessage } from "./messages.js";

export const getUsername = () => {
  try {
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
  } catch {
    showErrorMessage();
  }
};
