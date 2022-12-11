const { loadCommands } = require("../../Handlers/commandHandler")
const chalk = require("chalk")
module.exports = {
    name: "ready",
    once: "true",
    execute(client) {
        console.log(chalk.green(`Logined as ${client.user.tag}`))
        client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`)



    console.log(chalk.red("A FULLL MUSIC SYSTEM MADE BY TECHNOLOGY POWER"))
loadCommands(client);
        
    }
}