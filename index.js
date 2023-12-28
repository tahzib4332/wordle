const Discord = require("discord.js");
const client = new Discord.Client({
	intents: ["Guilds", "GuildMessages", "MessageContent"],
});

const listen = require("./server.js");
const { COMMAND, PREFIX } = require("./utils/prefix&command.js");
const handleGuesses = require("./gameFunctions/handleGuesses.js");
const startGame = require("./gameFunctions/startGame.js");
const isValid = require("./api/isValid.js");

client.on("ready", () => {
	console.log("Bot is online with the username: " + client.user.tag);
});


let hasGameStarted = false;
let PICKED_WORD = undefined;
const TOTAL_TRIES = 5;
let triesLeft = TOTAL_TRIES;
let GUESSED_WORDS_ARR = [];


async function game(e) {
	// return if the message is from a bot
	if (e.author.bot) return;
	// return if neither game hasn't started nor message includes the start command
	if (!hasGameStarted && !e.content.startsWith(COMMAND)) return;
	// makes sure the codes are only ran once when game starts
	if (!hasGameStarted) {
		// startGame()  fetches a word with api call,
		// and makes starting embed and returns the fetched word or "Error" if error occurs
		PICKED_WORD = await startGame(e, TOTAL_TRIES);
		e.channel.send(PICKED_WORD);
		// stop executing if an error occurs from the api call
		if (PICKED_WORD === "Error") {
			e.reply("Something went wrong! ;-;");
			return;
		}
		hasGameStarted = true;
	}	
	// remove any whitespaces from both sides of the message to keep the proper length
	// and convert to lower case
	const userMessage = e.content.trim().toLowerCase();
	// early return if the userMessage is the start command itself
	// or if either userMessage didnt start with the prefix
	// or the total length of the userMessage is not 6 ( 5 letters + the prefix )
	if (
		userMessage === COMMAND ||
		!userMessage.startsWith(PREFIX) ||
		userMessage.length !== 6
	)return;


	if( triesLeft === 0 ){
		e.reply("You lost! ;-;");
		hasGameStarted = false;
		triesLeft = TOTAL_TRIES;
		return;
	}

	
	// remove the prefix from the message thus getting the guessed word
	const GUESSED_WORD = userMessage.slice(PREFIX.length);
	// check validation for user input as in , is it a valid word.
	// And notify user if not valid
	// let isWordValid = await isValid(GUESSED_WORD);

	// if (!isWordValid) {
	// 	e.reply("Invalid word! Try again!");
	// 	return;
	// }
	triesLeft--;
	handleGuesses(e, GUESSED_WORD, PICKED_WORD, GUESSED_WORDS_ARR, triesLeft);
}

client.on("messageCreate", async (e) => {
	await game(e);
});

listen();
const logIn = process.env["TOKEN"];
client.login(logIn);