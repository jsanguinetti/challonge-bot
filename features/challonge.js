const challonge = require("../commands/challonge");

module.exports = function(controller) {
  controller.on("slash_command", challonge);
};
