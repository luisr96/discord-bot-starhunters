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
  /active      :: Show list of active stars
  /call        :: Call a star. This puts it on /active
  /update-tier :: Update the tier of a star
  /poof        :: Call a star as disappeared

  /backups     :: Show a list of backup stars. Worlds are hidden
  /release     :: Release a backup star (found via auto-find)

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
