const db = require("./db.js");

/**
 * Queries the database to see if all stars that are called
 * @return {Object[] || null}  The documents from the DB
 */
getAllCalledStars = async () => {
  try {
    const starsCollection = db.getStarsCollection();
    const getAllCalledStars = await starsCollection.find({
      calledAt: { $ne: null },
    });
    return getAllCalledStars.toArray();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllCalledStars };
