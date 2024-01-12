const { SlashCommandBuilder } = require("discord.js");
const db = require("../utils/db.js");

const data = new SlashCommandBuilder()
  .setName("suggest")
  .setDescription("Provides url to make a suggestion");

async function run({ interaction }) {
  await interaction.deferReply();
  const githubUrl =
    "https://github.com/luisr96/discord-bot-starhunters/issues/new";
  interaction.editReply(`Click [here](${githubUrl}) to make a suggestion.`);
}

module.exports = { data, run, devOnly: true };
