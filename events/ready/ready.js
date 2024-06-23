// const pino = require("pino");
// const logger = pino({
//   transport: {
//     target: "pino-pretty",
//   },
// });

const { autoCallStars } = require("../../utils/auto-call-stars.js");


// Clear previous messages and send current active list when bot starts
module.exports = async (client) => {
  // Make sure this is the id of a bot-specific channel as it deletes old messages
  // const channel = client.channels.cache.get('1254231419497091194');
  const channel = client.channels.cache.find(c => c.name === 'bots');

  // console.log(channel);

  // const channel = await client.channels.fetch('1254231419497091194');
  channel.send({ content: "Bot is restarting..." });

  autoCallStars(client);


  // const starsEmbed = await activeStarsEmbed();

  // channel.bulkDelete(5)
  //   .then(messages => console.log(`Removed ${messages.size} messages`))
  //   .catch(console.error);

  // channel.send(starsEmbed);

};
