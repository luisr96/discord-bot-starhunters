const Star = require("./Star");

class ActiveStar extends Star {
  constructor(
    world,
    tier,
    location,
    foundBy,
    foundAt = new Date(),
    calledAt = new Date()
  ) {
    super(world, tier, location, foundBy, foundAt);

    this.calledAt = calledAt;
  }
}

module.exports = ActiveStar;
