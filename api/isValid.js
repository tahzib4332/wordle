async function isValid(word){
	try{
		const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
		const data = await res.json();
		if(data.title == "No Definitions Found") 
			return {
				valid: false,
				definition: `No Definitions Found.\nPerhaps check https://www.google.com/search?q=${word}+meaning`
			};
		
		return {
			valid: true,
			definition: data[0].meanings[0].definitions[0].definition
		};
	}
		catch(err){
		console.log(err);
		return false;
	}
}

module.exports = isValid;