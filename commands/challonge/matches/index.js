const matchesApi = require("../api").matches;
const { mapMatch } = require("./utils");

// message: "partidos 2"
module.exports = errorHandler => async (bot, message) => {
  try {
    const [cmd, tournamentNumber] = message.text.split(" ");
    const res = await matchesApi.list(message.user, tournamentNumber);
    const { matches, tournament } = res.data;
    bot.httpBody({
      text: `Lista de partidos para ${
        tournament.name
      } :table_tennis_paddle_and_ball:`,
      attachments: matches.map(mapMatch)
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
