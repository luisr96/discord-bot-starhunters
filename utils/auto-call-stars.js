const activeStarsEmbed = require("../embeds/active-stars-embed.js");

// Clear previous messages and send current active list
async function autoCallStars(client) {

  // Make sure this is the id/name of a bot-specific channel as it deletes old messages
  // const channel = client.channels.cache.get('1254231419497091194');  // ID
  const channel = client.channels.cache.find(c => c.name === 'bots');   // name
  await channel.bulkDelete(3);

  const starsEmbed = await activeStarsEmbed();
  channel.send(starsEmbed);

};

module.exports = { autoCallStars };
