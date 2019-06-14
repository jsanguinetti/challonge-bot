const AsciiTable = require("ascii-table");
const rankingApi = require("../../utils/api").ranking;

/** @param { import('../../../../challonge/src/users/user.interface').IUser} user */
function userNombre(user) {
  if (user.externalId) {
    return `<@${user.externalId}>`;
  } else {
    return "N/A";
  }
}

/** @param { import('../../../../challonge/src/ranking/ranking.interface').IRankingEntry[]} currentRanking */
function usingAsciiTable(currentRanking) {
  const table = new AsciiTable("Ranking");
  table.setBorder(" ", "-", ".");
  table.setHeading(
    "Pos",
    "Nombre",
    `S${currentRanking[0].rankingWeekNumber}`,
    "Pts",
    "Pds",
    "Sets",
    "Rank +-",
    AsciiTable.alignCenter("@", 20)
  );
  currentRanking.forEach(rankingEntry => {
    table.addRow(
      rankingEntry.position,
      rankingEntry.user.challongeUsername,
      rankingEntry.points_to_defend,
      rankingEntry.points,
      rankingEntry.wonVsLostMatches,
      rankingEntry.wonVsLostSets,
      rankingEntry.rankDelta,
      AsciiTable.alignCenter(userNombre(rankingEntry.user), 20)
    );
  });
  return table.toString();
}

module.exports = errorHandler => async (bot, message) => {
  try {
    const res = await rankingApi.current();
    const currentRanking = res.data;
    const table = usingAsciiTable(currentRanking);
    bot.replyPrivate(message, {
      text: "```" + table + "```"
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
