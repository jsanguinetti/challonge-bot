const { errorHandler, unknownCommandHandler } = require("../utils/handlers");
const { isBinaryCommandWithKey } = require("../utils/cmdParser");

const tournaments = require("./tournaments")(errorHandler);
const help = require("./help")(errorHandler);
const matches = require("./matches")(errorHandler);

module.exports = async (bot, message) => {
  if (message.text === "help") {
    await help(bot);
  } else if (isBinaryCommandWithKey("torneos", message.text)) {
    await tournaments(bot, message);
  } else if (isBinaryCommandWithKey("partidos", message.text)) {
    await matches(bot, message);
  } else {
    unknownCommandHandler(bot, message);
  }
};
