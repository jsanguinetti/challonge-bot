const { unknownCommandHandler } = require("./utils/handlers");
const challongeHandler = require("./challonge");
const challongeLoginHandler = require("./challonge_login");
const challongeBowlingHandler = require("./challonge_bowling");
const challongeDevHandler = require("./challonge_dev");

process.on('unhandledRejection', (error) => {
  let err = error;
  if (!(err instanceof Error)) {
    err = new Error(err);
  }
  console.error(err);
});

module.exports = async (bot, message) => {
  switch (message.command) {
    case "/challonge":
      await challongeHandler(bot, message);
      break;
    case "/challonge_login":
      await challongeLoginHandler(bot, message);
      break;
    case "/challonge_bowling":
      await challongeBowlingHandler(bot, message);
      break;
    case "/challonge_dev":
      await challongeDevHandler(bot, message);
      break;
    default:
      unknownCommandHandler(bot, message);
  }
};
