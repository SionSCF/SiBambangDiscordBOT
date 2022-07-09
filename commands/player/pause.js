const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),
    async execute(interaction) {
        await interaction.deferReply();

        const player = interaction.client.player
        const queue = player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(true);
        return void interaction.followUp({ content: paused ? "⏸ | Paused!" : "❌ | Something went wrong!" });
    }
}