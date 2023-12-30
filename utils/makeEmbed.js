const Discord = require("discord.js");

function makeEmbed(CODE_BLOCK, triesLeft) {
	const embed = new Discord.EmbedBuilder()
		.setTitle("Wordle")
		.setDescription("For PC" + CODE_BLOCK + "For Mobile" + CODE_BLOCK)
		.setColor("Random")
		.setFooter({ text: `Tries Left: ${triesLeft}` })
		
	return embed;
}

module.exports = makeEmbed;
