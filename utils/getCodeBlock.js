const colorLetters = require("./colorLetters.js");
const setCodeBlock = require("./setCodeBlock.js");

let GUESSED_WORDS_ARR = [];

function getCodeBlock(word, colorArr, triesLeft, gameFinished){
	
	const COLORED_WORD = colorLetters(word, colorArr);
	GUESSED_WORDS_ARR.push(COLORED_WORD);
	const CODE_BLOCK = setCodeBlock(GUESSED_WORDS_ARR);

	if(gameFinished){
		GUESSED_WORDS_ARR = [];
	}

	return CODE_BLOCK;
}

module.exports = getCodeBlock;