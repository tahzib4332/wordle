async function isValid(word){
	try{
		const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
		const data = await res.json();
		if(data.title == "No Definitions Found") return false;
		return true;
	}
		catch(err){
		console.log(err);
		return false;
	}
}

module.exports = isValid;