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

    async execute(interaction, reaction) {
        let role = interaction.options.getRole("role")
        let description = interaction.options.getString("description")
        let emoji = interaction.options.getString("emoji") 
        reaction.ajouter_reaction(role, description, emoji)
        let msg = new EmbedBuilder()
            .setColor(0x00e7e3)
            .setTitle("Rôle")
        for (let i = 0; i < reaction.recuperer_taille(); i++) {
            let react = reaction.recuperer_reaction(i)
            msg.addFields({name:' ', value: `${react.get_role()} ${react.get_description()} ${react.get_emoji()}`})       
        }
        await interaction.reply({embeds: [msg], fetchReply: true })
        
    },
};