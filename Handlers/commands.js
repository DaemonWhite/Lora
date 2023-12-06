const { loadFiles } = require("../utils/fileLoader");

async function loadCommands(client) {
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Commands", "Status");

    await client.commands.clear();
    let commandsArray = [];

    const Files = await loadFiles("Commands");

    Files.forEach((Files) => {
        const command = require(file);
        client.commands.set(command.data.toJSON());
        table.addRow(command.data.name, "OK");
    });

    client.application.commands.set(commandsArray);
    return console.log(table.toString(), "\nCommands Loaded")
}

module.exports = { loadCommands }