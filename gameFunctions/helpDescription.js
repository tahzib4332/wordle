const { PREFIX } = require("../utils/prefix&command");
const Discord = require("discord.js");

const helpDescription = `
# PREFIX = "\`${PREFIX}\`"
\n> Welcome to the Wordle Bot! Here are the commands you can use:

## __Commands__

- To start a new game, type: \` ${PREFIX}wordle \`.
    - This command will only work once a game ends.

- To make a guess, type: \` ${PREFIX}<your guess> \`.
	- The prefix needed to distinguish between normal text and guesses.

- To end the game, type: \` ${PREFIX}end \`
	- This command can be used to end the game at any point when a game is on going.

## __Color definitions__

### PC
> Each guess will be color-coded if your guess is valid:

- :green_circle: Green letters indicate a correct letter in the correct position.
- :yellow_circle: Yellow letters indicate a correct letter but in the wrong position.
- :white_circle: White letters indicate an incorrect letter

### Mobile
> Color-coding (ANSI) doesn't work for mobile hence color coding isn't available for mobile.

> Mobile compatible feature will be added soon.
`;


const helpDescriptionEmbed = new Discord.EmbedBuilder()
	.setTitle("Wordle Bot Help")
	.setDescription(helpDescription)
	.setColor("#03b1fc")
	.setFooter({text: "Good luck and have fun playing!"})
	

module.exports =  helpDescriptionEmbed;