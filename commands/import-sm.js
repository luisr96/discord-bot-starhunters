const { SlashCommandBuilder } = require("discord.js");

const starlocations = require("../data/locations.json");
const { saveStar } = require("../utils/save-star.js");
const Star = require("../schemas/Star.js");

/*
    ~~Auto-call~~ Manually-call stars posted by Star Miners
    Automatically pull Star Miner calls directly into our own actives list
*/

const data = new SlashCommandBuilder()
    .setName("importsm")
    .setDescription("Import Starminers Reported Stars");

// TODO find a way to fetch these from an API ?
const f2pworlds = [
    301, 308, 316, 326, 335, 371, 372, 379, 380, 381,
    382, 383, 384, 393, 394, 397, 398, 399, 413, 414,
    417, 418, 419, 427, 430, 431, 432, 433, 434, 435,
    436, 437, 451, 452, 453, 454, 455, 456, 468, 469,
    475, 476, 483, 497, 498, 499, 500, 501, 530, 537,
    544, 545, 546, 547, 552, 553, 554, 555, 571, 575
];


async function run({ interaction }) {
    await interaction.deferReply();

    const stars = await HttpRequesStarMinerst().catch(console.error);
    
    if (!stars) {
        interaction.editReply("Was not able to import starminers, ask dev to check logs!");
        return;
    }

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

    interaction.editReply(`Imported ${savedStars.length} Starminers Stars!`);
}


async function HttpRequesStarMinersFetchDataAsync() {
    let result = [];

    // world, tier, location, credit
    const url = "https://map.starminers.site";
    const response = await fetch(`${URL}/data2?timestamp=${Date.now()}`, {
        "headers": {
            // We're a legit user :^)
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0",
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,sv;q=0.8",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://map.starminers.site/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        "body": null,
        "method": "GET"
    });
    const data = await response.json();
    /*
        [{
            "world": 567,
            "location": 6,
            "calledBy": "anonymous",
            "calledLocation": "Al Kharid bank",
            "calledAt": 1713261755.701,
            "minTime": 1713256998,
            "tier": 1,
            "maxTime": 1713257177
        }]
     */ 

    if (!data) throw new Error("Fetch was not sucessful.");

    for (var star of data) {
        // Check for Free-to-play worlds
        if (f2pworlds.includes(star.world)) {            
            const {world, tier, calledBy: credit} = star;
            const location = ConvertLocation(star.calledLocation);

            result.push(new Star(world,  tier, location, credit));
        }
    }
    
    return result;
}

function ConvertLocation(calledLocation) {
    let res = calledLocation;
    // Fuzzy find calledLocation from locations.json
    // for (const { value, name } of starlocations) {
    //     // ...
    //     if (false) {
    //         res = name;
    //         break;
    //     }
    // }
    return res;
}

module.exports = { data, run, devOnly: true };
