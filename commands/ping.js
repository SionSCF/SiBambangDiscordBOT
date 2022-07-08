const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data:  new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(interaction) {
        await interaction.reply(`Pong! 🏓 Latency is ${ Date.now() - interaction.createdTimestamp }ms. API Latency is ${ Math.round(interaction.client.ws.ping) }ms`); 
    },
};

// 