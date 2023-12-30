const Discord = require("discord.js");
const client = new Discord.Client({
	intents: ["Guilds", "GuildMessages", "MessageContent"],
});

const listen = require("./server.js");
const { COMMANDS, PREFIX } = require("./utils/prefix&command.js");
const handleGuesses = require("./gameFunctions/handleGuesses.js");
const { handleWin, handleLoose } = require("./gameFunctions/handleWinOrLose.js");
const helpDescriptionEmbed = require("./gameFunctions/helpDescription.js");
const startGame = require("./gameFunctions/startGame.js");
const isValid = require("./api/isValid.js");

client.on("ready", () => {
	console.log("Bot is online with the username: " + client.user.tag);
});


let hasGameStarted = false;
let PICKED_WORD = undefined;
let PICKED_WORD_DEFINITION = undefined;
let GUESSED_WORD = undefined;
const TOTAL_TRIES = 8;
let triesLeft = TOTAL_TRIES;
let timeTillBotTurnsOff = 10 * (60 * 1000); // minute -> mili-sec
let shutDownTimer = undefined;

function shutDown(e){
	e.channel.send("The game has ended due to inactivity.");
	handleLoose(e, GUESSED_WORD, PICKED_WORD, triesLeft, PICKED_WORD_DEFINITION);
	resetVariables();
}

function resetVariables(){
	PICKED_WORD = undefined;
	hasGameStarted = false;
	triesLeft = TOTAL_TRIES;
}

async function game(e) {
	// return if the message is from a bot
	if (e.author.bot) return;
	// send help description upon help command
	if ((e.content.toLowerCase()).startsWith(COMMANDS.help)) {
		e.channel.send({embeds: [helpDescriptionEmbed]});
		return;
	}
	// return if neither game hasn't started nor message includes the start command
	if (!hasGameStarted && !e.content.startsWith(COMMANDS.start)) return;
	// makes sure the codes are only ran once when game starts
	if (!hasGameStarted) {
		// startGame()  fetches a word with api call,
		// and makes starting embed and returns the fetched word or "Error" if error occurs
		PICKED_WORD = await startGame(e, TOTAL_TRIES);
		PICKED_WORD_DEFINITION = ( await isValid(PICKED_WORD) ).definition;
		GUESSED_WORD = PICKED_WORD;
		// stop executing if an error occurs from the api call
		if (PICKED_WORD === "Error") {
			e.reply("Something went wrong! ;-;");
			return;
		}
		hasGameStarted = true;
		
		shutDownTimer = setTimeout(() => {
			shutDown(e)
		},timeTillBotTurnsOff);
	}	
	// trim() removes any whitespaces from both sides of the message to keep the proper length
	const userMessage = e.content.trim().toLowerCase();

	// stop the game upon stop command
	if( userMessage === COMMANDS.end && hasGameStarted ){
		handleLoose(e, GUESSED_WORD, PICKED_WORD, triesLeft, PICKED_WORD_DEFINITION)
		resetVariables();
		return;
	};
	
	// early return if the userMessage is the start command itself
	// or if either userMessage didnt start with the prefix
	// or the total length of the userMessage is not 6 ( 5 letters + the prefix )
	if (
		userMessage === COMMANDS.start ||
		!userMessage.startsWith(PREFIX) ||
		userMessage.length !== 6
	)return;
	
	// remove the prefix from the message thus getting the guessed word
	GUESSED_WORD = userMessage.slice(PREFIX.length);
	// check validation for user input as in , is it a valid word.
	// And notify user if not valid
	let validationResult = await isValid(GUESSED_WORD);

	if (!validationResult.valid) {
		e.reply("Invalid word! Try again!");
		return;
	}
	
	triesLeft = triesLeft - 1;
	
	if( GUESSED_WORD === PICKED_WORD ){
		handleWin(e, GUESSED_WORD, PICKED_WORD, triesLeft, PICKED_WORD_DEFINITION);
		resetVariables();
		clearTimeout(shutDownTimer);
		return;
	}

	else if( triesLeft === 0 ){
		handleLoose(e, GUESSED_WORD, PICKED_WORD, triesLeft, PICKED_WORD_DEFINITION);
		resetVariables();
		clearTimeout(shutDownTimer);
		return;
	}

	handleGuesses(e, GUESSED_WORD, PICKED_WORD, triesLeft);
	clearTimeout(shutDownTimer);
	shutDownTimer = setTimeout(() => {
		shutDown(e)
	},timeTillBotTurnsOff);
}

client.on("messageCreate", async (e) => {
	await game(e);
});

listen();
const logIn = process.env["TOKEN"];
client.login(logIn);