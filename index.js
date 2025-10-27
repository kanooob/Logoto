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
    let URL = require('url')
    const ms = require("ms")
    let https = require("https")
    var eventEmitter = new events.EventEmitter();
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
    var day, ms_on;
    
    
    s4d.client.on('ready', async () => {
      day = ((new Date().getDate())) - 1;
      s4d.client.channels.cache.get('1413899996691955755').send({content:String('Démarrage du bot...')});
    
              while(s4d.client && s4d.client.token) {
                  await delay(50);
                    s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,' membres, ',s4d.client.guilds.cache.size,' serveurs.'].join('')),type:"WATCHING"}]});
        if (day != ((new Date().getDate()))) {
          eventEmitter.emit('logo');
          await delay(Number(1)*1000);
          eventEmitter.emit('logo-annee');
          day = ((new Date().getDate()));
        }
        await delay(Number(180)*1000);
        ms_on = (s4d.client.uptime);
        s4d.client.channels.cache.get('1387514903778295940').send({content:String((['Ping :**',s4d.client.ws.ping,'\n','**Temps de fonctionnement **',Math.round(ms_on / 3600000),'** heures.'].join('')))});
    
                  console.log('ran')
              }
    
    });
    
    await s4d.client.login((process.env[String('token')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Ce bot à été créé le 24/10/2025');
    });
    server.listen(3000);
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'setup',
      		description: 'Première commande a faire',
      		options: [
    
          ]
      },{
          name: 'help',
      		description: 'Les commandes du bot',
      		options: [
    
          ]
      },{
          name: 'invite',
      		description: 'Invitez le bot',
      		options: [
    
          ]
      },{
          name: 'support',
      		description: 'Rejoigniez le serveur de support',
      		options: [
    
          ]
      },{
          name: 'logo-add',
      		description: 'Ajoutez un nouveau changement de logo',
      		options: [
              {
            type: 4,
        	name: 'day',
            required: true,
        	description: 'Le jour du changement',
            choices: [
    
            ]
        },{
            type: 4,
        	name: 'month',
            required: true,
        	description: 'Le mois du changement',
            choices: [
    
            ]
        },{
            type: 4,
        	name: 'year',
            required: false,
        	description: 'Le année du changement',
            choices: [
    
            ]
        },
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup') {
        (interaction.guild).channels.create('Logo', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create(([(new Date().getDate()),'-',((new Date().getMonth())) + 1].join('')), { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(`**C'est bientôt fini !**
            Il vous reste plus qu'à mettre le lien d'une image dans le sujet sur salon, il faut que le lien soit une url discord
            -# (elle doit commencer par https://cdn.discordapp.com/attachments).
    
            **It's almost over!**
            All that's left is to add a link to an image in the thread in the chat room. The link must be a Discord URL
            -# (it must begin with https://cdn.discordapp.com/attachments).`)});
            await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
          });});
      }
      if ((interaction.commandName) == 'help') {
        await interaction.reply({ content: `Aide de Logoto - Automatisez votre Logo !
        ====================================
    
        **Je suis le bot spécialisé dans l'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**
    
        ###
        Les commandes
    
        * **\`/setup\`** : Crée un salon de démonstration pour comprendre le fonctionnement et démarrer rapidement la configuration.
        * **\`/logo-add\`** : Crée un salon de changement de logo avec les options day (Obligatoire, pour le jour), month (Obligatoire, pour le mois), year (Facultatif, pur l'année).
        * **\`/help\`** : Affiche ce message d'aide.
        * **\`/invite\`** : Invitez le bot dans votre serveurs.
        * **\`/support\`** : Rejoigniez le serveur de support.
    
        ###
        Système de changement de logo automatique
    
        Le bot surveille un salon pour planifier les changements de logo. Voici comment le configurer manuellement :
    
        1. **Créez le Salon de Planification :**
            * Le nom du salon doit être au format suivant : \`[JOUR]-[MOIS]-[ANNÉE (facultatifs)]\`
            * **EXEMPLE :** Pour un logo qui changera le 31 décembre (2025) sur un serveur : \`31-12\`/\`31-12-2025\`
    
        2. **Préparez le Logo :**
            * Envoyez votre image de logo sur n'importe quel salon Discord et **copiez son lien direct**.
    
        3. **Planifiez le Changement :**
            * Modifiez le **Sujet du Salon** que vous avez créé à l'étape 1.
            * Collez le **lien** de votre image dans le sujet du salon.
    
        4. Résultat :
            * Le bot changera automatiquement le logo du serveur au jour et au mois spécifiés dans le nom du salon (à 00:00 UTC) !`, ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'invite') {
        await interaction.reply({ content: `Voici le lien pour ajouter le bot : [lien](https://discord.com/oauth2/authorize?client_id=1431383390162124920)
    
        Here is the link to add the bot: [link](https://discord.com/oauth2/authorize?client_id=1431383390162124920)`, ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'support') {
        await interaction.reply({ content: `Voici le lien pour rejoindre le serveur de support : [lien](https://discord.gg/TPXFVYVnXe)
    
        Here is the link to join the support server: [link](https://discord.gg/TPXFVYVnXe)`, ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'logo-add') {
        (interaction.guild).channels.create(([interaction.options.getInteger('day'),'-',interaction.options.getInteger('month'),'-',interaction.options.getInteger('year')].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logo') }).then(async cat =>{  (cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(`**C'est bientôt fini !**
          Il vous reste plus qu'à mettre le lien d'une image dans le sujet sur salon, il faut que le lien soit une url discord
          -# (elle doit commencer par https://cdn.discordapp.com/attachments).
    
          **It's almost over!**
          All that's left is to add a link to an image in the thread in the chat room. The link must be a Discord URL
          -# (it must begin with https://cdn.discordapp.com/attachments).`)});
          await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
        });}
    
        });
    
    eventEmitter.on('logo', async => {
          s4d.client.guilds.cache.forEach(async (s) =>{
         (s).setIcon((s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de logo.')
    
        console.log((['Changement de logo du serveur : ',(s).name,' (',(s).id,').'].join('')));
        s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).send({content:String(([`✅ **Le logo du serveur à été mis à jour !**
        Action :Changer le logo du serveur.
        Date :`,[(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''),`
        Nouveau Logo :`,s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic].join('')))});
    
      })
    
      });
    
    eventEmitter.on('logo-annee', async => {
          s4d.client.guilds.cache.forEach(async (s) =>{
         (s).setIcon((s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(new Date().getFullYear())].join(''))).topic),'changement de logo.')
    
        console.log((['Changement de logo du serveur : ',(s).name,' (',(s).id,').'].join('')));
        s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(new Date().getFullYear())].join(''))).send({content:String(([`✅ **Le logo du serveur à été mis à jour !**
        Action :Changer le logo du serveur.
        Date :`,[(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(new Date().getFullYear())].join(''),`
        Nouveau Logo :`,s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(new Date().getFullYear())].join(''))).topic].join('')))});
    
      })
    
      });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot ajouté dans **',s4dguild.name,'** (',s4dguild.id,').'].join('')))});
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannelId).send({content:String(([`###
      Merci d'avoir ajouté le bot.`,'\n',`Pour la première utilisation faite /setup
      Puis pour les autres changements de logo faite /logo-add`].join('')))});
    
    });
    
    return s4d
})();