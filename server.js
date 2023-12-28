const express = require('express');
const app = express();

const port = 3000;

app.all("/", (req, res) => {
	res.send("Bot is running!");
});

function listen(){
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	});
}

module.exports = listen;