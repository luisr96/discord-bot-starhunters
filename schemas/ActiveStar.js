const Star = require("./Star");

class ActiveStar extends Star {
  constructor(
    world,
    tier,
    location,
    foundAt = new Date(),
    calledAt = new Date()
  ) {
    super(world, tier, location, foundAt);

    this.calledAt = calledAt;
  }
}

module.exports = ActiveStar;
