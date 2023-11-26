class Star {
  constructor(world, tier, location, foundAt = new Date(), calledAt = null) {
    this.world = world;
    this.tier = tier;
    this.location = location;
    this.foundAt = foundAt;
    this.calledAt = calledAt;
  }
}

module.exports = Star;
