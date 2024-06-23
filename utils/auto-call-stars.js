// const pino = require("pino");
// const logger = pino({
//   transport: {
//     target: "pino-pretty",
//   },
// });

const activeStarsEmbed = require("./active-stars-embed.js");


// Clear previous messages and send current active list when bot starts
// module.exports = async (client) => {
async function autoCallStars(client) {

  // Make sure this is the id of a bot-specific channel as it deletes old messages
  // const channel = client.channels.cache.get('1254231419497091194');
  const channel = client.channels.cache.find(c => c.name === 'bots');

  // console.log(channel);

  // const channel = await client.channels.fetch('1254231419497091194');

  const starsEmbed = await activeStarsEmbed();

  // if (!starsEmbed.content?.localeCompare("No active stars found")) {
  //   console.log("No stars found");
  //   // return;
  // }

  // channel.bulkDelete(3)
  //   .then(messages => console.log(`Removed ${messages.size} messages`))
  //   .catch(console.error);

  // let messages = await channel.bulkDelete(3);
  // console.log(`Removed ${messages.size} messages`);
  // .then(messages => console.log(`Removed ${messages.size} messages`))
  // .catch(console.error);

  // setTimeout(() => (
  //   channel.send(starsEmbed)
  // ), 10);

  await channel.bulkDelete(3);

  channel.send(starsEmbed);

};

module.exports = { autoCallStars };
