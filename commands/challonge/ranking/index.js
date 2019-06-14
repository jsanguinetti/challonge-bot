const { getIdFromSecondParameter } = require("../../utils/usernames");
const rankingApi = require("../../utils/api").ranking;

module.exports = errorHandler => {
  const ranking = require("./currentRanking.js")(errorHandler);
  return {
    rankingFor: async (bot, message) => {
      try {
        const userId = await getIdFromSecondParameter(
          bot,
          message,
          errorHandler
        );
        const res = await rankingApi.currentForMe(userId);
        const currentRanking = res.data;
        bot.replyPrivate(message, {
          text: "```\n" + JSON.stringify(currentRanking) + "\n```"
        });
      } catch (error) {
        errorHandler(bot, message, error);
      }
    },
    rankHistoryFor: async (bot, message) => {
      try {
        const userId = await getIdFromSecondParameter(
          bot,
          message,
          errorHandler
        );
        const res = await rankingApi.historyForMe(userId);
        const currentRanking = res.data;
        bot.replyPrivate(message, {
          text: "```\n" + JSON.stringify(currentRanking) + "\n```"
        });
      } catch (error) {
        errorHandler(bot, message, error);
      }
    },
    myRankHistory: async (bot, message) => {
      try {
        const res = await rankingApi.historyForMe(message.user);
        const currentRanking = res.data;
        bot.replyPrivate(message, {
          text: "```\n" + JSON.stringify(currentRanking) + "\n```"
        });
      } catch (error) {
        errorHandler(bot, message, error);
      }
    },
    ranking,
    myRanking: async (bot, message) => {
      try {
        const res = await rankingApi.historyForMe(message.user);
        const currentRanking = res.data;
        bot.replyPrivate(message, {
          text: "```\n" + JSON.stringify(currentRanking) + "\n```"
        });
      } catch (error) {
        errorHandler(bot, message, error);
      }
    }
  };
};
