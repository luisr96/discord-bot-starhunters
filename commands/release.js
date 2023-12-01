const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const db = require("../utils/db.js");

const data = new SlashCommandBuilder()
  .setName("release")
  .setDescription("Release a backup star")
  .addIntegerOption((option) =>
    option
      .setName("world")
      .setDescription("The world number of the star")
      .setRequired(true)
      .setMinValue(301)
      .setMaxValue(595)
  );

async function run({ interaction }) {
  await interaction.deferReply();

  const isUserMod = await isMod(interaction);
  if (!isUserMod) {
    interaction.editReply("Need mod privileges");
    return;
  }

  const world = interaction.options.get("world").value;

  const starsCollection = db.getStarsCollection();

  try {
    const result = await starsCollection.updateOne(
      { world: world, calledAt: null },
      { $set: { calledAt: new Date() } }
    );

    // Check if the update was successful
    if (result.matchedCount === 1) {
      interaction.editReply(`W${world} star released. It's now **/active**`);
      logger.info("/release");
    } else {
      interaction.editReply(
        `Star on W${world} was not found or was already released`
      );
    }
  } catch (error) {
    interaction.editReply("Error: Could not release the star");
  }
}

module.exports = { data, run };
