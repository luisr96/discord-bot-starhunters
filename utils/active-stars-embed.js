const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const totalWorldList = require("../data/total-worlds.json");
const db = require("./db.js");
const { format, formatDistanceToNow, parseISO } = require("date-fns");



module.exports = async (c, client, interaction) => {

  try {
    const starsCollection = db.getStarsCollection();

    // Defer the reply to ensure enough time to process the command
    // await interaction.deferReply();

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

        // Estimate current tier based on last updated time
        let lastUpdate = star.updatedAt ? updatedDate : foundDate;
        let tierDiff = parseInt((new Date() - lastUpdate) / (1000 * 60 * 7));
        let estimatedTier = Math.max(star.tier - tierDiff, 0);

        totalWorld = "";
        if (totalWorldList[0]["500 total worlds"].includes(star.world)) {
          totalWorld = "(500 total)";
        } else if (totalWorldList[0]["750 total worlds"].includes(star.world)) {
          totalWorld = "(750 total)";
        }

        embed.addFields({
          name: `⭐ ${star.location}`,
          value: `World: ${star.world} ${totalWorld}
                  Tier: ${estimatedTier}${estimatedTier == star.tier ? '' : '*'}
                  Found ${formatDistanceToNow(foundDate, { addSuffix: true, })} by <@${star.foundBy}>
                  ${star.updatedAt ? 'Updated ' + formatDistanceToNow(updatedDate, { addSuffix: true, }) : ''}
                  `,
        });
      });
      logger.info("/utils/active-stars-embed");
      return { embeds: [embed] };

      // channel.send({ embeds: [embed] });
      // interaction.editReply({ embeds: [embed] });
    } else {

      return { content: "No active stars found" };
      // channel.send({ content: "No active stars found" });
      // interaction.followUp("No active stars found");
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    return { content: "Error: Could not get active stars" };
    // channel.send({ content: "Error: Could not get active stars" });
    // interaction.followUp("Error: Could not get active stars");
  }


};
