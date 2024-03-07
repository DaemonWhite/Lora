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

    async execute(interaction) {
        let msg = new EmbedBuilder()
            .setColor(0x00e7e3)
            .setTitle("Rôle")
        for (let i = 0; i < reaction.recuperer_taille(); i++) {
            let react = reaction.recuperer_reaction(i)
            msg.addFields({name:' ', value: `${react.get_role()} ${react.get_description()} ${react.get_emoji()}`})       
        }
        await interaction.send()
        let emoji = interaction.options.getString('emoji')
        message.react(emoji)
        const collector = message.createReactionCollector({dispose: true})

        collector.on('collect', (reaction, user) =>{
            const role = message.guild.roles.cache.find(reaction => reaction.name === "Il est la... toujours la...")
            interaction.guild.members.cache.get(user.id).roles.add(role)
            interaction.channel.send(`Vous avez maitenant le role ${role} ${user.tag}`)
        });

        collector.on('remove', (reaction, user) => {
            const pasderoles = message.guild.roles.cache.find(r => r.name === "Il est la... toujours la...")
            interaction.guild.members.cache.get(user.id).roles.remove(pasderoles)
            interaction.channel.send(`${user.tag} n'a plus le role ${pasderoles}`)
        });
    }
}