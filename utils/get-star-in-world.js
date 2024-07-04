const Star = require("../schemas/Star.js");
const db = require("./db.js");

/**
 * Queries the database for a star, given its world
 * @param  {Number} world    The star's world
 * @return {Star || null}  The document from the DB
 */
async function getStarInWorld(world) {
  try {
    const starsCollection = db.getStarsCollection();
    const getStarInWorld = await starsCollection.findOne({ world });
    return getStarInWorld;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getStarInWorld };
