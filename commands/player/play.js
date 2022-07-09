const { QueryType } = require('discord-player');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a song from YT')
        .addStringOption(option =>
            option.setName('option')
            .setDescription('YT link or title')
            .setRequired(true)
        ),
    async execute(interaction) {
        const player = interaction.client.player
        await interaction.deferReply();

        const query = interaction.options.get('option').value;
        const searchResult = await player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {});
        if (!searchResult || !searchResult.tracks.length) return void interaction.followUp({ content: "Oh no, daddy! Bambang could not find what you're looking for :point_right: :point_left:" });

        var queue = await player.getQueue(interaction.guildId)
        if(!queue) {
            queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });
        }

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            void player.deleteQueue(interaction.guildId);
            return void interaction.followUp({ content: "Whoopsie! Sorry papi, but Bambang could not join your voice channel uwu" });
        }

        await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
}