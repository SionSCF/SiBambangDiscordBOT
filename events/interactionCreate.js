const rfs = require('rotating-file-stream');
const path = require('node:path');

const stream = rfs.createStream('interaction.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command) return;

        try {
            await command.execute(interaction)
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'Oopsie whoopsie, Bambang is too sussy baka to execute this command uwu',
            ephmeral: true })
        }

        stream.write(`${interaction.user.tag} called ${interaction.commandName} in ${interaction.channel.name}!\n`)
    }
}