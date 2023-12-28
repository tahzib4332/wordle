function colorText(text, color){
	switch(color){
		case "white":
	  		return `|\u001b[1;37m${text}\u001b[0;0m|`
		
		case "green":
	  		return `|\u001b[1;36m${text}\u001b[0;0m|`
		
		case "orange":
	  		return `|\u001b[1;33m${text}\u001b[0;0m|`
	}
}

module.exports = colorText;