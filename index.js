const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const { CommandKit } = require("commandkit");
const fs = require("fs");
const { join } = require("path");
const config = require("./config.json");
require("dotenv").config();
const path = require("node:path");

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
  devGuildIds: ["1167939035419902033"],
  devUserIds: ["220648788392411136"],
  devRoleIds: [],
  skipBuiltInValidations: true,
  bulkRegister: true,
});

client.login(process.env.TOKEN);
