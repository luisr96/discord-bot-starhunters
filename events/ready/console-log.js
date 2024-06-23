const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const totalWorldList = require("../../data/total-worlds.json");
const db = require("../../utils/db.js");
const activeStarsEmbed = require("../../utils/active-stars-embed.js");
const { format, formatDistanceToNow, parseISO } = require("date-fns");



module.exports = async (c, client, interaction) => {
  const channel = client.channels.cache.get('1254231419497091194');
  channel.send({ content: "Bot is restarting..." });


  const starsEmbed = await activeStarsEmbed();

  // setTimeout(() => {
  // console.log("\n\nLast Message:\n", channel.lastMessageId);

  channel.bulkDelete(5)
    .then(messages => console.log(`Removed ${messages.size} messages`))
    .catch(console.error);

  channel.send(starsEmbed);

  // }, 0);


};
