const { EmbedBuilder } = require("discord.js");
const totalWorldList = require("../data/total-worlds.json");
const db = require("../utils/db.js");
const { formatDistanceToNow } = require("date-fns");

module.exports = async () => {
  try {
    const starsCollection = db.getStarsCollection();

    const backupStars = await starsCollection
      .find({ calledAt: null })
      .sort({ foundAt: 1 })
      .toArray();

    if (backupStars.length == 0) {
      return { content: "No backup stars found" };
    }

    const embed = new EmbedBuilder().setTitle("Backup Stars");

    backupStars.forEach((star, index) => {
      const foundDate = new Date(star.foundAt);
      const updatedDate = new Date(star.updatedAt);

      totalWorld = "";
      if (totalWorldList[0]["500 total worlds"].includes(star.world)) {
        totalWorld = "(500 total)";
      } else if (totalWorldList[0]["750 total worlds"].includes(star.world)) {
        totalWorld = "(750 total)";
      }

      embed.addFields({
        name: `🔒 ${star.location}`,
        value: `${`W${star.world}`} ${totalWorld}
                Tier: ${star.tier}
                Found ${formatDistanceToNow(foundDate, { addSuffix: true, })} by <@${star.foundBy}>
                ${star.updatedAt ? 'Updated ' + formatDistanceToNow(updatedDate, { addSuffix: true, }) : ''}`,
      });
    });

    return { embeds: [embed] };

  } catch (error) {
    console.error("Error querying MongoDB:", error);
    return { content: "Error: Could not get backup stars" };
  }
};
