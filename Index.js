const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: false});
bot.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Não foi possível encontrar a package: comandos.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./comandos/${f}`);
    console.log(`${f} carregado com sucesso!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} foi iniciado com sucesso! ${bot.user.tag} E está em ${bot.guilds.size} servidores.`);
  console.log(`Prefixo: ${botconfig.prefix}`)
  bot.user.setActivity(`${botconfig.prefix}ajuda`, {type: "WATCHING"}); // Jogando = PLAYING | Transmitindo = STREAMING | Assistindo = WATCHING | Ouvindo = LISTENING |

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});


bot.on("guildCreate", guild => {
   const entrei = new Discord.RichEmbed()
      .setAuthor(`${guild.name} | Adicionado`)
      .setDescription(`Entrei no servidor **${guild.name}** (id: ${guild.id})`)
      .addField("Membros", `Com **${guild.memberCount}** membros`)
      .addField("Dono", `${guild.owner} (ID: ${guild.owner.id})`)
      .setTimestamp()
      .setColor("00e7ff")

  
   bot.channels.get("429844744110211072").send(entrei);
});

bot.login("NDE0NjM5MjQ1OTMyNzU2OTky.DcuqBw.hBA6T0q_GiGaM3_6sfZ2fac_3w8");
