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
const { getStarIsCalled } = require("../../utils/get-star-is-called.js");
const { updateStarTier } = require("../../utils/update-tier.js");

module.exports = async (interaction, client) => {
  // the webhook sends in a "Star Found:" format
  // we need to filter for those
  if (interaction.webhookId) {
    if (!interaction.content.startsWith("Star Found:")) {
      // delete all other messages that the webhook generates
      interaction.delete().catch((error) => {
        console.error("Error deleting message:", error);
      });
    } else {
      // remove extra parts of the string
      let processedMessage = interaction.content.replace(
        /Star Found: | - f2p/g,
        ""
      );

      let [world, tier, ...rest] = processedMessage.split(" ");
      world = parseInt(world.slice(1));
      tier = parseInt(tier.slice(1));
      location = rest.join(" ");

      // if star is already called, stop
      const isStarCalled = await getStarIsCalled(world);
      if (isStarCalled) {
        return;
      }

      try {
        const transaction = await saveStar(new Star(world, tier, location));
        await interaction.reply(`AUTO-FOUND: W${world} T${tier} ${location}`);
      } catch (error) {
        console.error(error);
        await interaction.reply("Error");
      }
    }
  }
};
