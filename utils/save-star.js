const Star = require("../schemas/Star.js");
const db = require("./db.js");
const { getStarInWorld } = require("./get-star-in-world.js");

/**
 * Saves the star to the database
 * @param  {Star} starToSave The star's world
 * @return {Object || null}  The document from the DB
 */
saveStar = async (starToSave) => {
  const starsCollection = db.getStarsCollection();
  let message;

  const starExists = await getStarInWorld(starToSave.world);

  // if the star already exists
  if (starExists) {
    // save without changing foundAt
    delete starToSave.foundAt;
  }

  try {
    await starsCollection.updateOne(
      { world: starToSave.world },
      { $set: starToSave },
      { upsert: true }
    );
    message = `New */active* star: W${starToSave.world} T${starToSave.tier} ${starToSave.location}`;
  } catch (error) {
    console.error(error);
    message = "Error: Could not insert the star";
  }
  return message;
};

module.exports = { saveStar };
