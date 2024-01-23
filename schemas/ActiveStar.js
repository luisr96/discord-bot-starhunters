const Star = require("./Star");

class ActiveStar extends Star {
  constructor(
    world,
    tier,
    location,
    foundBy,
    foundAt = new Date(),
    updatedAt = null,
    calledAt = new Date()
  ) {
    super(world, tier, location, foundBy, foundAt, updatedAt);

    this.calledAt = calledAt;
  }
}

module.exports = ActiveStar;
