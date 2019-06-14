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

const matchesApi = require("../../utils/api").matches;
const { isMatchLost, mapMatch } = require("../../challonge/matches/utils");

const ALLOWED_CHANNEL = {
  name: process.env.COMISTE_ALLOWED_CHANNEL_NAME || "",
  id: process.env.COMISTE_ALLOWED_CHANNEL || ""
};

const { getIdFromSecondParameter } = require("../../utils").usernames;

const comiste = errorHandler => {
  return async (bot, message) => {
    try {
      const targetUserId = await getIdFromSecondParameter(
        bot,
        message,
        errorHandler
      );
      if (!targetUserId) return;

      const res = await matchesApi.list(targetUserId);
      const { tournament, matches } = res.data;
      const lostMatch = matches.reverse().find(isMatchLost);
      if (lostMatch) {
        if (message.channel_id === ALLOWED_CHANNEL.id) {
          await bot.startPrivateConversation(targetUserId);
          await bot.say(
            bowlingTargetWarningString(targetUserId, tournament.name)
          );
        }

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
