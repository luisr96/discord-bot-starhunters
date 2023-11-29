class Star {
  constructor(
    world,
    tier,
    location,
    foundBy,
    foundAt = new Date(),
    calledAt = null
  ) {
    this.world = world;
    this.tier = tier;
    this.location = location;
    this.foundBy = foundBy;
    this.foundAt = foundAt;
    this.calledAt = calledAt;
  }
}

module.exports = Star;
