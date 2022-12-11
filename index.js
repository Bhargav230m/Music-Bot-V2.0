const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

require("discord-player/smoothVolume");
const { Player } = require("discord-player");

require("discord-player/smoothVolume");
const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildVoiceStates,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
  ],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();
loadEvents(client);
const player = new Player(client);
player.on("trackStart", (queue, track) =>
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
);

// Add the player on the client
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

client.login(client.config.token);
