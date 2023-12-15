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

/* description_role 
 user_id : {
  array : {description, role, emote}
 }
*/
client.description_role = {};



const { loadEvents } = require("./Handlers/event");

loadEvents(client);

client.login(process.env.DISCORD_TOKEN);
