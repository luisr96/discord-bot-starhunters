const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const db = require("../utils/db.js");

const data = new SlashCommandBuilder()
  .setName("update-tier")
  .setDescription("Update the tier of a star")
  .addIntegerOption((option) =>
    option
      .setName("world")
      .setDescription("The world number of the star")
      .setRequired(true)
      .setMinValue(301)
      .setMaxValue(595)
  )
  .addIntegerOption((option) =>
    option
      .setName("new-tier")
      .setDescription("The new tier of the star")
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(9)
  );

async function run({ interaction }) {
  const world = interaction.options.get("world").value;
  const newTier = interaction.options.get("new-tier").value;

  const starsCollection = db.getStarsCollection();

  try {
    const update = await starsCollection.updateOne(
      { world },
      { $set: { tier: newTier } }
    );

    if (update.modifiedCount === 1) {
      interaction.reply(`W${world} star changed to T${newTier}`);
      logger.info("/update");
    } else {
      interaction.reply(
        `No star on W${world}. It was already called as gone, or never existed`
      );
    }
  } catch (error) {
    interaction.reply("Error: Could not update the star");
  }
}

module.exports = { data, run };
