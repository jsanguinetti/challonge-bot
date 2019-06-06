const { login } = require("../api").login;

module.exports = errorHandler => async (bot, message) => {
  try {
    const challongeUsername = message.text;
    const res = await login(message.user, challongeUsername);
    bot.httpBody({
      text: "EEEXITO :éxito:"
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
