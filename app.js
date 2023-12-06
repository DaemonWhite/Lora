require('dotenv').config();

const { Client, Collection, Partials } = require('discord.js');
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

client.login(process.env.DISCORD_TOKEN);
