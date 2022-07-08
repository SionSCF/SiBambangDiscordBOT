const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data:  new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies server info!'),
    async execute(interaction) {
        await interaction.reply(`You are currently in ${ interaction.guild.name }\n Total member of this server is: ${ interaction.guild.memberCount }`);
    },
};