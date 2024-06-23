const { autoCallStars } = require("../../utils/auto-call-stars.js");

// Clear previous messages and send current active list when bot starts
module.exports = async (client) => {
  // Make sure this is the id of a bot-specific channel as it deletes old messages
  // const channel = client.channels.cache.get('1254231419497091194');
  // const channel = client.channels.cache.find(c => c.name === 'bots');
  // channel.send({ content: "Bot is restarting..." });

  autoCallStars(client);
};
