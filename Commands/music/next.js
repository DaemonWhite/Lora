const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("next")
        .setDescription("Passer à la musique suivante")
        .addChannelOption(option => 
            option
                .setName("channel")
                .setDescription("Channel vocal ou est mis la musique")
                .setRequired(true)
        ),
    async execute(interaction, player) {
        channel = interaction.options.getChannel("channel");

        player.next(channel.id);
        
        await interaction.reply("Ok chef")
    }
}