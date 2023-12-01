/**
 * Queries the database for a star, given its world
 * @param  {Number} interaction   The discord interaction
 * @return {boolean}              Whether or not user is mod
 */
isMod = async (interaction) => {
  try {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const isUserMod = member.roles.cache.some((role) => role.name === "Mods");
    return isUserMod;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isMod };
