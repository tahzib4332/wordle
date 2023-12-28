const colorText = require("./colorText.js");

function colorLetters(word, colorArr){
	word = word.toUpperCase();
	let letterArr = word.split("");
	let coloredLettersArr = letterArr.map((letter, idx) => colorText(letter, colorArr[idx]));
	let coloredWord = coloredLettersArr.join(" ");
	return coloredWord;
}

module.exports = colorLetters;