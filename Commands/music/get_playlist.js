const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const {embledPLaylistBuilder} = require('../../utils/music.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get_playlist")
        .setDescription("Donne la liste de lecture")
        .addChannelOption(option => 
            option
                .setName("channel")
                .setDescription("Channel vocal ou est mis la musique")
                .setRequired(true)
        ),
    async execute(interaction, player) {
        let channel = interaction.options.getChannel("channel");

        let emb = embledPLaylistBuilder(player.get_playlist(channel.id));

        await interaction.reply({ embeds: [emb]});

    }
}