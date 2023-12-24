const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('create_subscribe_role')
		.setDescription("Creer la base d'un nouveua tableau")
		.addStringOption(option =>
			option
				.setName("title")
				.setDescription("Titre du registeur de role")
				.setRequired(true)

		)
        .addStringOption(option => 
			option
				.setName('description')
				.setDescription('description simple du talbeau de role')
				.setRequired(true)
        )
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('channel ou le message sera lacher')
				.setRequired(true)
		),
	async execute(interaction, reaction_manager) {
		let title = interaction.options.getString('title');
		let description = interaction.options.getString('description');
        // let channel = interaction.option.getChannel("channel")
		let id = interaction.user.id;
        await reaction_manager.create_data(id, title, description);
        embed = await reaction_manager.render(id);

		await interaction.reply({content: "Voicie un prérendue", embeds: [embed]})
	},
};
