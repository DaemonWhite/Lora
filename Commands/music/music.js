const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const ytdl_seach = require('yt-search');


const audio_player = createAudioPlayer()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Met de la sainte music")
        .addChannelOption(option => 
            option
                .setName("channel")
                .setDescription("Channel vocal ou est mis la musique")
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName("titre")
                .setDescription("Nom de la musique désirer")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        titre = interaction.options.getString("titre");
        channel = interaction.options.getChannel("channel");

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        await interaction.reply('Recherche en cour')
        await interaction.deferReply();
        try {
            let youtube_link = "";
            if (!channel.isVoiceBased()) {
                return await interaction.reply("Hmmmmmmmmm, difficile de chanter dans salon textuuel non ?")
            }

            if (titre.length <= 2) {
                return await interaction.reply("Désoler mais il faudra me donner un peut plus de charactère")
            }


            if (titre.includes('youtubes.com')) {
                youtube_link = titre;
            } else {
                let result = await ytdl_seach(titre);
                if (!result ?.all ?.length) {
                    return await interaction.reply("Désoler j'ai pas trouver")
                }
                youtube_link = result.all[0].url;
            }

            const stream = ytdl(youtube_link, { filter: 'audioonly' })
            const resource = createAudioResource(stream, {
                inputType: StreamType.Arbitrary,
            });

            audio_player.play(resource)
            connection.subscribe(audio_player);



            return await interaction.channel.send("Ok mec on à réussi à attendre cette étapes ces cool non ?")

        } catch (e) {
            console.log(e)
            return await interaction.reply("Désoler mon ami mais qu'elle que chose c'est mal passer")
        }

    }
}