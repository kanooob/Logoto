const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Bot Logoto en ligne !');
});

app.listen(port, () => {
  console.log(`Serveur de vérification activé sur le port ${port}`);
});
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
    const os = require("os-utils");
    const ms = require("ms")
    let https = require("https")
    var eventEmitter = new events.EventEmitter();
    const S4D_APP_PKG_axios = require('axios')
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
    var heure, start_unix, fuseau_horaire, ms_on, jour_fuseau, serveur, mois_fuseau;
    
    function mathRandomInt(a, b) {
      if (a > b) {
        // Swap a and b to ensure a is smaller.
        var c = a;
        a = b;
        b = c;
      }
      return Math.floor(Math.random() * (b - a + 1) + a);
    }
    
    
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if (((s4dmessage.author).id) == '1431383390162124920' && ((((s4dmessage).content) || '').startsWith('<:boucle:1505199788235292772>' || ''))) {
      } else {
        return
      }
      await delay(Number((mathRandomInt(4, 50)))*1000);
      if (((s4dmessage).content) == '<:boucle:1505199788235292772> l-Loading') {
        (s4dmessage.guild).setIcon(((s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))).topic),'changement de logo.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server logo changed.')});
        console.log((['Logo du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if (((s4dmessage).content) == '<:boucle:1505199788235292772> n-Loading') {
        (s4dmessage.guild).setName(((s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))).topic),'changement de nom.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server name changed.')});
        console.log((['Nom du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if (((s4dmessage).content) == '<:boucle:1505199788235292772> b-Loading') {
        (s4dmessage.guild).setBanner(((s4dmessage.guild).channels.cache.find((category) => category.name === (['b-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))).topic),'changement de bannière.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server banner changed.')});
        console.log((['Bannier du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if (((s4dmessage).content) == '<:boucle:1505199788235292772> i-Loading') {
        (s4dmessage.guild).setSplash(((s4dmessage.guild).channels.cache.find((category) => category.name === (['i-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))).topic),'changement d\'image d\'invitation.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server invite image changed.')});
        console.log((['Image d\'invitation du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
    
    });
    
    eventEmitter.on('1', async => {
          S4D_APP_PKG_axios({
              method: "get",
              url: 'https://logoto.onrender.com/api/fuzeau00h',
    
              headers: {
    
              },
    
            })
            .then(async (response) => {
                fuseau_horaire = (response.data);
        S4D_APP_PKG_axios({
                method: "get",
                url: 'https://logoto.onrender.com/api/jour00h',
    
                headers: {
    
                },
    
              })
              .then(async (response) => {
                  jour_fuseau = (response.data);
          S4D_APP_PKG_axios({
                  method: "get",
                  url: 'https://logoto.onrender.com/api/mois00h',
    
                  headers: {
    
                  },
    
                })
                .then(async (response) => {
                    mois_fuseau = (response.data);
            s4d.client.guilds.cache.forEach(async (s) =>{
               if (((s).channels.cache.find((category) => category.name === 'log-logoto').topic) == null && '+0' == String(fuseau_horaire)) {
              } else if (((s).channels.cache.find((category) => category.name === 'log-logoto').topic) == String(fuseau_horaire)) {
              } else {
                return
              }
              if ((s).channels.cache.find((category) => category.name === (['l-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))) != null) {
                (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> l-Loading')});
              }
              if ((s).channels.cache.find((category) => category.name === (['n-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))) != null) {
                (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> n-Loading')});
              }
              if ((s).channels.cache.find((category) => category.name === (['b-',String(jour_fuseau),'-',String(mois_fuseau)].join(''))) != null) {
                (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> b-Loading')});
              }
              if ((s).channels.cache.find((category) => category.name === (['i-',String(jour_fuseau),'-',String(jour_fuseau)].join(''))) != null) {
                (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> i-Loading')});
              }
    
            })
    
                })
                .catch(async (err) => {
                    console.log((err));
    
                });
    
              })
              .catch(async (err) => {
                  console.log((err));
    
              });
    
            })
            .catch(async (err) => {
                console.log((err));
    
            });
    
      });
    
    s4d.client.on('ready', async () => {
      heure = ((new Date().getUTCHours()));
      start_unix = (Math.floor(new Date().getTime()/1000));
      s4d.client.channels.cache.get('1413899996691955755').send({content:String('Démarrage du bot...')});
      if (((new Date().getUTCMinutes())) < 10) {
        heure = ((new Date().getUTCHours())) - 1;
      }
    
              while(s4d.client && s4d.client.token) {
                  await delay(50);
                    serveur = 'https://logoto.onrender.com/api/serveur-counte?server=' + String(s4d.client.guilds.cache.size);
        S4D_APP_PKG_axios({
                method: "post",
                url: serveur,
    
                headers: {
                     'key': (process.env[String('SECRET_KEY')]),
    
                },
    
              })
              .then(async (response) => {
    
              })
              .catch(async (err) => {
                  console.log((err));
    
              });
            s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,' members, ',s4d.client.guilds.cache.size,' servers.'].join('')),type:"WATCHING"}]});
        await delay(Number(180)*1000);
        if (heure != ((new Date().getUTCHours()))) {
          heure = ((new Date().getUTCHours()));
          eventEmitter.emit('1');
        }
        ms_on = (s4d.client.uptime);
        s4d.client.channels.cache.get('1387514903778295940').send({content:String((['Ping :**',s4d.client.ws.ping,'\n','**Temps de fonctionnement :**',Math.round(ms_on / 3600000),'** heures'].join('')))});
    
                  console.log('ran')
              }
    
    });
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'ping',
      		description: 'Get the bot latency / Obtenez la latence du bot',
      		options: [
    
          ]
      },{
          name: 'setup',
      		description: 'First command to run / Première commande à faire',
      		options: [
    
          ]
      },{
          name: 'about',
      		description: 'Display information about Logoto',
      		options: [
    
          ]
      },{
          name: 'help',
      		description: 'Bot commands list / Les commandes du bot',
      		options: [
    
          ]
      },{
          name: 'add-an-event',
      		description: 'Add a name/logo/banner/image invite change event',
      		options: [
              {
            type: 3,
        	name: 'type',
            required: true,
        	description: 'The type of change',
            choices: [
                  {
              name: String('logo'),
              value: String('l')
          },{
              name: String('name'),
              value: String('n')
          },{
              name: String('banner'),
              value: String('b')
          },{
              name: String('invite image'),
              value: String('i')
          },
            ]
        },{
            type: 4,
        	name: 'day',
            required: true,
        	description: 'Change day',
            choices: [
    
            ]
        },{
            type: 4,
        	name: 'month',
            required: true,
        	description: 'Change month',
            choices: [
    
            ]
        },
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup' && (interaction.guild).channels.cache.find((category) => category.name === 'log-logoto') != null && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs and actions forum already exists:',(interaction.guild).channels.cache.find((category) => category.name === 'log-logoto'),'\n','<:track_next:1505295937856213072> Le salon des logs et des actions existe déjà :',(interaction.guild).channels.cache.find((category) => category.name === 'log-logoto')].join('')), ephemeral: true, components: [] });
      } else if ((interaction.commandName) == 'setup' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create('Logoto', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create('log-logoto', { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String((['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs channel has been created. You will see the server changes made by the bot in this channel. (Please do not change the channel name.) Now you just need to run this command </add-an-event:1505515202072805377> to create an automation.','\n','<:track_next:1505295937856213072> Le salon des logs a été créé. Vous obtiendrez les actions de changement du serveur fait par le bot dans ce salon. (Veuillez ne pas changer le nom du salon.) Maintenant vous avez juste à faire cette commande </add-an-event:1505515202072805377> pour créer une automatisation.'].join('')))});
             (s4d.client.guilds.cache.get('1431674445428166806')).channels.cache.get('1433135924228784348').addFollower((cat), String('follow the project'))
            await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs and actions will take place here:',cat,'\n','<:track_next:1505295937856213072> Le salon des logs et du suivi des actions se trouve ici :',cat].join('')), ephemeral: true, components: [] });
            (cat).messages.fetch({ limit: 1 }).then(async (last_messages_in_channel) => {
                  (last_messages_in_channel.at(1 - 1)).pin()
            });
          });});
      } else if ((interaction.commandName) == 'setup') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Your highest role must contain the following permissions to run this command: Server Owner or Admin or Manage Server.','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contenir au moins une des permissions suivantes pour faire cette commande : Propriétaire du serveur ou Admin ou Gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'help') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Logoto Help - Automate your server\'s look!**','\n','\n','<:track_next:1505295937856213072> I am the specialized bot for automating your server\'s logo changes, requiring zero complex commands after the initial setup.','\n','Easily schedule updates to keep your server\'s visual identity fresh!','\n','###','\n','<:track_next:1505295937856213072> Commands','\n','- </setup:1431390983215386674> : Creates the required channels (Logoto, log-logoto) for a quick start, essential for the bot to function properly.','\n','- </add-an-event:1505515202072805377> : Creates an event channel with options: [type] (required) for the event type (logo/name/banner/image invite), [day] (required) for the change day, and [month] (required) for the change month.','\n','- </help:1431390984805290037> : Displays this help message.','\n','- </about:1525904003295350885> : Shows information about the bot, invite links, and support options.','\n','- </ping:1433569876399624395> : Get the bot\'s latency and status page.','\n','<:link:1505215573364047913> [Website](<https://logoto.onrender.com/>), [Help page](<https://logoto.onrender.com/help>)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'about') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **About Logoto**','\n','\n','<:bot:1505482896268329050> **The best Discord bot to automatically update and schedule your server\'s visual identity.**','\n','Simple scheduling and 100% autonomous customization of your server\'s logo, name, banner and invite image.','\n','\n','<:monde:1525532891155534007> **Resources**','\n','[Site Web](<https://logoto.onrender.com/>) • [Serveur Support](<https://discord.gg/TPXFVYVnXe>)','\n','[Conditions d\'Utilisation](<https://logoto.onrender.com/tos>) • [Politique de Confidentialité](<https://logoto.onrender.com/privacy>)','\n','\n','<:bot:1505482896268329050> **Need help or want to invite the bot ?**','\n','**[Invite Logoto to your server](<https://discord.com/oauth2/authorize?client_id=1431383390162124920>)**','\n','**[Join the Support Server](<https://discord.gg/TPXFVYVnXe>)**','\n','\n','<:ping:1505250928008237057> Start <t:',start_unix,':R>, [statut](<https://logoto.betteruptime.com/>)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: (['<:ping:1505250928008237057> **',s4d.client.ws.ping,'ms.**','\n','-# <:link:1505215573364047913> [Status](<https://logoto.betteruptime.com/>)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'add-an-event' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create(([interaction.options.getString('type'),'-',interaction.options.getInteger('day'),'-',interaction.options.getInteger('month')].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logoto') }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });if ((interaction.options.getString('type')) == 'n') {
            (cat).send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All that remains is to put the name in the subject of this channel to finalize the programming of the server change.','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre le nom dans le sujet de ce salon pour finaliser la programmation du changement du serveur.'].join('')))});
          } else {
            (cat).send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All that remains is to put the direct url of an image to finalize the programming of the server change in the subject of this room.','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre l\'url directe d\'une image pour finaliser la programmation du changement du serveur dans le sujet de ce salon.','\n','-# <:link:1505215573364047913> [More information](<https://logoto.onrender.com/help#events>)'].join('')))});
          }
          await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All you have to do now is follow the instructions in the channel:','\n','<:track_next:1505295937856213072> Il ne vous reste plus qu\'à suivre les instructions dans le salon :','\n','-# <:track_next:1505295937856213072> ',cat].join('')), ephemeral: true, components: [] });
        });} else if ((interaction.commandName) == 'add-an-event') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Your highest role must contain the following permissions to run this command: Server Owner or Admin or Manage Server.','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contient les permissions suivant pour faire cette commande : Proprietaire du serveur ouAdmin ou Gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
    
        });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
            if (s4dmessage.author.bot) {
                return;
            }
              if (((s4dmessage).content) == '!ping') {
        ms_on = (s4d.client.uptime);
        s4dmessage.channel.send({content:String((['<:ping:1505250928008237057> **',s4d.client.ws.ping,'ms.**','\n','Uptime :**',Math.round(ms_on / 60000),' minutes.**'].join('')))});
      }
      if (((s4dmessage).content) == '!746069923465527339-all' && (s4dmessage.author.id) == '746069923465527339') {
        eventEmitter.emit('1');
        (s4d.client.users.cache.get(String('746069923465527339'))).send({content:String('Declancher pour tous les serveur')});
        (s4dmessage).delete()
            } else if (((s4dmessage).content) == '!746069923465527339-salon' && (s4dmessage.author.id) == '746069923465527339') {
        (s4d.client.users.cache.get(String('746069923465527339'))).send({content:String((['**Voici tous les salons de ',(s4dmessage.guild).id,'\n','.**'].join('')))});
        (s4dmessage.guild).channels.cache.forEach(async (c) =>{
           (s4d.client.users.cache.get(String('746069923465527339'))).send({content:String(([c.name,' (',(c).id,').'].join('')))});
    
        })
        (s4dmessage).delete()
            } else if (((s4dmessage).content) == '!746069923465527339-help' && (s4dmessage.author.id) == '746069923465527339') {
        (s4d.client.users.cache.get(String('746069923465527339'))).send({content:String((['**Commande privée**','\n',`
        !746069923465527339-all (déclenche le changement de DA pour tous le serveur)
        !746069923465527339-salon (Obtenez tous les salons d'un serveur)
        !746069923465527339-help (ce message)
        !746069923465527339-test-ici (envoie un test sur se erveur)
        !746069923465527339-message (envoie un message dans le salon actuel)
    
        Si quelqu'un voit ça c'est juste pour dire que c'est utilisé pour du debug.`].join('')))});
        (s4dmessage).delete()
            } else if (((s4dmessage).content) == '!746069923465527339-test-ici' && (s4dmessage.author.id) == '746069923465527339') {
        (s4dmessage.guild).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> l-Loading')});
        (s4dmessage.guild).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> n-Loading')});
        (s4dmessage.guild).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> b-Loading')});
        (s4dmessage.guild).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> i-Loading')});
        (s4dmessage.guild).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('This is a test that works the same way for the reaction part (action: <:loop:1505199788235292772> l-Loading | reaction: <:check:1505215575822172170> Server logo changed.)')});
        (s4d.client.users.cache.get(String('746069923465527339'))).send({content:String(('Teste de déclanchement envoyé sur ' + String((s4dmessage.guild).id)))});
        (s4dmessage).delete()
            } else if (((((s4dmessage).content) || '').startsWith('!746069923465527339-message' || '')) && (s4dmessage.author.id) == '746069923465527339') {
        s4dmessage.channel.send({content:String((String(((s4dmessage).content)).replaceAll('!746069923465527339-message', String(''))))});
        (s4dmessage).delete()
            }
    
        });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot ajouté dans **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannel).send({content:String((['<:loudspeaker:1505590722798293253> **Thank you for adding me**','\n','Logoto is a Discord bot that automates the changing of your server\'s icon and name.','\n','<:track_next:1505295937856213072> To get started, run the following command: </setup:1431390983215386674>','\n','Logoto est un bot Discord qui automatiser le changement de l\'icône et du nom de votre serveur.','\n','<:track_next:1505295937856213072> Pour commencer, exécutez la commande suivante : </setup:1431390983215386674>'].join('')))});
      await delay(Number(0.1)*1000);
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannel).messages.fetch({ limit: 1 }).then(async (last_messages_in_channel) => {
            (s4d.client.users.cache.get(String((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId))))).send({content:String((['<:loudspeaker:1505590722798293253> **I thank the ',s4dguild.name,' Discord server team.**','\n','<:track_next:1505295937856213072> For more information, please visit my website or my support server.','\n','<:track_next:1505295937856213072> Pour plus d\'information vous avez mon site internet et mon serveurs de support.','\n','-# <:link:1505215573364047913> [Website](<https://logoto.onrender.com/>), [Support server](<https://discord.gg/TPXFVYVnXe>)','\n','<:track_next:1505295937856213072> **Continue :** https://discord.com/channels/',s4dguild.id,'/',((last_messages_in_channel.at(1 - 1)).channel).id,'/',(last_messages_in_channel.at(1 - 1)).id].join('')))});
    
      });
    
    });
    
    s4d.client.on('guildDelete', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot enlevé de **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
    
    });
    
    return s4d
})();