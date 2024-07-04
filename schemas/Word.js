class World {
  /**
   * World object. See Wiki page about {@link [Server](https://oldschool.runescape.wiki/w/Server)}
   * @param {Number} world - The World Number.
   * @param {Number | string[]} type - World Type, e.g. F2P, P2P, Leauges etc.
   * @param {string} address - Server address for the world.
   * @param {string} activity - World Activity.
   * @param {Number | string} location - The Country location of the world.
   * @param {Number} players - Current World Player Count.
   */
    constructor(
      world,
      type,
      address,
      activity,
      location,
      players
    ) {
      this.world = world;
      this.type = type;
      this.address = address;
      this.activity = activity;
      this.location = location;
      this.players = players;
    }
  }
  
  module.exports = World;
