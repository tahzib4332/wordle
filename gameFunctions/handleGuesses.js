const getCodeBlock = require("../utils/getCodeBlock.js");
const makeEmbed = require("../utils/makeEmbed.js");

function handleGuesses(e, guessedWord, pickedWord, triesLeft, gameFinished = false){

	let colorArr = [];

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

	const CODE_BLOCK = getCodeBlock(guessedWord , colorArr, triesLeft, gameFinished);
	const EMBED = makeEmbed(CODE_BLOCK, triesLeft);
	e.channel.send({embeds: [EMBED]});

	if(gameFinished){
		colorArr = [];
	}
}

module.exports = handleGuesses;