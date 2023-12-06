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
  /update      :: Update the tier of a star
  /poof        :: Mark a star as disappeared

  /backups     :: Show a list of backup stars. Worlds are hidden
  /hold        :: Save a star as backup
  /release     :: Release a backup star

  /info        :: See bot metadata
   `
    );

    interaction.reply(stars);
  },
};
