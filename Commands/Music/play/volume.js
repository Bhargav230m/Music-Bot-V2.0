const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  subCommand: "music.volume",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    var queue = client.player.getQueue(interaction.guild);
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

    // Search for the song using the discord-player
    let volume = interaction.options.getNumber("volume");
    if (volume > 100) {
      return interaction.reply({
        content: "Volume can be in 1 to 100",
        ephemeral: true,
      });
    }
    queue.setVolume(volume);
    interaction.reply({ content: `Volume is now ${volume}%`, ephemeral: true });
  },
};
