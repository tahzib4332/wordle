async function fetchWord(){
	try{
		const URL = "https://random-word-api.herokuapp.com/word?length=5";
		const res = await fetch(URL)
		const data = await res.json()
		return data[0];
	}
		catch(err){
		console.log(err);
		return "Error";
	}
}

module.exports = fetchWord;