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

    async execute(interaction, gestionguildreaction) {
        let role = interaction.options.getRole("role")
        let description = interaction.options.getString("description")
        let emoji = interaction.options.getString("emoji")
        if(!gestionguildreaction.get_gestion_reaction(interaction.guildId)){
            gestionguildreaction.inscription(interaction.guildId)
        }
        let recup_gestion_reaction = gestionguildreaction.get_gestion_reaction(interaction.guildId)
        recup_gestion_reaction.ajouter_reaction(role, description, emoji)
        let msg = new EmbedBuilder()
            .setColor(0x00e7e3)
            .setTitle("Rôle")
        for (let i = 0; i < recup_gestion_reaction.recuperer_taille(); i++) {
            let react = recup_gestion_reaction.recuperer_reaction(i)
            msg.addFields({name:' ', value: `${react.get_role()} ${react.get_description()} ${react.get_emoji()}`})       
        }

        await interaction.reply({embeds: [msg], fetchReply: true })
        
    },
};