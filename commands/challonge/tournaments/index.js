const { tournaments } = require("../api");

function tournamentMapper(t) {
  const icon =
    t.gameName === "Table Tennis" ? ":table_tennis_paddle_and_ball:" : "";
  return `${t.id}. ${t.name} - ${t.gameName} ${icon}`;
}

module.exports = errorHandler => async (bot, message) => {
  try {
    const res = await tournaments.list();
    bot.httpBody({
      text: "Lista de torneos",
      attachments: [
        {
          color: "#2FA44F",
          text: res.data.map(tournamentMapper).join("\n")
        }
      ]
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
