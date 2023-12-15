const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rappel')
		.setDescription('rappel au bout de x temps!')
		.addStringOption(option =>
			option.setName('temps')
				.setDescription('The input to echo back')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName("message")
                .setRequired(false)),
	async execute(interaction) {
        
		await interaction.reply('Pong!');
	},
};
