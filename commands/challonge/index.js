const tournaments = require("./tournaments")(errorHandler);
const matches = require("./matches")(errorHandler);
const login = require("./login")(errorHandler);

function errorHandler(bot, message, error) {
  bot.replyPrivate(message, {
    text: `Your command "${message.text}" failed`,
    attachments: [
      {
        text: error.message,
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

function isBinaryCommand(key, text) {
  if (key && text) {
    const cmdParts = text.split(" ");
    if (cmdParts.length > 0 && cmdParts.length <= 2) {
      if (cmdParts[0] == key) {
        if (cmdParts[1]) {
          if (parseInt(cmdParts[1])) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
  }
  return false;
}

module.exports = async (bot, message) => {
  switch (message.command) {
    case "/challonge":
      if (isBinaryCommand("torneos", message.text)) {
        await tournaments(bot, message);
      } else if (isBinaryCommand("partidos", message.text)) {
        await matches(bot, message);
      } else {
        unknownCommandHandler(bot, message);
      }
    case "/challonge_login":
      await login(bot, message);
      break;
    default:
      unknownCommandHandler(bot, message);
  }
};
