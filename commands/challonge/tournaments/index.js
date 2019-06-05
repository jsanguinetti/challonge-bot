const { tournaments } = require("../api");

module.exports = errorHandler => async (bot, message) => {
  try {
    const res = await tournaments.list();
    bot.httpBody({
      text: "Lista de torneos",
      attachments: [
        {
          color: "#2FA44F",
          text: res.data
            .map(t => `${t.id}. ${t.name} - ${t.gameName}`)
            .join("\n")
        }
      ]
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
