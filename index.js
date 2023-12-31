const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const { CommandKit } = require("commandkit");
const config = require("./config.json");
require("dotenv").config();
const express = require("express");
const path = require("node:path");
const { connectToMongoDB } = require("./utils/db.js");
const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  devGuildIds: ["1180586373737107526"],
  devUserIds: ["220648788392411136"],
  devRoleIds: [],
  skipBuiltInValidations: true,
  bulkRegister: true,
});

// Google Cloud Run requires a health check endpoint
const app = express();
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () => {
  console.log(`Express server is running on port 3000`);
});

client.once("ready", () => {
  client.user.setPresence({
    activities: [{ name: `stars! | /help`, type: ActivityType.Watching }],
  });
  logger.info("Bot is online");
});

(async () => {
  try {
    await connectToMongoDB();
    console.log("MongoDB connection established");
    client.login(process.env.TOKEN);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
