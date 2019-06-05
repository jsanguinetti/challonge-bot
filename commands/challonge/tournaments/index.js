const { tournaments } = require("../api");

module.exports = errorHandler => async (bot, message) => {
  try {
    const res = await tournaments.list();
    bot.httpBody({
      text: JSON.stringify(res.data)
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
