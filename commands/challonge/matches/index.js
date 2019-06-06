const { matches } = require("../api");
const { isMatchLost, isPending } = require("./utils");

const LOST_COLOR = "#db360d";
const WON_COLOR = "#2FA44F";
const PENDING_COLOR = "#56504e";

function color(m) {
  if (isPending(m)) {
    return PENDING_COLOR;
  } else {
    if (isMatchLost(m)) {
      return LOST_COLOR;
    } else {
      return WON_COLOR;
    }
  }
}

function userDetail(user) {
  const { externalId, challongeUsername } = user;
  let detail = "";
  if (externalId) {
    detail = `<@${externalId}> (${challongeUsername})`;
  } else {
    detail = `${challongeUsername}`;
  }
  return detail;
}

module.exports = errorHandler => async (bot, message) => {
  try {
    const res = await matches.list(message.user);
    bot.httpBody({
      text: "Lista de partidos",
      attachments: res.data.map(m => {
        return {
          color: color(m),
          text:
            `*Llave ${m.matchNumber} ${isPending(m) ? "[PENDIENTE]" : ""}*\n` +
            `_Rival:_ ${userDetail(m.adversary)}\n` +
            `_Resultado:_ ${m.score} ${
              isMatchLost(m) ? ":cry:" : ":sunglasses:"
            }`
        };
      })
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
