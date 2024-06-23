const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { isAuthorized } = require("../utils/is-authorized.js");
const backupStarsEmbed = require("../embeds/backup-stars-embed.js");

const data = new SlashCommandBuilder()
  .setName("backups")
  .setDescription("Get a list of backup stars");

async function run({ interaction }) {
  logger.info("/backups");

  const isAuth = await isAuthorized(interaction, ["Ranked"]);
  if (!isAuth) {
    interaction.editReply("Backups is a Ranked-only command");
    return;
  }

  // Defer the reply to ensure enough time to process the command
  await interaction.deferReply({ ephemeral: true });

  const starsEmbed = await backupStarsEmbed();
  interaction.editReply(starsEmbed);

}
module.exports = { data, run };
