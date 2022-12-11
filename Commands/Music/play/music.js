require("discord-player/smoothVolume");
const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  subCommand: "music.options",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @returns
   */

  async execute(interaction, client) {
    var { guild, options } = interaction;
    var action = options.getString("action");
    // Get the current queue
    var queue = client.player.getQueue(guild);
    if (action == "pause") {
      if (!interaction.member.voice.channel)
        return interaction.reply({
          content: ":x:, You need to be in a Voice Channel",
          ephemeral: true,
        });
      // Check if the queue is empty
      if (!queue) {
        await interaction.reply({
          content: "There is no song playing",
          ephemeral: true,
        });
        return;
      }

      // Pause the current song
      queue.setPaused(true);

      await interaction.reply({ content: "Paused the song!", ephemeral: true });
    }
    if (action == "resume") {
      if (!interaction.member.voice.channel)
        return interaction.reply({
          content: ":x:, You need to be in a Voice Channel",
          ephemeral: true,
        });
      // Check if the queue is empty
      if (!queue) {
        await interaction.reply({
          content: "No songs in the queue",
          ephemeral: true,
        });
        return;
      }

      // Pause the current song
      queue.setPaused(false);

      await interaction.reply({
        content: "Player has been resumed",
        ephemeral: true,
      });
    }
    if (action == "skip") {
      if (!interaction.member.voice.channel)
        return interaction.reply({
          content: ":x:, You need to be in a Voice Channel",
          ephemeral: true,
        });
      // If there is no queue, return
      if (!queue) {
        await interaction.reply({
          content: "There are no songs in the queue",
          ephemeral: true,
        });
        return;
      }

      const currentSong = queue.current;

      // Skip the current song
      queue.skip(currentSong);

      // Return an embed to the user saying the song has been skipped

      const embed = new EmbedBuilder()
        .setDescription(`${currentSong.title} has been skipped!`)
        .setThumbnail(currentSong.thumbnail);
      interaction.reply({ embeds: [embed] });
    }
    if (action == "queue") {
      if (!interaction.member.voice.channel)
        return interaction.reply({
          content: ":x:, You need to be in a Voice Channel",
          ephemeral: true,
        });
      // check if there are songs in the queue
      if (!queue || !queue.playing) {
        await interaction.reply({
          content: "There are no songs in the queue",
          ephemeral: true,
        });
        return;
      }

      // Get the first 10 songs in the queue
      const queueString = queue.tracks
        .slice(0, 10)
        .map((song, i) => {
          return `${i}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`;
        })
        .join("\n");

      // Get the current song
      const currentSong = queue.current;

      const embed = new EmbedBuilder()
        .setDescription(
          `**Currently Playing**\n` +
            (currentSong
              ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>`
              : "None") +
            `\n\n**Queue**\n${queueString}`
        )
        .setThumbnail(currentSong.setThumbnail);

      interaction.reply({ embeds: [embed] });
    }
    if (action == "exit") {
      if (!interaction.member.voice.channel)
        return interaction.reply({
          content: ":x:, You need to be in a Voice Channel",
          ephemeral: true,
        });
      if (!queue) {
        await interaction.reply({
          content: "There is no song playing",
          ephemeral: true,
        });
        return;
      }

      // Deletes all the songs from the queue and exits the channel
      queue.destroy();

      await interaction.reply({
        content: "Stopped playing the song",
        ephemeral: true,
      });
    }
  },
};
