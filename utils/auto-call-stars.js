const activeStarsEmbed = require("../embeds/active-stars-embed.js");

// Clear previous messages and send current active list
async function autoCallStars(client) {

  // Make sure this is the id/name of a bot-specific channel as it deletes old messages
  const channelName = 'active-stars';

  const channelsList = client.channels.cache
    .filter(c => c.name === channelName);

  if (channelsList.size == 0) {
    console.error("\nError: No channel found for", channelName);
    return;
  }

  for (let channel of channelsList) {
    channel[1].bulkDelete(3).catch(console.error);

    let starsEmbed = await activeStarsEmbed();
    channel[1].send(starsEmbed);
  }

};

module.exports = { autoCallStars };
