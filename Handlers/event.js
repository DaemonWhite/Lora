const { loadFiles } = require ("../utils/fileLoader")

async function loadEvents(client) {
    console.time("Event loaded");

    client.events = new Map();
    const events = new Array();
    const files = await loadFiles("Events");

    for (const file of files) {
        try {
            const event = require(file);
            const execute = (...args) => event.execute(...args, client);

            const target = event.rest ? client.rest : client;
            target[event.once ? "once" : "on"](event.name, execute);
            client.events.set(event.name);
            
            events.push({Event: event.name, Status: "OK"});
        } catch (error) {
            events.push({Event: file.split("/").pop().slice(0, -3), Status: `Error ${error}`});
        }
    }
    
    console.table(events, ["Event", "Status"]);
    console.info("\n\x1b[36m%s\x1b[0m", "Loaded Events");
    console.timeEnd("Event loaded");
}

module.exports = { loadEvents }