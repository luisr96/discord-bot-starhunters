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
  /active      :: Show list of active stars
  /release     :: Release an auto-found star
  /poof        :: Call a star as disappeared


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
