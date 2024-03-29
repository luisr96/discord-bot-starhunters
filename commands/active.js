const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const totalWorldList = require("../data/total-worlds.json");
const db = require("../utils/db.js");
const { format, formatDistanceToNow, parseISO } = require("date-fns");

const data = new SlashCommandBuilder()
  .setName("active")
  .setDescription("Get a list of released stars");

async function run({ interaction }) {
  try {
    const starsCollection = db.getStarsCollection();

    // Defer the reply to ensure enough time to process the command
    await interaction.deferReply();

    const releasedStars = await starsCollection
      .find({ calledAt: { $exists: true, $ne: null } })
      .sort({ foundAt: 1 })
      .toArray();

    if (releasedStars.length > 0) {
      const embed = new EmbedBuilder()
        .setTitle("Released Stars")
        .setColor("#00ff00");

      releasedStars.forEach((star, index) => {
        const foundDate = new Date(star.foundAt);
        const updatedDate = new Date(star.updatedAt);

        totalWorld = "";
        if (totalWorldList[0]["500 total worlds"].includes(star.world)) {
          totalWorld = "(500 total)";
        } else if (totalWorldList[0]["750 total worlds"].includes(star.world)) {
          totalWorld = "(750 total)";
        }

        embed.addFields({
          name: `⭐ ${star.location}`,
          value: `World: ${star.world} ${totalWorld}
                  Tier: ${star.tier}
                  Found ${formatDistanceToNow(foundDate, {
                    addSuffix: true,
                  })} by <@${star.foundBy}>
                  ${star.updatedAt ? 'Updated ' + formatDistanceToNow(updatedDate, { addSuffix: true, }) : ''}
                  `,
        });
      });
      logger.info("/active");
      interaction.editReply({ embeds: [embed] });
    } else {
      interaction.followUp("No active stars found");
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    interaction.followUp("Error: Could not get active stars");
  }
}
module.exports = { data, run };
