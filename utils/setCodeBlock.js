function setCodeBlock(guessedWordsArr){
  // the following string would look like this
  /* 
    ```ansi
      \u001b[0;0m \u001b[1;31mExample
    ```
  */

	let text = "";
	guessedWordsArr.forEach((word) => {
		text += `|\t${word}\t|\n`;
		if(word !== guessedWordsArr[guessedWordsArr.length - 1])
			text += "\n";
	});
	// return `\`\`\`ansi\n${text}\`\`\``
	
  return`
\`\`\`ansi
${text}
\`\`\`
`
}

module.exports = setCodeBlock;