const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const db = require("../../utils/db.js");
const { getStarInWorld } = require("../../utils/get-star-in-world.js");
const { saveStar } = require("../../utils/save-star.js");
const Star = require("../../schemas/Star.js");

module.exports = async (interaction, client) => {
  if (interaction.content.startsWith("Star Found:")) {
    if (interaction.author.bot) {
      // remove extra parts of the string
      let processedMessage = interaction.content.replace(
        /Star Found: | - f2p/g,
        ""
      );

      let [world, tier, ...rest] = processedMessage.split(" ");
      world = parseInt(world.slice(1));
      tier = parseInt(tier.slice(1));
      location = rest.join(" ");

      try {
        const transaction = await saveStar(new Star(world, tier, location));
        await interaction.reply(`AUTO-CALL: W${world} T${tier} ${location}`);
      } catch (error) {
        console.error(error);
        await interaction.reply("Error");
      }
    }
  }
};
