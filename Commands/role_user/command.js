const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const {default: axios} = require('axios')

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('user_role')
		.setDescription('Rôle utilisateur par description')
		.addRoleOption(option =>
			option
				.setName("rôle")
				.setDescription("Role à choisir")
				.setRequired(true)

		)
		.addChannelOption(option =>
			option
				.setName('chanel')
				.setDescription('chanel à envoiyer')
				.setRequired(true) 
		)
		.addStringOption(option => 
			option
				.setName('emoji')
				.setDescription('emoji associer au role')
				.setRequired(true)),
	async execute(interaction) {
		console.log("interaction : ", interaction.options)
		let emoji = interaction.options.getString('emoji');

		console.log(emoji.length)
		
		console.log(emoji)
		const embed = new EmbedBuilder()
			.setColor('#004400')
			.setDescription('Emoji enorme de la mort qui tue')
			.setImage(emoji)
			.setTimestamp()

		const button = new ButtonBuilder()
			.setEmoji(emoji)

		const row = new ActionRowBuilder()
			.setComponents(button)

		await interaction.reply({embeds: [embed]});
	},
};
