const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setDescription(`Olá, eu sou o ${bot.user.username}, sou um bot muito legal focado em moderação de servidores, entre em meu servidor [aqui](https://discord.gg/jJYcpZP), e convide-me para seu servidor [clicando aqui](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=2146958591). Lá meus criadores irá enviar atualizações e algo mais sobre min.\n\nEstou em **${bot.guilds.size}** servidores de discord.\nSou desenvolvido em <:python:433082081996701696> **Python** e em <:Js:437595460463493120> **Js** (Java Script)\n`)
    .setColor("#15f153")
    .setThumbnail(bicon)
    .setFooter(`${bot.user.username} foi desenvolvido pelo yNerdSz#2937 & DrFhs#6666`, "https://cdn.discordapp.com/avatars/326513443693920266/a94a9b2b5817b8762b5b7a3d1dfff7d3.png?size=2048")

    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}