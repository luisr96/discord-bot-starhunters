const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const db = require("../utils/db.js");

const data = new SlashCommandBuilder()
  .setName("poof")
  .setDescription("Mark a star as disappeared")
  .addIntegerOption((option) =>
    option
      .setName("world")
      .setDescription("The world number of the star")
      .setRequired(true)
      .setMinValue(301)
      .setMaxValue(595)
  );

async function run({ interaction }) {
  const world = interaction.options.get("world").value;

  const starsCollection = db.getStarsCollection();

  try {
    const deletion = await starsCollection.deleteOne({ world });

    if (deletion.deletedCount === 1) {
      interaction.reply(`Poof 💨 Star on W${world} marked as gone`);
      logger.info("/poof");
    } else {
      interaction.reply(
        `No star on W${world}. It was already called as gone, or never existed`
      );
    }
  } catch (error) {
    interaction.reply("Error: Could not delete the star");
  }
}

module.exports = { data, run };
