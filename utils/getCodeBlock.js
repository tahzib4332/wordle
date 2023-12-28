const colorLetters = require("./colorLetters.js");
const setCodeBlock = require("./setCodeBlock.js");

function getCodeBlock(guessedWord, guessedWordsArr, colorArr){
	const COLORED_WORD = colorLetters(guessedWord, colorArr);
	guessedWordsArr.push(COLORED_WORD);
	const CODE_BLOCK = setCodeBlock(guessedWordsArr);
	return CODE_BLOCK;
}

module.exports = getCodeBlock;