const {SlashCommandBuilder,EmbedBuilder, Events} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('message')
    .setDescription("Afficher un message de présentation"),
        
    async execute(interaction) {
        let msg = new EmbedBuilder()
        .setColor(0x00e7e3)
        .setTitle("Rôle")
        .setDescription("Yo tout le monde, attribution de rôle içi 😆")
        const message = await interaction.reply({embeds: [msg], fetchReply: true })
        //reaction_manager.ajout_du_message(message)
    },
};