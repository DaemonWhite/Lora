const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, collectorFillter } = require('discord.js');
const {default: axios} = require('axios');
const { message } = require('statuses');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('publish_user_role')
		.setDescription(`Publier le tableau d'inscirption de role`)
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('channel ou publier le role')
				.setRequired(true)
		),
	async execute(interaction, reaction_manager) {
		let channel = interaction.options.getChannel('channel');
		
		await interaction.reply("Traitement de la requete en cours");

        let id = interaction.user.id;

		let render = await reaction_manager.render(id)
		const message = await channel.send({content : "", embeds: [render]});

		return await reaction_manager.subscribe(id, interaction.guild, channel, message);
	},
};
