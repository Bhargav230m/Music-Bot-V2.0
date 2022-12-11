require("discord-player/smoothVolume");
var {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { AudioFilters, QueryType } = require("discord-player");
module.exports = {
  subCommand: "music.play",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    // Make sure the user is inside a voice channel
    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: ":x:, You need to be in a Voice Channel",
        ephemeral: true,
      });

    // Create a play queue for the server
    const queue = await client.player.createQueue(interaction.guild);

    // Wait until you are connected to the channel
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    // Search for the song using the discord-player
    let url = interaction.options.getString("searchterms");
    const result = await client.player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    // finish if no tracks were found
    if (result.tracks.length === 0)
      return interaction.reply({ content: "No results", ephemeral: true });
    var audiofilter = interaction.options.getString("audio-filter");
    // later, it can be used like this
    if (audiofilter == "1D") {
      AudioFilters.define("1D", "apulsator=hz=0.128");
      queue.setFilters({ "1D": true });
    }
    if (audiofilter == "3D") {
      AudioFilters.define("3D", "apulsator=hz=0.128");
      queue.setFilters({ "3D": true });
    }
    if (audiofilter == "8D") {
      AudioFilters.define("8D", "apulsator=hz=0.128");
      queue.setFilters({ "8D": true });
    }
    if (audiofilter == "16D") {
      AudioFilters.define("16D", "apulsator=hz=0.128");
      queue.setFilters({ "16D": true });
    }
    if (audiofilter == "32D") {
      AudioFilters.define("32D", "apulsator=hz=0.128");
      queue.setFilters({ "32D": true });
    }
    if (audiofilter == "64D") {
      AudioFilters.define("64D", "apulsator=hz=0.128");
      queue.setFilters({ "64D": true });
    }
    if (audiofilter == "100D") {
      AudioFilters.define("100D", "apulsator=hz=0.128");
      queue.setFilters({ "100D": true });
    }
    if (audiofilter == "500D") {
      AudioFilters.define("500D", "apulsator=hz=0.128");
      queue.setFilters({ "500D": true });
    }
    if (audiofilter == "1000D") {
      AudioFilters.define("1000D", "apulsator=hz=0.128");
      queue.setFilters({ "1000D": true });
    }
    if (audiofilter == "4000D") {
      AudioFilters.define("4000D", "apulsator=hz=0.128");
      queue.setFilters({ "4000D": true });
    }
    // Add the track to the queue
    const song = result.tracks[0];
    await queue.addTrack(song);
    const embed = new EmbedBuilder()
      .setDescription(
        `**[${song.title}](${song.url})** has been added to the Queue with ${audiofilter}`
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
    // Respond with the embed containing information about the player
    await interaction.reply({
      embeds: [embed],
    });
    // Play the song
    if (!queue.playing) await queue.play();
  },
};
