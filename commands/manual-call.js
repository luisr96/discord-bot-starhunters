const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const locations = require("../data/locations.json");
const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
  .setName("manual-call")
  .setDescription("Call a star manually")
  .addStringOption((option) =>
    option
      .setName("world")
      .setDescription("The world number of the star")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("tier")
      .setDescription("The tier of the star")
      .setRequired(true)
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

function run({ interaction }) {
  const world = interaction.options.getString("world");
  const tier = interaction.options.getString("tier");
  const location = interaction.options.getString("location");
  logger.info(
    `W${world} | T${tier} | ${location} | BY: ${interaction.user.username}`
  );
  interaction.reply("Star recorded.");
}
module.exports = { data, run };
