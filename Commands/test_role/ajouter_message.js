const {SlashCommandBuilder,EmbedBuilder, Events} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('message')
    .setDescription("Afficher un message de présentation")
    .addRoleOption(option => 
        option
        .setName("role")
        .setDescription("Choisissez un rôle pour Mathéo")
        .setRequired(true)
    )
    .addStringOption(option => 
        option
        .setName("description")
        .setDescription("Explication")
        .setRequired(true)        
    )
    .addStringOption(option =>
        option
        .setName("emoji")
        .setDescription ("Choisissez un emoji pour un rôle")
        .setRequired(true)
    ),

    async execute(interaction) {
        let role = interaction.options.getRole("role")
        let description = interaction.options.getString("description")
        let emoji = interaction.options.getString("emoji")
        const jean = `${role} ${description} ${emoji}`
        let msg = new EmbedBuilder()
        .setColor(0x00e7e3)
        .setTitle("Rôle")
        .addFields({name:' ', value: jean},)
        const message = await interaction.reply({embeds: [msg], fetchReply: true })
        //reaction_manager.ajout_du_message(message)
    },
};