(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.16.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    

    // blockly code
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Ce bot à été créé le 04/10/2025');
    });
    server.listen(3000);
    
    await s4d.client.login((process.env[String('token')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('ready', async () => {
      s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,' membres, ',s4d.client.guilds.cache.size,' serveur.'].join('')),type:"WATCHING"}]});
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup') {
        (interaction.guild).channels.create('Logo', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create(([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(interaction.guild).id].join('')), { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String('Mettez le lien du logo dans le sujet du salon')});
          });});
        await interaction.reply({ content: 'Mettez le lien du logo dans le sujet du salon', ephemeral: false, components: [] });
      }
    
        });
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'setup',
      		description: 'Première commande a faire',
      		options: [
    
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
            if (s4dmessage.author.bot) {
                return;
            }
              (s4dmessage.guild).setIcon('https://cdn.discordapp.com/attachments/1430138683784298608/1431372030179152084/Donkey_Kong_Bananza_wallpaper_1920x1080.jpg?ex=68fd2c95&is=68fbdb15&hm=6515825426777c7a4a4d26a0cfd2634893ddc8d9b0f67c6011909bc04cfa04fe','Car c\'est comme ça.')
    
      if ((s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s4dmessage.guild).id].join(''))).topic) == '-') {
      }
    
        });
    
    return s4d
})();