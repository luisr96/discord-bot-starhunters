// const pino = require("pino");
// const logger = pino({
//   transport: {
//     target: "pino-pretty",
//   },
// });

const activeStarsEmbed = require("../embeds/active-stars-embed.js");

// Clear previous messages and send current active list when bot starts
async function autoCallStars(client) {

  // Make sure this is the id of a bot-specific channel as it deletes old messages
  // const channel = client.channels.cache.get('1254231419497091194');
  const channel = client.channels.cache.find(c => c.name === 'bots');
  await channel.bulkDelete(3);

  const starsEmbed = await activeStarsEmbed();
  channel.send(starsEmbed);

};

module.exports = { autoCallStars };
