const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const locations = require("../data/locations.json");
const db = require("../utils/db.js");
const { format, formatDistanceToNow, parseISO } = require("date-fns");

const data = new SlashCommandBuilder()
  .setName("backups")
  .setDescription("Get a list of backup stars");

async function run({ interaction }) {
  try {
    const starsCollection = db.getStarsCollection();

    // Defer the reply to ensure enough time to process the command
    await interaction.deferReply();

    const backupStars = await starsCollection
      .find({ calledAt: null })
      .sort({ foundAt: 1 })
      .toArray();

    if (backupStars.length > 0) {
      const embed = new EmbedBuilder().setTitle("Backup Stars");

      backupStars.forEach((star, index) => {
        const foundDate = new Date(star.foundAt);

        embed.addFields({
          name: `🔒 ${star.location}`,
          value: `World hidden until called
                  Tier: ${star.tier}
                  Found ${formatDistanceToNow(foundDate, {
                    addSuffix: true,
                  })}`,
        });
      });
      logger.info("/backups");
      interaction.editReply({ embeds: [embed] });
    } else {
      interaction.followUp("No backup stars found.");
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    interaction.followUp("Error: Could not get active stars");
  }
}
module.exports = { data, run };
