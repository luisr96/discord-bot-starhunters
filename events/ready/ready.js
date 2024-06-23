const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

const activeStarsEmbed = require("../../utils/active-stars-embed.js");


// Clear previous messages and send current active list when bot starts
module.exports = async (c, client, interaction) => {
  // Make sure this is the id of a bot-specific channel as it deletes old messages
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
