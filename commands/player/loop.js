const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loop the list')
        .addIntegerOption(option => 
            option.setName('mode')
            .setDescription('looptype')
            .setRequired(true)
            .addChoices({
                name: 'Off',
                value: QueueRepeatMode.OFF
            }, {
                name: 'Track',
                value: QueueRepeatMode.TRACK
            }, {
                name: 'Queue',
                value: QueueRepeatMode.QUEUE
            }, {
                name: 'Autoplay',
                value: QueueRepeatMode.AUTOPLAY
            })),
    async execute(interaction) {
        await interaction.deferReply();

        const player = interaction.client.player
        const queue = player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });

        const loopMode = interaction.options.get("mode").value;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";

        return void interaction.followUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
    }
}