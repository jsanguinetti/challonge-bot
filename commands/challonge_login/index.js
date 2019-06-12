const { unknownCommandHandler, errorHandler } = require("../utils/handlers");
const { isBinaryCommandWithNumberArg } = require("../utils/cmdParser");
const login = require("./login")(errorHandler);

module.exports = async (bot, message) => {
  if (isBinaryCommandWithNumberArg(message.text)) {
    await login(bot, message);
  } else {
    unknownCommandHandler(bot, message);
  }
};
