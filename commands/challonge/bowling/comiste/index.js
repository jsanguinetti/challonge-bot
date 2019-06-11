let bowlingStringCursor = 0;
function bowlingString(targetUserId, bowlingUserId, tournamentName) {
  const targetHandle = `<@${targetUserId}>`;
  const bowlingHandle = `<@${bowlingUserId}>`;
  const bowlingStrings = [
    `Miren! ${targetHandle} comió fuerte`,
    `Anónimo: _es increible lo mal que juega ${targetHandle}, mirá con quién perdió_ (Anónimo = ${bowlingHandle})`,
    `Si ${bowlingHandle} no deja de hacer :bowling: voy a tener que reportarlo con las autoridades.\n Y vos ${targetHandle}, por favor dejá de perder.`,
    `Se ve que el ${tournamentName} viene bravo. Marchó ${targetHandle}`,
    `Voy a dejar esto por acá, psss...${targetHandle} te llaman`,
    `Parece que ${bowlingHandle} está de vivo, me pidió que te recuerde esto ${targetHandle}`,
    `Alguien no te quiere ${targetHandle}, mirá lo que te trajo.`,
    `${bowlingHandle} Si seguís haciendo tanto :bowling: te van a echar.\nMe informan por privado que hace poco perdió ${targetHandle}.`,
    `Sos un desastre ${targetHandle}`,
    `Anónimo: _es increible lo mal que juega ${targetHandle}, mirá con quién perdió_`,
    `Cómo te gusta el :bowling: ${bowlingHandle}... Me dicen por la cucaracha que ${targetHandle} perdió`
  ];
  bowlingStringCursor += 1;
  return bowlingStrings[bowlingStringCursor % bowlingStrings.length];
}

let bowlingTargetWarningStringCursor = 0;
function bowlingTargetWarningString(bowlingUserId, tournamentName) {
  const bowlingHandle = `<@${bowlingUserId}>`;
  const bowlingStrings = [
    `Se ve que alguien no te quiere. (alguien = ${bowlingHandle})`,
    `Va bala`,
    `Va bala de ${bowlingHandle}`,
    `Quieren molestarte por tu resultado en ${tournamentName}`,
    `${bowlingHandle} está con ganas de hacerte :bowling:`
  ];
  bowlingTargetWarningStringCursor += 1;
  return bowlingStrings[
    bowlingTargetWarningStringCursor % bowlingStrings.length
  ];
}

const matchesApi = require("../../api").matches;
const { isMatchLost, mapMatch } = require("../../matches/utils");

const ALLOWED_CHANNEL = {
  name: process.env.COMISTE_ALLOWED_CHANNEL_NAME || "",
  id: process.env.COMISTE_ALLOWED_CHANNEL || ""
};

const comiste = errorHandler => {
  const error = () =>
    errorHandler(
      bot,
      message,
      new Error(`${slackName} no es un usuario de slack`)
    );

  const getTargetUsername = message => {
    /** @type {string} */
    const text = message.text;
    // TODO: if no podes descansar a nadie
    // TODO: avisar que va bala al bowlineado
    const [_cmd, slackName] = text.split(" ");
    if (!slackName.startsWith("@")) {
      return;
    }
    return slackName.substring(1);
  };

  const getTargetUserId = async (bot, message) => {
    const targetUserName = getTargetUsername(message);
    if (!targetUserName) return;

    const slackClient = bot.api;

    /** @link https://api.slack.com/methods/users.list */
    /** @type {any[]} */
    const members = (await slackClient.users.list()).members;

    const targetUser = members.find(m => m.name === targetUserName);
    if (targetUser) {
      return targetUser.id;
    } else {
      error();
    }
  };

  return async (bot, message) => {
    try {
      const targetUserId = await getTargetUserId(bot, message);
      if (!targetUserId) return;

      const res = await matchesApi.list(targetUserId);
      const { tournament, matches } = res.data;
      const lostMatch = matches.reverse().find(isMatchLost);
      if (lostMatch) {
        await bot.startPrivateConversation(targetUserId);
        await bot.say(
          bowlingTargetWarningString(targetUserId, tournament.name)
        );

        bot.replyPublic(message, {
          text: bowlingString(targetUserId, message.user, tournament.name),
          attachments: [mapMatch(lostMatch)]
        });
      } else {
        bot.replyPrivate(message, {
          text: `
          <@${targetUserId}> no perdió ningún partido en su último torneo jugado. Aflojá con el :bowling:
          `
        });
      }
    } catch (error) {
      errorHandler(bot, message, error);
    }
  };
};

module.exports = { ALLOWED_CHANNEL, comiste };
