const reactions = message => {
  if (message.text) {
    if (message.text.toLowerCase().includes("fiamene")) {
      ["femiane2", "smiling_femiane", "happy_fiamene"];
    }
  }
};

/** @param {import('botbuilder-adapter-slack').SlackBotWorker} bot */
/** @param {import('../features/slack_event').SlackEvent} message */
/** @param {String[]} reactionsToUse */
const react = async (bot, message, reactionsToUse) => {
  reactionsToUse = reactionsToUse || reactions(message);
  const slackClient = bot.api;
  await Promise.all(
    reactionsToUse.map(async r => {
      const options = {
        channel: message.channel,
        timestamp: message.incoming_message.id,
        name: r
      };

      /** @link https://api.slack.com/methods/reactions.add */
      return await slackClient.reactions.add(options);
    })
  );
};

module.exports = controller => {
  controller.on("direct_message", async (bot, message) => {
    const reactionsToUse = reactions(message);
    if (!!reactionsToUse) {
      await react(bot, message, reactionsToUse);
    }
  });

  controller.hears(message => !!reactions(message), ["message"], react);
};
