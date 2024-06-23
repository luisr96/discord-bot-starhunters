const activeStarsEmbed = require("../embeds/active-stars-embed.js");

// Clear previous messages and send current active list
async function autoCallStars(client) {

  // Make sure this is the id/name of a bot-specific channel as it deletes old messages
  const channelIdentifier = 'active-stars';
  // const channelIdentifier = '1254542576447389726';   // ID of the official channel
  // const channel = client.channels.cache.get(channelIdentifier);                  // ID
  const channel = client.channels.cache.find(c => c.name === channelIdentifier);    // name

  if (channel) {
    await channel.bulkDelete(3);

    const starsEmbed = await activeStarsEmbed();
    channel.send(starsEmbed);
  } else {
    console.error("\nError: No channel found by", channelIdentifier);
  }

};

module.exports = { autoCallStars };
