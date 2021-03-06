const challonge = require("../commands");
const reactions = require("../reactions");

const pong = async (bot, message) => {
  await bot.reply(message, "PONG :table_tennis_paddle_and_ball:");
};

module.exports = function(controller) {
  controller.on("slash_command", challonge);

  controller.on("direct_message", async (bot, message) => {
    if (message.text && message.text.toLowerCase() === "ping") {
      await pong(bot, message);
    }
  });

  controller.hears(
    async message => message.text && message.text.toLowerCase() === "ping",
    ["message"],
    pong
  );

  reactions(controller);
};
