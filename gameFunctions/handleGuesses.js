const getCodeBlock = require("../utils/getCodeBlock.js");
const makeEmbed = require("../utils/makeEmbed.js");

function handleGuesses(e, guessedWord, pickedWord, triesLeft){

	let colorArr = [];

	for(let i=0; i< guessedWord.length; i++){

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

	triesLeft--;
	const CODE_BLOCK = getCodeBlock(guessedWord , colorArr);
	const EMBED = makeEmbed(CODE_BLOCK, triesLeft);
	e.channel.send({embeds: [EMBED]});
}

module.exports = handleGuesses;