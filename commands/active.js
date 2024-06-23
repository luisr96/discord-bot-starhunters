const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const totalWorldList = require("../data/total-worlds.json");
const activeStarsEmbed = require("../utils/active-stars-embed.js");
const db = require("../utils/db.js");
const { format, formatDistanceToNow, parseISO } = require("date-fns");

const data = new SlashCommandBuilder()
  .setName("active")
  .setDescription("Get a list of released stars");

async function run({ c, client, interaction }) {
  logger.info("/active");

  // Defer the reply to ensure enough time to process the command
  await interaction.deferReply();

  const starsEmbed = await activeStarsEmbed();
  interaction.editReply(starsEmbed);

}
module.exports = { data, run };
