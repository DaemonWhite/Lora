const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('add_subscribe_role')
		.setDescription("Ajoute une ligne au tableau")
		.addRoleOption(option =>
			option
				.setName("role")
				.setDescription("Titre du registeur de role")
				.setRequired(true)

		)
        .addStringOption(option => 
			option
				.setName('description')
				.setDescription('Desciption simple du talbeau de role')
				.setRequired(true)
        )
		.addStringOption(option =>
			option
				.setName('emoji')
				.setDescription('channel ou le message sera lacher')
				.setRequired(true)
		),
	async execute(interaction, reaction_manager) {
		let emoji = interaction.options.getString('emoji');
		let desciption = interaction.options.getString('description')
		let role = interaction.options.getRole('role')
		
		let id = interaction.user.id;

		let send = {content: "Error inconnue"};
        // let channel = interaction.option.getChannel("channel")
        let data = await reaction_manager.append_data(id, emoji, desciption, role);
        if (data) {
			send = {content: "Ceci est un préambule", embeds: [await reaction_manager.render(id)]};
		} else {
			send = {content: "Attention vous pouvez pas mettre deux foix le même emoji et rôle!"};
		}

		await interaction.reply(send)
	},
};
