const getCodeBlock = require("../utils/getCodeBlock.js");
const makeEmbed = require("../utils/makeEmbed.js");

function handleGuesses(e, guessedWord, pickedWord, triesLeft){

	let colorArr = [];

	if(triesLeft < 0){
		colorArr = [];
		getCodeBlock(guessedWord , colorArr, triesLeft);
		return;
	}

	for(let i=0; i<guessedWord.length; i++){

		if(guessedWord[i] === pickedWord[i]){
			colorArr.push("green");
		}
		else if(pickedWord.includes(guessedWord[i])){
			colorArr.push("orange");
		}
		else{
			colorArr.push("white");
		}
	}

	const CODE_BLOCK = getCodeBlock(guessedWord , colorArr, triesLeft);
	const EMBED = makeEmbed(CODE_BLOCK, triesLeft);
	e.channel.send({embeds: [EMBED]});
}

module.exports = handleGuesses;