const messagesToReact = async message => {
  if (message.text) {
    return message.text.toLowerCase().includes("supercalifragilistico");
  }
  return false;
};

/** @param {import('botbuilder-adapter-slack').SlackBotWorker} bot */
/** @param {import('../features/slack_event').SlackEvent} message */
const react = async (bot, message) => {
  const slackClient = bot.api;
  const options = {
    channel: message.channel,
    timestamp: message.incoming_message.id,
    name: "thumbsup"
  };

  /** @link https://api.slack.com/methods/reactions.add */
  await slackClient.reactions.add(options);
};

module.exports = controller => {
  controller.hears(messagesToReact, ["message"], react);
};
