const { matches } = require("../api");

module.exports = errorHandler => async (bot, message) => {
  try {
    const res = await matches.list(message.user);
    bot.httpBody({
      text: "Lista de partidos",
      attachments: res.data.map((m, i) => {
        const { challongeUsername, externalUsername, externalId } = m.adversary;
        return {
          color: "#2FA44F",
          text: `
            Partido ${i + 1}.
            Rival: @${externalId} (${challongeUsername})
            <@${externalId}>
          `
        };
      })
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
