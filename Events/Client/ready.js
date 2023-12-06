const { loadCommands } = require("../../Handlers/commands");


module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        loadCommands(client);
        client.user.setActivity(`Je manipule ta vie Billy`)
        console.log("Connected")
    }
}