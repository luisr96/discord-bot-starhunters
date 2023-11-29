const { version } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");

module.exports = {
  data: {
    name: "info",
    description: "Info about the bot",
  },

  run: ({ interaction, client, handler }) => {
    const stars = codeBlock(
      "asciidoc",
      `
  = META =
  • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
    2
  )} MB
  • Users      :: ${client.guilds.cache
    .map((g) => g.memberCount)
    .reduce((a, b) => a + b)
    .toLocaleString()}
  • Servers    :: ${client.guilds.cache.size.toLocaleString()}
  • Discord.js :: v${version}
  • Node       :: ${process.version}`
    );

    interaction.reply(stars);
  },
};
