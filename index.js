//REQUIRE
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { Player } = require('discord-player');

//Creating a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

//Command files init config
client.player = new Player(client);
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
const musicPlayersPath = path.join(__dirname, 'commands/player');
const musicPlayerFiles = fs.readdirSync(musicPlayersPath).filter(file => file.endsWith('.js'))

commandsFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)

    //Setting a new item in the collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
});

musicPlayerFiles.forEach(file => {
    const musicPlayerPath = path.join(musicPlayersPath, file);
    const musicPlayerCommand = require(musicPlayerPath);

    client.commands.set(musicPlayerCommand.data.name, musicPlayerCommand);
});

playerInit(client)

//Event files init config
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.forEach(eventFile => {
    const filePath = path.join(eventsPath, eventFile);
    const event = require(filePath)

    if(event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args))
});

//Log in the BOT to Discord
client.login(process.env.DISCORD_TOKEN);



//Initiating Music Player
function playerInit(client) {
    client.player.on("trackStart", (queue, track) => {
        queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
    });
    
    client.player.on("trackAdd", (queue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    });
    
    client.player.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    });
    
    client.player.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
    });
    
    client.player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Queue finished!");
    });
}