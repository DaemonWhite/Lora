const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Aurevoir sainte music")
        .addChannelOption(option => 
            option
                .setName("channel")
                .setDescription("Channel vocal ou est mis la musique")
                .setRequired(true)
        ),
    async execute(interaction, player) {
        channel = interaction.options.getChannel("channel");

        player.stop(channel.id);
        
        await interaction.reply("Heureux de vous avoir servie")
    }
}