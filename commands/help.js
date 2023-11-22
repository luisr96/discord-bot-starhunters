const { version } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  data: {
    name: "help",
    description: "Lists all commands",
  },

  run: ({ interaction, client, handler }) => {
    const stars = codeBlock(
      "asciidoc",
      `
  = COMMANDS =
  /manual-call :: Manually call a star
  /info        :: See bot metadata
   `
    );

    interaction.reply(stars);
  },

  options: {
    devOnly: true,
    guildOnly: true,
    userPermissions: ["Administrator", "AddReactions"],
    botPermissions: ["Administrator", "AddReactions"],
    deleted: false,
  },
};
