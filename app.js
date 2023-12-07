require('dotenv').config();

const { Client, Collection, Events, Partials } = require('discord.js');
const { User, Message, GuildMember, ThreadMembers } = Partials
const client = new Client({
  intents: 3276799, 
  partials: [User, Message, GuildMember, ThreadMembers]
});

client.commands = new Collection();
client.subcommands = new Collection();
client.events = new Collection();
client.memberGuildConfig = new Collection();
client.messageGuildConfig = new Collection();

const { loadEvents } = require("./Handlers/event");

loadEvents(client);

client.on('disconnect', (event) => {
  console.log(`Bot disconnected with code ${event.code}.`);
  // Code pour gérer la déconnexion, par exemple, redémarrer le bot, enregistrer des données, etc.
});

client.login(process.env.DISCORD_TOKEN);
