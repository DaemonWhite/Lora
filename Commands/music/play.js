const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ytdl_seach = require('yt-search');


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
    async execute(interaction, player) {
        titre = interaction.options.getString("titre");
        channel = interaction.options.getChannel("channel");

        const connection = player.connectToChanel(channel)

        //await interaction.deferReply();

        await interaction.reply('Recherche en cour...')
        
        try {
            let youtube_link = "";
            if (!channel.isVoiceBased()) {
                return await interaction.channel.send("Hmmmmmmmmm, difficile de chanter dans un salon textuel non ?")
            }

            if (titre.length <= 2) {
                return await interaction.channel.send("Désoler mais il faudra me donner un peut plus de charactère")
            }


            if (titre.includes('youtube.com/watch?v=') || titre.includes('https://youtu.be')) {
                youtube_link = titre;
            } else {
                let result = await ytdl_seach(titre);
                if (!result ?.all ?.length) {
                    return await interaction.channel.send("Désoler j'ai pas trouver")
                }
                console.log(result.all)
                for (let index = 0; index < result.all.length; index++) {
                    if (result.all[index].type === "video") {
                        youtube_link = result.all[index].url;
                        break
                    }              
                }

                if (youtube_link === "") {
                    return await interaction.channel.send("Désoler j'ai pas trouver")
                }
            }
            
            player.play(connection, youtube_link, channel.id)
            
            return await interaction.channel.send({ content: `Bonne Music: ${youtube_link}`})    

        } catch (e) {
            console.log("erreur /play : ", e)
            return await interaction.channel.send("Désoler mon ami mais qu'elle que chose c'est mal passer")
        }

    }
}