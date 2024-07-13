const { SlashCommandBuilder } = require("discord.js");

const Star = require("../schemas/Star.js");
const starlocations = require("../data/locations.json");
const { saveStar } = require("../utils/save-star.js");
const { HttpRequesStarMinersFetchDataAsync } = require("../utils/get-sm-stars.js");

/*
    ~~Auto-call~~ Manually-call stars posted by Star Miners
    Automatically pull Star Miner calls directly into our own actives list
*/

const data = new SlashCommandBuilder()
    .setName("importsm")
    .setDescription("Import Starminers Reported Stars");

async function run({ interaction }) {
    await interaction.deferReply();

    const stars = await HttpRequesStarMinersFetchDataAsync().catch(console.error);
    
    if (!stars) {
        interaction.editReply("Was not able to import starminers, ask dev to check logs!");
        return;
    }

    /** @type Star[] */
    let savedStars = [];
    for (let star of stars) {
        botCaller = interaction.user.id;
        if (star && !star.credit) {
            star.credit = botCaller;
        }

        const result = await saveStar(
            star,
            interaction
        );
        savedStars.push(result)

    }
    let importedStarsMessage = savedStars.map(x => `- ${x.world} ${x.tier} ${x.location}\n`);
    interaction.editReply(`Imported ${savedStars.length} Starminers Stars!\n${importedStarsMessage}`);
}

module.exports = { data, run, devOnly: true };
