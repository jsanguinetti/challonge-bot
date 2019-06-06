//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the challonge-bot bot.

// Import Botkit's core features
const { Botkit } = require("botkit");
const { BotkitCMSHelper } = require("botkit-plugin-cms");
const path = require("path");

// Import a platform-specific adapter for slack.

const {
  SlackAdapter,
  SlackMessageTypeMiddleware,
  SlackEventMiddleware
} = require("botbuilder-adapter-slack");

// Load process.env values from .env file
require("dotenv").config();

const initializeMongoDb = async () => {
  if (process.env.MONGODB_URI) {
    const MongoClient = require("mongodb").MongoClient;

    // Connection url
    const url = process.env.MONGODB_URI;
    // Connect using MongoClient
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    return client.db();
  }
};

const init = async () => {
  const database = await initializeMongoDb();

  const getTokenForTeam = async teamId => {
    const team = await database.collection("teams").findOne({
      teamId: teamId
    });
    if (team) {
      return team.botAccessToken;
    } else {
      console.error("Team not found: ", teamId);
    }
  };

  const getBotUserByTeam = async teamId => {
    const team = await database.collection("teams").findOne({
      teamId: teamId
    });
    if (team) {
      return team.botUserId;
    } else {
      console.error("Team not found: ", teamId);
    }
  };

  const adapter = new SlackAdapter({
    // parameters used to secure webhook endpoint
    verificationToken: process.env.verificationToken,
    clientSigningSecret: process.env.clientSigningSecret,

    // credentials used to set up oauth for multi-team apps
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scopes: [
      "bot",
      "chat:write:bot",
      "incoming-webhook",
      "commands",
      "links:read"
    ],
    redirectUri: process.env.redirectUri,

    // functions required for retrieving team-specific info
    // for use in multi-team apps
    getTokenForTeam: getTokenForTeam,
    getBotUserByTeam: getBotUserByTeam
  });

  // Use SlackEventMiddleware to emit events that match their original Slack event types.
  adapter.use(new SlackEventMiddleware());

  // Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
  adapter.use(new SlackMessageTypeMiddleware());

  const controller = new Botkit({
    debug: true,
    webhook_uri: "/api/messages",
    adapter: adapter
  });

  controller.addPluginExtension("database", database);

  if (process.env.cms_uri) {
    controller.usePlugin(
      new BotkitCMSHelper({
        cms_uri: process.env.cms_uri,
        token: process.env.cms_token
      })
    );
  }

  // Once the bot has booted up its internal services, you can use them to do stuff.
  controller.ready(() => {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + "/features");

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
      controller.on("message,direct_message", async (bot, message) => {
        let results = false;
        results = await controller.plugins.cms.testTrigger(bot, message);

        if (results !== false) {
          // do not continue middleware!
          return false;
        }
      });
    }
  });

  controller.webserver.get("/install", (req, res) => {
    // getInstallLink points to slack's oauth endpoint and includes clientId and scopes
    res.redirect(controller.adapter.getInstallLink());
  });

  controller.webserver.get("/install/auth", async (req, res) => {
    try {
      const results = await controller.adapter.validateOauthCode(
        req.query.code
      );

      console.log("FULL OAUTH DETAILS", results);

      /** @type {Db} */
      const database = controller.plugins.database;
      await database.collection("teams").updateOne(
        {
          teamId: results.team_id
        },
        {
          $set: {
            botAccessToken: results.bot.bot_access_token,
            botUserId: results.bot.bot_user_id
          }
        },
        {
          upsert: true
        }
      );

      res.json("Success! Bot installed.");
    } catch (err) {
      console.error("OAUTH ERROR:", err);
      res.status(401);
      res.send(err.message);
    }
  });
};

init()
  .then(console.log)
  .catch(console.log);
