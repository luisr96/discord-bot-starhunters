class Star {
  /**
   * Star object.
   * @param {Number} world - The World Number of the Star.
   * @param {Number} tier - The tier of the Star.
   * @param {string} location - The location of the Star.
   * @param {string} foundBy - The finder of the Star.
   * @param {Date=} foundAt - The timestamp of when the Star was found (Defaults to a new {@link DateConstructor}).
   * @param {Date?} updatedAt - The timestamp of when the Star was last updated.
   * @param {Date?} calledAt - The timestamp of when the Star was called (released).
   * @param {string=} credit - Unused, defaults to {@link foundBy}.
   */
  constructor(
    world,
    tier,
    location,
    foundBy,
    foundAt = new Date(),
    updatedAt = null,
    calledAt = null,
    credit = foundBy
  ) {
    this.world = world;
    this.tier = tier;
    this.location = location;
    this.foundBy = foundBy;
    this.foundAt = foundAt;
    this.updatedAt = updatedAt;
    this.calledAt = calledAt;
    this.credit = credit;
  }
}

module.exports = Star;
