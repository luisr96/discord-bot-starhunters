const db = require("./db.js");

/**
 * Updates the tier of a star given its world
 * @param {Number} world The star's world
 * @param {Number} newTier The new tier value
 * @returns {Object} The result of the update operation
 */
updateStarTier = async (world, newTier) => {
  try {
    const starsCollection = db.getStarsCollection();
    const result = await starsCollection.updateOne(
      { world },
      { $set: { tier: newTier } }
    );
    return "Success";
  } catch (error) {
    return "There was an error";
  }
};

module.exports = { updateStarTier };
