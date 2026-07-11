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
    var jour, serveur, ms_on;
    
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'ping',
      		description: 'Get the bot latency / Obtenez la latence du bot',
      		options: [
    
          ]
      },{
          name: 'privee',
      		description: 'Force the change (galaxie_s9) / Forcer le changement (galaxie_s9)',
      		options: [
    
          ]
      },{
          name: 'setup',
      		description: 'First command to run / Première commande à faire',
      		options: [
    
          ]
      },{
          name: 'info',
      		description: 'All useful information / Toutes les informations utiles',
      		options: [
    
          ]
      },{
          name: 'help',
      		description: 'Bot commands list / Les commandes du bot',
      		options: [
    
          ]
      },{
          name: 'invite',
      		description: 'Invite the bot / Invitez le bot',
      		options: [
    
          ]
      },{
          name: 'support',
      		description: 'Join the support server / Rejoignez le serveur de support',
      		options: [
    
          ]
      },{
          name: 'add-an-event',
      		description: 'Add a name or logo change event',
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
    
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    s4d.client.on('ready', async () => {
      jour = ((new Date().getDate()));
      if (((new Date().getHours())) < 4) {
        jour = ((new Date().getDate())) - 1;
      }
      s4d.client.channels.cache.get('1413899996691955755').send({content:String('Démarrage du bot...')});
    
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
        if (jour != ((new Date().getDate()))) {
          jour = ((new Date().getDate()));
          eventEmitter.emit('1');
        }
        ms_on = (s4d.client.uptime);
        s4d.client.channels.cache.get('1387514903778295940').send({content:String((['Ping :**',s4d.client.ws.ping,'\n','**Temps de fonctionnement **',Math.round(ms_on / 3600000),'** heures.'].join('')))});
    
                  console.log('ran')
              }
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup' && (typeof (interaction.guild).channels.cache.find((category) => category.name === 'log-logoto') !== undefined) && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
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
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Aide de Logoto - Automatisez votre image !**','\n','====================================','\n','<:track_next:1505295937856213072> **Je suis le bot spécialisé dans l\'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**','\n','###','\n','<:track_next:1505295937856213072> Les commandes','\n','* **`/setup`** : Crée les salons nécessaires (Logoto, log-logoto) pour un démarrage rapide mais aussi obligatoire pour le bon fonctionnement du bot.','\n','* **`/add-an-event`** : Crée un salon de changement de logo avec les options [type] (obligatoire) pour le type d\'événement (logo/name), [day] (Obligatoire) indique le jour du changement, [month] (Obligatoire) indique le mois de changement.','\n','* **`/help`** : Affiche ce message d\'aide.','\n','* **`/invite`** : Invitez le bot dans votre serveur.','\n','* **`/support`** : Rejoignez le serveur de support.','\n','<:link:1505215573364047913> [Website](https://logoto.onrender.com/), [Help page](<https://logoto.onrender.com/help>)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'invite') {
        await interaction.reply({ content: (['<:serremains:1505250979430531134> **Invite the bot**','\n','<:track_next:1505295937856213072> Invite the bot to your server using this link:','\n','<:track_next:1505295937856213072> Inviter le bot grâce au lien sur votre serveur :','\n','-# <:link:1505215573364047913> [Discord bot](https://discord.com/oauth2/authorize?client_id=1431383390162124920)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'info') {
        await interaction.reply({ content: (['<:track_next:1505295937856213072> **Information** ','\n','\n',`<:monde:1525532891155534007> **English**
        <:link:1505215573364047913> [Website](<https://logoto.onrender.com/>) • [Support Server](<https://discord.gg/TPXFVYVnXe>)
        <:link:1505215573364047913> [Terms of Service](<https://logoto.onrender.com/tos>) • [Privacy Policy](<https://logoto.onrender.com/privacy>)`,'\n','\n',`<:monde:1525532891155534007> **Français**
        <:link:1505215573364047913> [Site Web](<https://logoto.onrender.com/>) • [Serveur Support](<https://discord.gg/TPXFVYVnXe>)
        <:link:1505215573364047913> [Conditions d'Utilisation](<https://logoto.onrender.com/tos>) • [Confidentialité](<https://logoto.onrender.com/privacy>)`].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: (['<:ping:1505250928008237057> **',s4d.client.ws.ping,'ms.**','\n','-# <:link:1505215573364047913> [Status](<https://logoto.betteruptime.com/>)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'support') {
        await interaction.reply({ content: (['<:serremains:1505250979430531134> **Support server**','\n','<:track_next:1505295937856213072> Join the support server if you need help:','\n','<:track_next:1505295937856213072> Rejoignez le serveur de support si vous avez besoin d\'aide :','\n','-# <:link:1505215573364047913> [Support server](https://discord.gg/TPXFVYVnXe)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'privee' && ((interaction.member).id) == '746069923465527339') {
        await interaction.reply({ content: '<:asterisk:1505250975282106469> C\'est bon retournement de situation !', ephemeral: true, components: [] });
        eventEmitter.emit('1');
      } else if ((interaction.commandName) == 'privee' && ((interaction.member).id) != '746069923465527339') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> You do not have permission to use this command.','\n','<:regional_indicator_x:1505250983436091634> Vous ne possédez pas les permissions pour utiliser cette commande.'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'add-an-event' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create(([interaction.options.getString('type'),'-',interaction.options.getInteger('day'),'-',interaction.options.getInteger('month')].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logoto') }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });if ((interaction.options.getString('type')) == 'n') {
            (cat).send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All that remains is to put the name in the subject of this channel to finalize the programming of the server change.','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre le nom dans le sujet de ce salon pour finaliser la programmation du changement du serveur.'].join('')))});
          } else {
            (cat).send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All that remains is to put the direct url of an image to finalize the programming of the server change in the subject of this room.','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre l\'url directe d\'une image pour finaliser la programmation du changement du serveur dans le sujet de ce salon.','\n','-# <:link:1505215573364047913> [More information](<https://logoto.onrender.com/help#evenement>)'].join('')))});
          }
          await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All you have to do now is follow the instructions in the channel:','\n','<:track_next:1505295937856213072> Il ne vous reste plus qu\'à suivre les instructions dans le salon :','\n','-# <:track_next:1505295937856213072> ',cat].join('')), ephemeral: true, components: [] });
        });} else if ((interaction.commandName) == 'add-an-event') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Your highest role must contain the following permissions to run this command: Server Owner or Admin or Manage Server.','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contient les permissions suivant pour faire cette commande : Proprietaire du serveur ouAdmin ou Gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
    
        });
    
    eventEmitter.on('1', async => {
          s4d.client.guilds.cache.forEach(async (s) =>{
         if ((s).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) != null) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> l-Loading')});
        }
        if ((s).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) != null) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> n-Loading')});
        }
        if ((s).channels.cache.find((category) => category.name === (['b-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) != null) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> b-Loading')});
        }
        if ((s).channels.cache.find((category) => category.name === (['i-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) != null) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:boucle:1505199788235292772> i-Loading')});
        }
        await delay(Number(2)*1000);
    
      })
    
      });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot ajouté dans **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannel).send({content:String((['<:loudspeaker:1505590722798293253> **Thank you for adding me**','\n','Logoto is a Discord bot that automates the changing of your server\'s icon and name.','\n','<:track_next:1505295937856213072> To get started, run the following command: </setup:1431390983215386674>','\n','Logoto est un bot Discord qui automatiser le changement de l\'icône et du nom de votre serveur.','\n','<:track_next:1505295937856213072> Pour commencer, exécutez la commande suivante : </setup:1431390983215386674>'].join('')))});
      await delay(Number(0.1)*1000);
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannel).messages.fetch({ limit: 1 }).then(async (last_messages_in_channel) => {
            (s4d.client.users.cache.get(String((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId))))).send({content:String((['<:loudspeaker:1505590722798293253> **I thank the ',s4dguild.name,'\'s Discord server team.**','\n','<:track_next:1505295937856213072> For more information, please visit my website or my support server.','\n','<:track_next:1505295937856213072> Pour plus d\'information vous avez mon site internet et mon serveurs de support.','\n','-# <:link:1505215573364047913> [Website](https://logoto.onrender.com/), [Support server](https://discord.gg/TPXFVYVnXe), https://discord.com/channels/','\n','<:track_next:1505295937856213072> **Continue :** https://discord.com/channels/',s4dguild.id,'/',((last_messages_in_channel.at(1 - 1)).channel).id,'/',(last_messages_in_channel.at(1 - 1)).id].join('')))});
    
      });
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '<:boucle:1505199788235292772> l-Loading') {
        (s4dmessage.guild).setIcon(((s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de logo.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server logo changed.')});
        console.log((['Logo du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '<:boucle:1505199788235292772> n-Loading') {
        (s4dmessage.guild).setName(((s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de nom.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server name changed.')});
        console.log((['Nom du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['b-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '<:boucle:1505199788235292772> b-Loading') {
        (s4dmessage.guild).setBanner(((s4dmessage.guild).channels.cache.find((category) => category.name === (['b-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de bannière.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server banner changed.')});
        console.log((['Bannier du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['i-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '<:boucle:1505199788235292772> i-Loading') {
        (s4dmessage.guild).setSplash(((s4dmessage.guild).channels.cache.find((category) => category.name === (['i-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement d\'image d\'invitation.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server invite image changed.')});
        console.log((['Image d\'invitation du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if (((s4dmessage).content) == '!ping') {
        ms_on = (s4d.client.uptime);
        s4dmessage.channel.send({content:String((['<:ping:1505250928008237057> **',s4d.client.ws.ping,'ms.**','\n','Uptime :**',Math.round(ms_on / 60000),' minutes.**'].join('')))});
      }
    
    });
    
    s4d.client.on('guildDelete', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot enlevé de **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
      (s4d.client.users.cache.get(String((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId))))).send({content:String((['Bye bye',s4dguild.name,'\'s Discord server team.**','\n','<:track_next:1505295937856213072> To re-add the bot','\n','-# <:link:1505215573364047913> [Website](<https://logoto.onrender.com/>) • [Bot](https://discord.com/oauth2/authorize?client_id=1431383390162124920)'].join('')))});
    
    });
    
    return s4d
})();