const {SlashCommandBuilder,EmbedBuilder, Events} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('Ajout_du_message')
    .setDescription("Afficher un message de présentation"),
        
    async execute(interaction, reaction_manager) {
        let msg = new EmbedBuilder()
        .setColor(0x00e7e3)
        .setTitle("Rôle")
        .setDescription("Yo tout le monde, attribution de rôle içi 😆")
        const message = await interaction.reply({embeds: [msg], fetchReply: true })
        //reaction_manager.ajout_du_message(message)
    },
};