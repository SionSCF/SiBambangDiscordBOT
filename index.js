//REQUIRE
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');

//Creating a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

commandsFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)

    //Setting a new item in the collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
});

client.once('ready', () => {
    console.log('Si Bambang is ready!');
});

//Replying to commands
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: 'Oopsie whoopsie, Bambang is too sussy baka to execute this command uwu', 
        ephemeral: true });
    }
});

//Log in the BOT to Discord
client.login(process.env.DISCORD_TOKEN);