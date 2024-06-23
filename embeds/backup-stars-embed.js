// const pino = require("pino");
// const logger = pino({
//   transport: {
//     target: "pino-pretty",
//   },
// });

const { EmbedBuilder } = require("discord.js");
const totalWorldList = require("../data/total-worlds.json");
const db = require("../utils/db.js");
const { formatDistanceToNow } = require("date-fns");

module.exports = async () => {
  try {
    const starsCollection = db.getStarsCollection();

    // Keep this section in the main /backups command to preserve `interaction` variable
    // const member = await interaction.guild.members.fetch(interaction.user.id);
    // const isAuth = await isAuthorized(interaction, ["Ranked"]);

    // // Defer the reply to ensure enough time to process the command
    // await interaction.deferReply({ ephemeral: true });

    // if (!isAuth) {
    //   interaction.editReply("Backups is a Ranked-only command");
    //   return;
    // }

    const backupStars = await starsCollection
      .find({ calledAt: null })
      .sort({ foundAt: 1 })
      .toArray();

    if (backupStars.length > 0) {
      const embed = new EmbedBuilder().setTitle("Backup Stars");

      backupStars.forEach((star, index) => {
        const foundDate = new Date(star.foundAt);
        // const foundByThisUser = star.foundBy == interaction.user.id;
        const updatedDate = new Date(star.updatedAt);

        totalWorld = "";
        if (totalWorldList[0]["500 total worlds"].includes(star.world)) {
          totalWorld = "(500 total)";
        } else if (totalWorldList[0]["750 total worlds"].includes(star.world)) {
          totalWorld = "(750 total)";
        }

        embed.addFields({
          name: `🔒 ${star.location}`,
          value: `
                  ${`W${star.world}`} ${totalWorld}
                  Tier: ${star.tier}
                  Found ${formatDistanceToNow(foundDate, { addSuffix: true, })} by <@${star.foundBy}>
                  ${star.updatedAt ? 'Updated ' + formatDistanceToNow(updatedDate, { addSuffix: true, }) : ''}
                  `,
        });
      });
      // logger.info("/backups");
      return { embeds: [embed] };
    } else {
      return { content: "No backup stars found" };
    }
  } catch (error) {
    console.error("Error querying MongoDB:", error);
    return { content: "Error: Could not get backup stars" };
  }



};
