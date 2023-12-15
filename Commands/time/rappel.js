const { SlashCommandBuilder } = require('discord.js');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 
  

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rappel')
		.setDescription('rappel au bout de x temps!')
		.addIntegerOption(option =>
			option
                .setName('minute')
				.setDescription('The input to echo back')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("Message a mettre")
                .setRequired(false)),
	async execute(interaction) {
        message = interaction.options.getString("message")
        time = interaction.options.getInteger("minute")

        await interaction.reply(`message dans ${time} minute`)

        await delay(time * 60000)
        
		await interaction.channel.send(message);
	},
};
