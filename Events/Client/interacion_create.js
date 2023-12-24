const { Events} = require('discord.js');

const {MusicManager} = require('../../utils/music');
const {ReactionManager} = require('../../utils/reaction.js');

const player = new MusicManager();
const reaction_manager = new ReactionManager();

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        console.log(interaction.commandName);

        try {
            if (
                interaction.commandName == "play" || 
                interaction.commandName == "stop" ||
                interaction.commandName == "next" 
            ) {
                await command.execute(interaction, player);
            } else if (
                interaction.commandName == "create_subscribe_role" ||
                interaction.commandName == "add_subscribe_role"
            ) {
                await command.execute(interaction, reaction_manager);
            } else {
                await command.execute(interaction);
            }
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}