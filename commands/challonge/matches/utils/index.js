const isWinner = (user, match) => {
  return user.id === match.winner.id;
};

const isPending = m => {
  return m.state === "open" || m.state === "pending";
};

const isMatchLost = match => {
  return isWinner(match.adversary, match);
};

module.exports = {
  isWinner,
  isPending,
  isMatchLost
};
