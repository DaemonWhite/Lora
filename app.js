require('dotenv').config();

const { Client, Collection, Partials } = require('discord.js');
const { User, Message, GuildMember, ThreadMembers } = require(Partials)
const client = new Client({
  intents: 3276799, 
  partials: [User, Message, GuildMember, ThreadMembers]
});

client.commands = new Collection();

["Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)
});

client.on('ready', () => {
  console.log(`Lora Started : ${client.user.tag}`)
});

client.login(process.env.DISCORD_TOKEN);
