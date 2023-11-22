module.exports = {
  data: {
    name: "ping",
    description: "pong!",
  },

  run: ({ interaction, client, handler }) => {
    interaction.reply(`:ping_pong: ${client.ws.ping}ms`);
  },

  options: {
    devOnly: true,
    guildOnly: true,
    userPermissions: ["Administrator", "AddReactions"],
    botPermissions: ["Administrator", "AddReactions"],
    deleted: false,
  },
};
