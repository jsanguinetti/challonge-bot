const tournaments = require("./tournaments")(errorHandler);

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
    text: `Command ${message} is not recognized`
  });
}

module.exports = async (bot, message) => {
  switch (message.text) {
    case "tournaments":
      await tournaments(bot, message);
      break;
    default:
      unknownCommandHandler(bot, message);
  }
};
