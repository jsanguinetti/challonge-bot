const data = [
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U3FR8M5A7" ||
      message.text.includes("U3FR8M5A7") ||
      lowerCaseMessage.includes("fiamene"),
    reactions: [
      "femiane2",
      "smiling_femiane",
      "happy_fiamene",
      "fiamante_bandido",
      "femiane_ref",
      "cop",
      "church"
    ]
  },
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U326T7S66" ||
      message.text.includes("U326T7S66") ||
      lowerCaseMessage.includes("colli") ||
      lowerCaseMessage.includes("collazo"),
    reactions: [
      "scottie_pippen",
      "happy_halloween",
      "scottie_pippen_anim",
      "sad_collazo"
    ]
  },
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U41F763DG" ||
      message.text.includes("U41F763DG") ||
      lowerCaseMessage.includes("alfred"),
    reactions: ["happy-alfred", "eltres", "three"]
  },
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U6345ABTM" ||
      message.text.includes("U6345ABTM") ||
      lowerCaseMessage.includes("matu") ||
      lowerCaseMessage.includes("heredia"),
    reactions: [
      "heredia_sol",
      "heredia_hamburglar",
      "crazy_heredia",
      "heredia_ahhhh",
      "stealthy_heredia"
    ]
  },
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U2PHJUT7B" ||
      message.text.includes("U2PHJUT7B") ||
      lowerCaseMessage.includes("javier"),
    reactions: ["javier"]
  },
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U2PHG9BKQ" ||
      message.text.includes("U2PHG9BKQ") ||
      lowerCaseMessage.includes("varangot"),
    reactions: ["cotorra_loca", "cotorra_loca_fly", "goat"]
  },
  {
    conditions: (message, lowerCaseMessage) =>
      message.user === "U2PHWMD50" ||
      message.text.includes("U2PHWMD50") ||
      lowerCaseMessage.includes("torres") ||
      lowerCaseMessage.includes("nicky") ||
      lowerCaseMessage.includes("nico torres"),
    reactions: ["torres_samurai", "evil_torres", "torres_time", "torresvapea"]
  },
  {
    conditions: message =>
      message.user === "U7S2FUJ2G" || message.text.includes("U7S2FUJ2G"),
    reactions: ["nacho", "lorenzo", "nacho_lorenzo", "nacho_abba"]
  }
];
const shouldReact = message => {
  if (message.text) {
    const lowerCaseMessage = message.text.toLowerCase();
    return data.find(d => d.conditions(message, lowerCaseMessage));
  }
};

const reactions = message => {
  if (message.text) {
    const lowerCaseMessage = message.text.toLowerCase();
    return data
      .map(d => {
        if (d.conditions(message, lowerCaseMessage)) {
          return d.reactions;
        } else {
          return [];
        }
      })
      .reduce((result, reactionArray) => {
        result.push(...reactionArray);
        return result;
      }, []);
  }
};

/** @param {import('botbuilder-adapter-slack').SlackBotWorker} bot */
/** @param {import('../features/slack_event').SlackEvent} message */
/** @param {String[]} reactionsToUse */
const react = async (bot, message, reactionsToUse) => {
  if (Math.random() > 0.9) {
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
  }
};

module.exports = controller => {
  controller.on("direct_message", async (bot, message) => {
    const reactionsToUse = reactions(message);
    if (reactionsToUse.length > 0) {
      await react(bot, message, reactionsToUse);
    }
  });

  controller.hears(shouldReact, ["message"], react);
};
