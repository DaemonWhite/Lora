const { loadCommands } = require("../../Handlers/commands");
const { Events} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        loadCommands(client);
        client.user.setActivity(`Je manipule ta vie Billy`)
        console.log(`Ready! Logged in as ${client.user.tag}`)
    }
}