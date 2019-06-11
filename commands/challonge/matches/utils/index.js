const isWinner = (user, match) => {
  return user.id === match.winner.id;
};

const isPending = match => {
  return match.state === "open" || match.state === "pending";
};

const isMatchLost = match => {
  return !isPending(match) && isWinner(match.adversary, match);
};

const LOST_COLOR = "#db360d";
const WON_COLOR = "#2FA44F";
const PENDING_COLOR = "#56504e";
function color(match) {
  if (isPending(match)) {
    return PENDING_COLOR;
  } else {
    if (isMatchLost(match)) {
      return LOST_COLOR;
    } else {
      return WON_COLOR;
    }
  }
}

function userDetail(user) {
  if (user) {
    const { externalId, challongeUsername } = user;
    let detail = "";
    if (externalId) {
      detail = `<@${externalId}> (${challongeUsername})`;
    } else {
      detail = `${challongeUsername}`;
    }
    return detail;
  } else {
    return "Todavía no se sabe";
  }
}

function mapMatch(match) {
  return {
    color: color(match),
    text:
      `*Llave ${match.matchNumber} ${
        isPending(match) ? "[PENDIENTE]" : ""
      }*\n` +
      `_Rival:_ ${userDetail(match.adversary)}\n` +
      (isPending(match)
        ? ""
        : `_Resultado:_ ${match.score} ${
            isMatchLost(match) ? ":cry:" : ":sunglasses:"
          }`)
  };
}

module.exports = {
  isMatchLost,
  mapMatch
};
