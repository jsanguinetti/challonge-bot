const reactions = message => {
  let reactionRes = [];
  if (message.text) {
    const lowerCaseMessage = message.text.toLowerCase();
    if (
      message.text.includes("U3FR8M5A7") ||
      lowerCaseMessage.includes("fiamene")
    ) {
      reactionRes.push(
        "femiane2",
        "smiling_femiane",
        "happy_fiamene",
        "fiamante_bandido",
        "femiane_ref",
        "cop",
        "church"
      );
    }
    if (
      message.text.includes("U326T7S66") ||
      lowerCaseMessage.includes("colli") ||
      lowerCaseMessage.includes("collazo")
    ) {
      reactionRes.push(
        "scottie_pippen",
        "happy_halloween",
        "scottie_pippen_anim",
        "sad_collazo"
      );
    }
    if (
      message.text.includes("U41F763DG") ||
      lowerCaseMessage.includes("alfred")
    ) {
      reactionRes.push("happy-alfred", "eltres", "three");
    }
    if (
      message.text.includes("U6345ABTM") ||
      lowerCaseMessage.includes("matu") ||
      lowerCaseMessage.includes("heredia")
    ) {
      reactionRes.push(
        "heredia_sol",
        "heredia_hamburglar",
        "crazy_heredia",
        "heredia_ahhhh",
        "stealthy_heredia"
      );
    }
  }
  return reactionRes;
};

/** @param {import('botbuilder-adapter-slack').SlackBotWorker} bot */
/** @param {import('../features/slack_event').SlackEvent} message */
/** @param {String[]} reactionsToUse */
const react = async (bot, message, reactionsToUse) => {
  reactionsToUse = reactionsToUse || reactions(message);
  const slackClient = bot.api;

  reactionsToUse.reduce(async (previousPromise, nextReaction) => {
    await previousPromise;
    const options = {
      channel: message.channel,
      timestamp: message.incoming_message.id,
      name: nextReaction
    };
    return slackClient.reactions.add(options);
  }, Promise.resolve());
};

module.exports = controller => {
  controller.on("direct_message", async (bot, message) => {
    const reactionsToUse = reactions(message);
    if (reactionsToUse.length > 0) {
      await react(bot, message, reactionsToUse);
    }
  });

  controller.hears(
    message => reactions(message).length > 0,
    ["message"],
    react
  );
};
