const { loadFiles } = require("../utils/fileLoader");
const { REST, Routes } = require('discord.js');

async function loadCommands(client) {
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Commands", "Status");

    await client.commands.clear();

    let listCommands = [];

    const Files = await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
            listCommands.push(command.data.toJSON())
            table.addRow(command.data.name, "OK");
        } else {
            table.addRow(file, "error")
        }

    });

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {
            console.log(`Started refreshing ${listCommands.length} application (/) commands.`);
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(process.env.APP_ID),
                { body: listCommands },
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error("Registre command Error : ", error);
        }
    })();

    return console.table(listCommands, ["name", "Status"])
}

module.exports = { loadCommands }
