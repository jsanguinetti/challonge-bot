const tournaments = require("./tournaments")(errorHandler);
const help = require("./help")(errorHandler);
const matches = require("./matches")(errorHandler);
const login = require("./login")(errorHandler);
const bowlingComiste = require("./bowling/comiste").comiste(errorHandler);
const bowlingComisteAllowedChannel = require("./bowling/comiste")
  .ALLOWED_CHANNEL;

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
  bot.replyPrivate(message, {
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
function channelNotAllowedHandler(bot, message, allowedChannelName) {
  bot.httpBody({
    text: `El comando \`${message.command} ${
      message.text
    }\` solo se puede usar en ${allowedChannelName}`
  });
}

function isNumber(string) {
  if (parseInt(string)) {
    return true;
  }
}
function isBinaryCommand(text) {
  const cmdParts = text.split(" ");
  if (cmdParts.length > 0 && cmdParts.length <= 2) {
    if (cmdParts[1]) {
      return true;
    } else {
      return true;
    }
  }
}
function isBinaryCommandWithNumberArg(text) {
  const cmdParts = text.split(" ");
  if (cmdParts.length > 0 && cmdParts.length <= 2) {
    if (cmdParts[1]) {
      return isNumber(cmdParts[1]);
    } else {
      return true;
    }
  }
}

function isBinaryCommandWithKey(key, text, isNumberArg) {
  if (isNumberArg === undefined) {
    isNumberArg = true;
  }
  if (key && text) {
    const isBinaryCommandRes = isNumberArg
      ? isBinaryCommandWithNumberArg(text)
      : isBinaryCommand(text);
    if (isBinaryCommandRes) {
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
    case "/challonge_bowling":
      if (
        bowlingComisteAllowedChannel.id === message.channel_id ||
        message.channel_name === "directmessage"
      )
        if (isBinaryCommandWithKey("comiste", message.text, false)) {
          await bowlingComiste(bot, message);
        } else {
          unknownCommandHandler(bot, message);
        }
      else {
        channelNotAllowedHandler(
          bot,
          message,
          bowlingComisteAllowedChannel.name
        );
      }
      break;
    default:
      unknownCommandHandler(bot, message);
  }
};
