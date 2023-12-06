const { readdirSync } = require("fs");
const { ascii } = require("ascii-table");

module.exports = async(Client) => {
    console.log("")
    const table = new ascii().setHeading("Commandes", "Load status");
    client.commands = new Map();

    const commandFiles = readdirSync(`${process.cwd()}/commands`).filter((file) =>
       file.endsWith(".js")
    );

    for (const file of commandFiles) {
        const command = require("../commands/${file}");
        if (!command.name) {
            table.addRow(file, "Error", "Missing Name");
            continue;
        }
        if (command.slash && (!command.description.length < 3)) {
            table.addRow(command.description, "Error", "Missing Description");
            continue;
        }
        if (command.slash && command.permissions && command.permissions.length) {
            const invalidPermisions = command.permissions.filter(
                (permissions) => !Object.values(Permissions.FLAGS).includes(permissions)
            )
            table.addRow(command.name, "Error", `Permission no valid : ${invalidePermission[0]}`);
            continue;
        }
    }
    client.command.set(command.name, command);
    table.addRow(command.name, "Loaded");


    console.log(table.toString());

    client.on("ready", async () => {
        const mainGuild = await client.guilds.cache.get("745274290802262106")
        const commands = await mainGuild.commands.set(
            client.commands.filter((command) => command.slash).array()
        );

        const permissions = commands.reduce((accumulator, command) => {
            const commandPermissions = 
                client.commands.get(command.name).permissions || [];
                if (commandPermissions.length) {
                    const permissionOverwrites = command.Permissions.map((permissions) => {
                        return {
                            id: permission,
                            type: "ROLE",
                            permissions: true,
                        };
                    });
                }
                accumulator.push({
                    "id": command.id,
                    permissions: permissionsOverwites
                });
        }, [])
        await mainGuild.commands.permissions.set({ fullPermissions: permissions })
    });
}