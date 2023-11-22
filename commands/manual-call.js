const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const {
  ApplicationCommandOptionWithChoicesAndAutocompleteMixin,
} = require("discord.js");

module.exports = {
  data: {
    name: "manual-call",
    description: "Manually call a star",
    options: [
      {
        name: "world",
        description: "World number",
        type: 3,
        required: true,
      },
      {
        name: "tier",
        description: "Tier of the star",
        type: 3,
        required: true,
      },
    ],
  },

  run: ({ interaction, client, handler }) => {
    const world = interaction?.options._hoistedOptions[0].value;
    const tier = interaction?.options._hoistedOptions[1].value;
    logger.info(`T${tier} STAR | W${world} | BY: ${interaction.user.username}`);
    interaction.reply("Star recorded.");
  },

  options: {
    devOnly: true,
    guildOnly: true,
    userPermissions: ["Administrator", "AddReactions"],
    botPermissions: ["Administrator", "AddReactions"],
    deleted: false,
  },
};
