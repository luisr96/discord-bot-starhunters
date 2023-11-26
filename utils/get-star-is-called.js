const db = require("./db.js");

/**
 * Queries the database to see if a star is called
 * @param  {Number} world    The star's world
 * @return {Object || null}  The document from the DB
 */
getStarIsCalled = async (world) => {
  try {
    const starsCollection = db.getStarsCollection();
    const getStarIsCalled = await starsCollection.findOne({
      world,
      calledAt: { $ne: null },
    });
    return getStarIsCalled;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getStarIsCalled };
