const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ytdl_seach = require('yt-search');
const ytdl = require('ytdl-core');

function embledGenerator(info, error) {
    let color = 0x0098ba;
    let title = info.title
    if (error == true) {
        color = 0xff0000;
        title = "Impossible de lire/ajouter la musique veuliez vérifier quel est bien disponible dans votre régions\n${info.url}" + info.title
    }
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setURL(info.url)
        .setAuthor(info.author)
        .setDescription(info.description)
        .setImage(info.thumbnail)
        .setTimestamp()
    
}


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
        let titre = interaction.options.getString("titre");
        let channel = interaction.options.getChannel("channel");
        const connection = player.connectToChanel(channel)

        //await interaction.deferReply();

        await interaction.reply('Recherche en cour...')
        
        try {
            let info = ""
            if (!channel.isVoiceBased()) {
                return await interaction.channel.send("Hmmmmmmmmm, difficile de chanter dans un salon textuel non ?")
            }

            if (titre.length <= 2) {
                return await interaction.channel.send("Désoler mais il faudra me donner un peut plus de charactère")
            }


            if (titre.includes('youtube.com/watch?v=') || titre.includes('https://youtu.be')) {
                let regex = /[=]/g;
                let index = titre.search(regex) + 1;
                info = await ytdl_seach({ videoId: titre.slice(index) }) 
            } else {
                let result = await ytdl_seach(titre);
                if (!result ?.all ?.length) {
                    return await interaction.channel.send("Désoler j'ai pas trouver")
                }
                for (let index = 0; index < result.all.length; index++) {
                    if (result.all[index].type === "video") {
                        info = result.all[index];
                        break
                    }              
                }

                if (info.url === "") {
                    return await interaction.channel.send("Désoler j'ai pas trouver")
                }
            }
            
            try {
                await ytdl.getBasicInfo(info.url)
                player.play(connection, info, channel.id)
                const emb = embledGenerator(info, false);
                return await interaction.channel.send({ embeds: [emb]})    
            } catch (error) {
                const emb = embledGenerator(info, true);
                return await interaction.channel.send({ embeds: [emb]})  
            }

        } catch (e) {
            console.log("erreur /play : ", e)
            return await interaction.channel.send("Désoler mon ami mais qu'elle que chose c'est mal passer")
        }

    }
}