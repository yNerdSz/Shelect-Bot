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

bot.login(process.env.Token);
