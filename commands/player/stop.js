const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the player'),
    async execute(interaction) {
        await interaction.deferReply();
        const player = interaction.client.player

        const queue = player.getQueue(interaction.guildId);
        if(!queue || !queue.playing) return void interaction.followUp({ content: 'uwu Master, what are you trying to stop? *teehee :face_with_hand_over_mouth:' })
        queue.destroy();
        return void interaction.followUp({ content: 'Oh, you want me to stop singing. Okay... :pleading_face: :point_right: :point_left:' });
    }
}