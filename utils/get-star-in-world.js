const db = require("./db.js");

/**
 * Queries the database for a star, given its world
 * @param  {Number} world    The star's world
 * @return {Object || null}  The document from the DB
 */
getStarInWorld = async (world) => {
  try {
    const starsCollection = db.getStarsCollection();
    const getStarInWorld = await starsCollection.findOne({ world });
    return getStarInWorld;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getStarInWorld };
