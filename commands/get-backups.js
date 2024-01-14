const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const db = require("../utils/db.js");
const { formatDistanceToNow } = require("date-fns");
const { isAuthorized } = require("../utils/is-authorized.js");

const data = new SlashCommandBuilder()
  .setName("backups")
  .setDescription("Get a list of backup stars");

async function run({ interaction }) {
  try {
    const starsCollection = db.getStarsCollection();

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const isAuth = await isAuthorized(interaction, ["Ranked"]);

    // Defer the reply to ensure enough time to process the command
    await interaction.deferReply({ ephemeral: true });

    if (!isAuth) {
      interaction.editReply("Backups is a Ranked-only command");
      return;
    }

    const backupStars = await starsCollection
      .find({ calledAt: null })
      .sort({ foundAt: 1 })
      .toArray();

    if (backupStars.length > 0) {
      const embed = new EmbedBuilder().setTitle("Backup Stars");

      backupStars.forEach((star, index) => {
        const foundDate = new Date(star.foundAt);
        const foundByThisUser = star.foundBy == interaction.user.id;

        embed.addFields({
          name: `🔒 ${star.location}`,
          value: `
                  ${`W${star.world}`}
                  Tier: ${star.tier}
                  Found ${formatDistanceToNow(foundDate, {
                    addSuffix: true,
                  })} by <@${star.foundBy}>
                  `,
        });
      });
      logger.info("/backups");
      interaction.editReply({ embeds: [embed] });
    } else {
      interaction.followUp("No backup stars found");
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    interaction.followUp("Error: Could not get active stars");
  }
}
module.exports = { data, run };
