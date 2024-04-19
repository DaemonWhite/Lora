const {SlashCommandBuilder,EmbedBuilder, Events} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('publier')
    .setDescription("Publier un message")
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Choisissez un channel")
        .setRequired(true)),

    async execute(interaction, gestionguildreaction) {
        if(!gestionguildreaction.get_gestion_reaction(interaction.guildId)){
            return await interaction.reply("Aucun message créer")
        }
        let recup_gestion_reaction = gestionguildreaction.get_gestion_reaction(interaction.guildId)
        let msg = new EmbedBuilder()
            .setColor(0x00e7e3)
            .setTitle("Rôle")
        for (let i = 0; i < recup_gestion_reaction.recuperer_taille(); i++) {
            let react = recup_gestion_reaction.recuperer_reaction(i)
            msg.addFields({name:' ', value: `${react.get_role()} ${react.get_description()} ${react.get_emoji()}`})       
        }
        let channel = interaction.options.getChannel("channel")
        let message = await channel.send({embeds:[msg]})

        const collector = message.createReactionCollector({dispose: true})

        for (let i = 0; i < recup_gestion_reaction.recuperer_taille(); i++) {
            let emoji = recup_gestion_reaction.recuperer_reaction(i)
            message.react(emoji.get_emoji())
            console.log(emoji.get_emoji())
            
            collector.on('collect', (reaction, user) =>{
                const role = message.guild.roles.cache.find(reaction => reaction.name === emoji.get_role().name)
                if (reaction._emoji.name == emoji.get_emoji()){
                    interaction.channel.send(`Vous avez maitenant le role ${role} ${user.tag}`)
                    interaction.guild.members.cache.get(user.id).roles.add(role)
                }
                console.log(reaction._emoji.name)
            });
    
            collector.on('remove', (reaction, user) => {
                const pasderoles = message.guild.roles.cache.find(r => r.name === emoji.get_role().name)
                if (reaction._emoji.name == emoji.get_emoji()){
                    interaction.channel.send(`${user.tag} n'a plus le role ${pasderoles}`)
                    interaction.guild.members.cache.get(user.id).roles.remove(pasderoles)
                }
            });
        }
        await interaction.reply("message envoyé")
    }
}