const setCodeBlock = require("../utils/setCodeBlock.js");
const makeEmbed = require("../utils/makeEmbed.js");

const fetchWord = require("../api/fetchWord.js");


async function startGame(e, totalTries){
	e.reply("Starting game...");
	
	const PICKED_WORD = await fetchWord();
	if(PICKED_WORD === "Error") return PICKED_WORD;
	const startingCodeBlock = setCodeBlock([`\t_ _ _ _ _\t`]);
	const EMBED = makeEmbed(startingCodeBlock, totalTries);
	e.channel.send({embeds: [EMBED]});
	
	return PICKED_WORD.toLowerCase();
}

module.exports = startGame;