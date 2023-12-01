class Star {
  constructor(
    world,
    tier,
    location,
    foundBy,
    foundAt = new Date(),
    calledAt = null,
    credit = foundBy
  ) {
    this.world = world;
    this.tier = tier;
    this.location = location;
    this.foundBy = foundBy;
    this.foundAt = foundAt;
    this.calledAt = calledAt;
    this.credit = credit;
  }
}

module.exports = Star;
