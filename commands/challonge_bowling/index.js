const {
  unknownCommandHandler,
  channelNotAllowedHandler,
  errorHandler
} = require("../utils/handlers");

const { isBinaryCommandWithKey } = require("../utils/cmdParser");

const bowlingHelp = require("./help")(errorHandler);

const bowlingComisteAllowedChannel = require("./comiste").ALLOWED_CHANNEL;
const bowlingComiste = require("./comiste").comiste(errorHandler);

module.exports = async (bot, message) => {
  if (message.text === "help") {
    await bowlingHelp(bot);
  } else if (
    bowlingComisteAllowedChannel.id === message.channel_id ||
    message.channel_name === "directmessage"
  ) {
    if (isBinaryCommandWithKey("comiste", message.text, false)) {
      await bowlingComiste(bot, message);
    } else {
      unknownCommandHandler(bot, message);
    }
  } else {
    channelNotAllowedHandler(bot, message, bowlingComisteAllowedChannel.name);
  }
};
