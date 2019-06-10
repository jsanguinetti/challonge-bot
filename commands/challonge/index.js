/**
 * axios object
 * @external axios
 * @see {@link axios}
 */

const axios = require("axios");
const tournaments = require("./tournaments")(errorHandler);
const help = require("./help")(errorHandler);
const matches = require("./matches")(errorHandler);
const login = require("./login")(errorHandler);

function errorHandler(bot, message, error) {
  let errorMessage = null;
  if (error.isAxiosError) {
    /** @type {import('axios').AxiosError} */
    const axiosError = error;
    const res = axiosError.response;
    if (res && res.data && res.data.message) {
      errorMessage = res.data.message;
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = error.message;
  }
  bot.replyPrivate({
    text: `Your command "${message.text}" failed`,
    attachments: [
      {
        text: errorMessage,
        color: "#FF2400",
        title: "Error"
      }
    ]
  });
}

function unknownCommandHandler(bot, message) {
  bot.httpBody({
    text: `Command ${message.text} is not recognized`
  });
}

/**
 * @param { string } key
 * @param { string } text
 * @return {boolean} ret
 * */

function isBinaryCommand(text) {
  const cmdParts = text.split(" ");
  if (cmdParts.length > 0 && cmdParts.length <= 2) {
    if (cmdParts[1]) {
      if (parseInt(cmdParts[1])) {
        return true;
      }
    } else {
      return true;
    }
  }
}
function isBinaryCommandWithKey(key, text) {
  if (key && text) {
    if (isBinaryCommand(text)) {
      const cmdParts = text.split(" ");
      if (cmdParts[0] == key) {
        return true;
      }
    }
  }
  return false;
}

module.exports = async (bot, message) => {
  switch (message.command) {
    case "/challonge":
      if (message.text === "help") {
        await help(bot);
      } else if (isBinaryCommandWithKey("torneos", message.text)) {
        await tournaments(bot, message);
      } else if (isBinaryCommandWithKey("partidos", message.text)) {
        await matches(bot, message);
      } else {
        unknownCommandHandler(bot, message);
      }
      break;
    case "/challonge_login":
      if (isBinaryCommand(message.text)) {
        await login(bot, message);
      } else {
        unknownCommandHandler(bot, message);
      }
      break;
    default:
      unknownCommandHandler(bot, message);
  }
};
