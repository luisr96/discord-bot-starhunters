/**
 * Queries the database for a star, given its world
 * @param  {Number} interaction   The discord interaction
 * @return {boolean}              Whether or not user is mod
 */
isAuthorized = async (interaction, acceptedRoles) => {
  try {
    const member = await interaction.guild.members.fetch(interaction.user.id);
    const hasAcceptedRole = member.roles.cache.some((role) =>
      acceptedRoles.includes(role.name)
    );
    return hasAcceptedRole;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAuthorized };
