const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Full music system")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Searches for a song and plays it")
        .addStringOption((option) =>
          option
            .setName("searchterms")
            .setDescription("search keywords")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        .setDescription("Plays a single song from YT")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("the song's url")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("options")
        .setDescription("Shows music options")
        .addStringOption((option) =>
          option
            .setName("action")
            .setDescription("actions")
            .addChoices(
              { name: "pause", value: "pause" },
              { name: "resume", value: "resume" },
              { name: "skip", value: "skip" },
              { name: "queue", value: "queue" },
              { name: "exit", value: "exit" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("play")
        .setDescription("Plays a music using a audio filter (8D, 16D)")
        .addStringOption((option) =>
          option
            .setName("searchterms")
            .setDescription("search keywords")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("audio-filter")
            .setDescription(
              "Use audio filters (headphones or earphones required)"
            )
            .addChoices(
              { name: "1D", value: "1D" },
              { name: "3D", value: "3D" },
              { name: "8D", value: "8D" },
              { name: "16D", value: "16D" },
              { name: "32D", value: "32D" },
              { name: "64D", value: "64D" },
              { name: "100D", value: "100D" },
              { name: "500D", value: "500D" },
              { name: "1000D", value: "1000D" },
              { name: "4000D", value: "4000D" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("volume")
        .setDescription("Set volume")
        .addNumberOption((option) =>
          option
            .setName("volume")
            .setDescription("volume (1 to 100)")
            .setMinValue(0)
            .setMaxValue(100)
            .setRequired(true)
        )
    ),
};
