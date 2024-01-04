const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { mongoConnectionUrl, prefix, token } = require('./config');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect(mongoConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates
	],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

const fs = require('fs');
const collections = ['commands', 'aliases', 'slashCommands', 'buttons', 'modals', 'menus'];
collections.forEach(name => client[name] = new Collection());

client.prefix = prefix;
module.exports = client;

fs.readdirSync(path.join(__dirname, 'handlers')).forEach((handler) => {
	const handlerPath = path.join(__dirname, 'handlers', handler);
	require(handlerPath)(client);
  });

client.login(token)
