const { login } = require("../api").login;

module.exports = errorHandler => async (bot, message) => {
  try {
    const [challongeUsername, tournamentNumber] = message.text.split(" ");
    const res = await login(message.user, challongeUsername, tournamentNumber);
    bot.httpBody({
      text: "EEEXITO :éxito:"
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
