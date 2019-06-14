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

const getIdFromSecondParameter = async (bot, message, errorHandler) => {
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
    errorHandler(
      bot,
      message,
      new Error(`${slackName} no es un usuario de slack`)
    );
  }
};

module.exports = {
  getIdFromSecondParameter
};
