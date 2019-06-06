const challonge = require("../commands/challonge");

module.exports = function(controller) {
  controller.on("slash_command", challonge);

  controller.on("direct_message", async (bot, message) => {
    if (message.text && message.text.toLowerCase() === "ping") {
      await bot.reply(message, "PONG :table_tennis_paddle_and_ball:");
    }
  });
};
