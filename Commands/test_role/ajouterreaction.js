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

    async execute(interaction, reaction) {
        let msg = new EmbedBuilder()
            .setColor(0x00e7e3)
            .setTitle("Rôle")
        for (let i = 0; i < reaction.recuperer_taille(); i++) {
            let react = reaction.recuperer_reaction(i)
            msg.addFields({name:' ', value: `${react.get_role()} ${react.get_description()} ${react.get_emoji()}`})       
        }
        let channel = interaction.options.getChannel("channel")
        let message = await channel.send({embeds:[msg]})

        const collector = message.createReactionCollector({dispose: true})

        for (let i = 0; i < reaction.recuperer_taille(); i++) {
            let emoji = reaction.recuperer_reaction(i)
            message.react(emoji.get_emoji())
            console.log(emoji.get_emoji())
            
            collector.on('collect', (reaction, user) =>{
                const role = message.guild.roles.cache.find(reaction => reaction.name === emoji.get_role().name)
                interaction.guild.members.cache.get(user.id).roles.add(role)
                if (reaction._emoji.name == emoji.get_emoji()){
                    interaction.channel.send(`Vous avez maitenant le role ${role} ${user.tag}`)
                }
                console.log(reaction._emoji.name)
            });
    
            collector.on('remove', (reaction, user) => {
                const pasderoles = message.guild.roles.cache.find(r => r.name === emoji.get_role().name)
                interaction.guild.members.cache.get(user.id).roles.remove(pasderoles)
                if (reaction._emoji.name == emoji.get_emoji()){
                    interaction.channel.send(`${user.tag} n'a plus le role ${pasderoles}`)
                }
            });
        }
        await interaction.reply("message envoyé")
    }
}