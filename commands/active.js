const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const activeStarsEmbed = require("../embeds/active-stars-embed.js");

const data = new SlashCommandBuilder()
  .setName("active")
  .setDescription("Get a list of released stars");

async function run({ interaction }) {
  logger.info("/active");

  // Defer the reply to ensure enough time to process the command
  await interaction.deferReply();

  const starsEmbed = await activeStarsEmbed();
  interaction.editReply(starsEmbed);

}
module.exports = { data, run };
