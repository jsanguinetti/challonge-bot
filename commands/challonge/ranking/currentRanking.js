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
  const table = new AsciiTable(
    `Ranking S${currentRanking[0].rankingWeekNumber}`
  );
  table.setBorder(" ", "-", ".");
  table.setHeading(
    "Pos",
    "Nombre",
    `Pts Def S${currentRanking[0].rankingWeekNumber}`,
    "Pts",
    "Pds",
    "Sets",
    "Pos+-",
    AsciiTable.alignCenter("@", 20)
  );
  currentRanking.forEach((rankingEntry, index) => {
    if (index === 16) {
      table.addRow(
        "-----",
        "-----------------",
        "------------",
        "------",
        "-----",
        "------",
        "-------",
        "----------------------"
      );
    }
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
