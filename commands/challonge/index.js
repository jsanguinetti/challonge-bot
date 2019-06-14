const { errorHandler, unknownCommandHandler } = require("../utils/handlers");
const { isBinaryCommandWithKey } = require("../utils/cmdParser");

const tournaments = require("./tournaments")(errorHandler);
const help = require("./help")(errorHandler);
const matches = require("./matches")(errorHandler);
const {
  rankingFor,
  rankHistoryFor,
  ranking,
  myRankHistory,
  myRanking
} = require("./ranking")(errorHandler);

module.exports = async (bot, message) => {
  if (message.text === "help") {
    await help(bot);
  } else if (message.text === "ranking") {
    await ranking(bot, message);
  } else if (message.text === "my_ranking") {
    await myRanking(bot, message);
  } else if (message.text === "my_rank_history") {
    await myRankHistory(bot, message);
  } else if (isBinaryCommandWithKey("torneos", message.text)) {
    await tournaments(bot, message);
  } else if (isBinaryCommandWithKey("partidos", message.text)) {
    await matches(bot, message);
  } else if (isBinaryCommandWithKey("ranking_for", message.text, false)) {
    await rankingFor(bot, message);
  } else if (isBinaryCommandWithKey("rank_history_for", message.text, false)) {
    await rankHistoryFor(bot, message);
  } else {
    unknownCommandHandler(bot, message);
  }
};
