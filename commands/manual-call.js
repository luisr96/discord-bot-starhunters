const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const locations = require("../data/locations.json");
const db = require("../utils/db.js");

const data = new SlashCommandBuilder()
  .setName("manual-call")
  .setDescription("Call a star manually. This releases the star")
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
      .setName("tier")
      .setDescription("The tier of the star")
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(9)
  )
  .addStringOption((option) =>
    option
      .setName("location")
      .setDescription("The location of the star")
      .setRequired(true)
  );
locations.forEach((loc) => {
  data.options[2].addChoices(loc);
});

async function run({ interaction }) {
  const world = interaction.options.get("world").value;
  const tier = interaction.options.get("tier").value;
  const location = interaction.options.get("location").value;

  const starToSave = {
    world,
    tier,
    location,
    foundAt: new Date(),
    released: true,
  };

  const starsCollection = db.getStarsCollection();

  try {
    await starsCollection.insertOne(starToSave);
    interaction.reply(`New active star: W${world} T${tier} ${location}`);
    logger.info(
      `W${world} | T${tier} | ${location} | BY: ${interaction.user.username}`
    );
  } catch (error) {
    interaction.reply("Error: Could not insert the star");
  }
}
module.exports = { data, run };
