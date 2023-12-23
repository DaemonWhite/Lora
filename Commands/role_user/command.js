const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, collectorFillter } = require('discord.js');
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
	async execute(interaction, client) {
		let emoji = interaction.options.getString('emoji');
		let role = interaction.options.getRole('rôle')
		
		const embed = new EmbedBuilder()
			.setColor('#004400')
			.setDescription('Emoji enorme de la mort qui tue')
			.setTimestamp()

		const button = new ButtonBuilder()
			.setEmoji(emoji)

		const row = new ActionRowBuilder()
			.setComponents(button)

		const message = await interaction.reply({content:"billy chan", embeds: [embed], fetchReply: true})

		const reaction_collector = message.createReactionCollector({collectorFillter, time: 0, dispose: true});

		reaction_collector.on('remove', (r, user) => {
			const member_cache = interaction.guild.members.fetch(user.id);
			const member = interaction.guild.members.cache.get(user.id);

			member.roles.remove(role);
			interaction.channel.send(`suppression du role ${role} à ${user}`)
			member.roles.add(role);
			
		});
		
		reaction_collector.on('collect', (r, user) => { 
			// console.log(`Collected ${r.emoji.name}`); 
			const member_cache = interaction.guild.members.fetch(user.id);
			const member = interaction.guild.members.cache.get(user.id);

			if (!member.roles.cache.has(role.id)) {
				member.roles.add(role);
				interaction.channel.send(`Ajout du role ${role} à ${user}`);
			} else {
				interaction.channel.send("Vous avez déjà ce role")
			}
			member.roles.add(role);
			
		});
		reaction_collector.on('end', collected => console.log(`Collected ${collected} items`));
		
		const react = await message.react(emoji)
		await react;
	},
};
