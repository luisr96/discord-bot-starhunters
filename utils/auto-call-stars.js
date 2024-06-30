const activeStarsEmbed = require("../embeds/active-stars-embed.js");

// Clear previous messages and send current active list
async function autoCallStars(client) {

  // Make sure this is the id/name of a bot-specific channel as it deletes old messages
  const channelName = 'active-stars';
  // const channelName = 'bots';
  // const channelId = '1254542576447389726';   // ID of the official channel
  // const channel = client.channels.cache.get(channelId);                      // ID
  // const channel = client.channels.cache.find(c => c.name === channelName);   // name


  // client.channels.cache
  // .each(c => console.log("ALL CHANNELS: ", c.guild.name, c.name, c.id))
  // .filter(c => c.name === channelName)
  // .each(c => console.log(c.guild.name, c.name, c.id));

  const channelsList = client.channels.cache
    .filter(c => c.name === channelName);

  // console.log(channelsList.size);
  if (channelsList.size == 0) {
    console.error("\nError: No channel found by", channelName);
    return;
  }

  for (let channel of channelsList) {
    channel[1].bulkDelete(3)
      .then(messages => console.log(`Removed ${messages.size} messages from
        ${channel[1].guild.name} ${channel[1].name} ${channel[1].id}`))
      .catch(console.error);

    let starsEmbed = await activeStarsEmbed();
    channel[1].send(starsEmbed);

  }
  // const channel = await client.channels.fetch('1254231419497091194');

  // if (channel) {
  //   await channel.bulkDelete(3);

  //   channel.bulkDelete(1)
  //     .then(messages => console.log(`Removed ${messages.size} messages`))
  //     .catch(console.error);

  //   const starsEmbed = await activeStarsEmbed();
  //   channel.send(starsEmbed);
  // } else {
  //   console.error("\nError: No channel found by", channelName);
  // }

};

module.exports = { autoCallStars };
