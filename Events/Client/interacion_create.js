const { Events} = require('discord.js');

const {MusicManager} = require('../../utils/music');
const {ReactionManager} = require('../../utils/reaction.js');
const {GestionReaction, GestionGuildReaction} = require('../../utils/gestion_reaction.js');

const player = new MusicManager();
const reaction_manager = new ReactionManager();
//const reaction = new GestionReaction();
const gestionguildreaction = new GestionGuildReaction();

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
                interaction.commandName == "next" ||
                interaction.commandName == "get_playlist"
            ) {
                await command.execute(interaction, player);
            } else if (
                interaction.commandName == "create_subscribe_role" ||
                interaction.commandName == "add_subscribe_role" || 
                interaction.commandName == "publish_user_role"
            ) {
                await command.execute(interaction, reaction_manager);
            } else if(
                interaction.commandName == "message"||
                interaction.commandName == "publier" 
            ) {
                await command.execute(interaction, gestionguildreaction);
            
            }else {
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