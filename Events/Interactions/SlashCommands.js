const { Client, ChatInputCommandInteraction } = require("discord.js");
const { OwnerID } = require("../../config.json")
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This Command is OutDated",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== OwnerID)
      return interaction.reply({
        content: "This commands is only available to developers",
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);

    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );
      if (!subCommandFile) {
        return interaction.reply({ content: "This subcommand is outdated" });
      }
      subCommandFile.execute(interaction, client);
    } else command.execute(interaction, client);
  },
};
