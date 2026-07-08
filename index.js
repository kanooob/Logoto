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
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    
    // define s4d components
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

    var jour, ms_on;
    
    await s4d.client.login((process.env[String('TOKEN')])).catch((e) => {
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    synchronizeSlashCommands(s4d.client, [
      { name: 'ping', description: 'Get the bot latency / Obtenez la latence du bot', options: [] },
      { name: 'privee', description: 'Force the change (galaxie_s9) / Forcer le changement (galaxie_s9)', options: [] },
      { name: 'setup', description: 'First command to run / Première commande à faire', options: [] },
      { name: 'info', description: 'All useful information / Toutes les informations utiles', options: [] },
      { name: 'help', description: 'Bot commands list / Les commandes du bot', options: [] },
      { name: 'invite', description: 'Invite the bot / Invitez le bot', options: [] },
      { name: 'support', description: 'Join the support server / Rejoignez le serveur de support', options: [] },
      {
          name: 'add-an-event',
      		description: 'Add a name or logo change event',
      		options: [
            {
                type: 3,
                name: 'type',
                required: true,
                description: 'The type of change',
                choices: [
                    { name: String('logo'), value: String('l') },
                    { name: String('name'), value: String('n') }
                ]
            },
            { type: 4, name: 'day', required: true, description: 'Change day', choices: [] },
            { type: 4, name: 'month', required: true, description: 'Change month', choices: [] }
          ]
      },
    ], { debug: false });
    
    s4d.client.on('ready', async () => {
      jour = ((new Date().getDate()));
      if (((new Date().getHours())) < 4) {
        jour = ((new Date().getDate())) - 1;
      }
      s4d.client.channels.cache.get('1413899996691955755')?.send({content:String('Démarrage du bot...')});
    
      while(s4d.client && s4d.client.token) {
        await delay(50);
        s4d.client.user.setPresence({status: "online", activities:[{name:([s4d.client.users.cache.size,'members, ',s4d.client.guilds.cache.size,'servers.'].join('')),type:"WATCHING"}]});
        await delay(Number(180)*1000);
        if (jour != ((new Date().getDate()))) {
          jour = ((new Date().getDate()));
          eventEmitter.emit('1');
        }
        ms_on = (s4d.client.uptime);
        s4d.client.channels.cache.get('1387514903778295940')?.send({content:String((['Ping :**',s4d.client.ws.ping,'\n','**Temps de fonctionnement **',Math.round(ms_on / 3600000),'** heures.'].join('')))});
        console.log('ran')
      }
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const hasPerms = (interaction.member.roles.highest.permissions.has('MANAGE_GUILD') || interaction.member.roles.highest.permissions.has('ADMINISTRATOR') || String(interaction.guild.ownerId) === interaction.member.id);

      if (interaction.commandName === 'setup') {
        if (!hasPerms) {
            return await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Your highest role must contain the following permissions to run this command: Server Owner or Admin or Manage Server.','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contenir au moins une des permissions suivantes pour faire cette commande : Propriétaire du serveur ou Admin ou Gérer le serveur.'].join('')), ephemeral: true });
        }

        const existingChannel = interaction.guild.channels.cache.find((c) => c.name === 'log-logoto');
        if (existingChannel) {
            return await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs and actions forum already exists: ', existingChannel,'\n','<:track_next:1505295937856213072> Le salon des logs et des actions existe déjà : ', existingChannel].join('')), ephemeral: true });
        }

        interaction.guild.channels.create('Logoto', { type: 'GUILD_CATEGORY' }).then(async cat => {  
            interaction.guild.channels.create('log-logoto', { type: "GUILD_TEXT", parent: cat }).then(async logChan =>{  
                logChan.permissionOverwrites.edit(s4d.client.users.cache.get('1431383390162124920'), { VIEW_CHANNEL: true });
                logChan.permissionOverwrites.edit(interaction.guild.roles.everyone, { VIEW_CHANNEL: false });
                logChan.send({content:String((['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs channel has been created...','\n','<:track_next:1505295937856213072> Le salon des logs a été créé...'].join('')))});
                
                logChan.messages.fetch({ limit: 1 }).then(async (messages) => { messages.first()?.pin(); });
                s4d.client.guilds.cache.get('1431674445428166806')?.channels.cache.get('1433135924228784348')?.addFollower(logChan, 'follow the project');
                
                await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs and actions will take place here: ', logChan,'\n','<:track_next:1505295937856213072> Le salon des logs et du suivi des actions se trouve ici : ', logChan].join('')), ephemeral: true });
            });
        });
      }

      if (interaction.commandName === 'help') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Aide de Logoto - Automatisez votre Logo !**','\n','====================================','\n','<:track_next:1505295937856213072> **Je suis le bot spécialisé dans l\'automatisation du changement de logo de votre serveur...**','\n','###','\n','<:track_next:1505295937856213072> Les commandes','\n','* **`/setup`** : Crée les salons nécessaires...','\n','* **`/add-an-event`** : Crée un salon de changement de logo...','\n','* **`/help`** : Affiche ce message d\'aide.','\n','* **`/invite`** : Invitez le bot dans votre serveur.','\n','* **`/support`** : Rejoignez le serveur de support.','\n','<:link:1505215573364047913> [Website home](https://logoto.onrender.com/), [Help page](https://logoto.onrender.com/help)'].join('')), ephemeral: false });
      }
      if (interaction.commandName === 'invite') {
        await interaction.reply({ content: (['<:serremains:1505250979430531134> **Invite the bot**','\n','<:track_next:1505295937856213072> Invite the bot to your server using this link:','\n','<:track_next:1505295937856213072> Inviter le bot grâce au lien sur votre serveur :','\n','-# <:link:1505215573364047913> [Discord bot](https://discord.com/oauth2/authorize?client_id=1431383390162124920)'].join('')), ephemeral: false });
      }
      if (interaction.commandName === 'info') {
        await interaction.reply({ content: (['<:track_next:1505295937856213072> **Useful links**','\n','<:link:1505215573364047913> [Website](https://logoto.onrender.com/), [Support Server](https://discord.gg/TPXFVYVnXe), [ToS](https://logoto.onrender.com/tos), [Privacy Policy](https://logoto.onrender.com/privacy).'].join('')), ephemeral: false });
      }
      if (interaction.commandName === 'ping') {
        await interaction.reply({ content: (['<:ping:1505250928008237057> **',s4d.client.ws.ping,'ms.**','\n','-# <:link:1505215573364047913> [Status](https://logoto.betteruptime.com/)'].join('')), ephemeral: false });
      }
      if (interaction.commandName === 'support') {
        await interaction.reply({ content: (['<:serremains:1505250979430531134> **Support server**','\n','<:track_next:1505295937856213072> Rejoignez le serveur de support si vous avez besoin d\'aide :','\n','-# <:link:1505215573364047913> [Discord server](https://discord.gg/TPXFVYVnXe)'].join('')), ephemeral: false });
      }

      if (interaction.commandName === 'privee') {
        if (interaction.member.id === '746069923465527339') {
            await interaction.reply({ content: '<:asterisk:1505250975282106469> C\'est bon retournement de situation !', ephemeral: true });
            eventEmitter.emit('1');
        } else {
            await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Vous ne possédez pas les permissions pour utiliser cette commande'].join('')), ephemeral: true });
        }
      }

      if (interaction.commandName === 'add-an-event') {
        if (!hasPerms) {
            return await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contenir les permissions requises.'].join('')), ephemeral: true });
        }

        const parentCat = interaction.guild.channels.cache.find((c) => c.name === 'Logoto');
        interaction.guild.channels.create(([interaction.options.getString('type'),'-',interaction.options.getInteger('day'),'-',interaction.options.getInteger('month')].join('')), { type: "GUILD_TEXT", parent: parentCat }).then(async cat =>{  
            cat.permissionOverwrites.edit(s4d.client.users.cache.get('1431383390162124920'), { VIEW_CHANNEL: true });
            cat.permissionOverwrites.edit(interaction.guild.roles.everyone, { VIEW_CHANNEL: false });
            
            if (interaction.options.getString('type') === 'l') {
                cat.send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre l\'url directe d\'une image/logo dans le sujet du salon.'].join('')))});
            } else {
                cat.send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre le nom dans le sujet de ce salon.'].join('')))});
            }
            await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> Il ne vous reste plus qu\'à suivre les instructions dans le salon : ',cat].join('')), ephemeral: true });
        });
      }
    });
    
    eventEmitter.on('1', async () => {
      s4d.client.guilds.cache.forEach(async (s) => {
        const d = new Date().getDate();
        const m = new Date().getMonth() + 1;
        const logChan = s.channels.cache.find((c) => c.name === 'log-logoto');

        if (s.channels.cache.find((c) => c.name === `l-${d}-${m}`)) logChan?.send({content: '<:loop:1505215574387589162> l-Loading'});
        if (s.channels.cache.find((c) => c.name === `n-${d}-${m}`)) logChan?.send({content: '<:loop:1505215574387589162> n-Loading'});
        if (s.channels.cache.find((c) => c.name === `b-${d}-${m}`)) logChan?.send({content: '<:loop:1505215574387589162> b-Loading'});
        if (s.channels.cache.find((c) => c.name === `i-${d}-${m}`)) logChan?.send({content: '<:loop:1505215574387589162> i-Loading'});
        await delay(2000);
      });
    });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419')?.send({content: `Bot ajouté dans **${s4dguild.name}** (\`${s4dguild.id}\`).`});
      s4dguild.systemChannel?.send({content: `**Thank you for adding me**\nLogoto automates the changing of your server's icon and name.\nRun </setup:1431390983215386674> to start.`});
      
      await delay(100);
      s4dguild.systemChannel?.messages.fetch({ limit: 1 }).then(async (messages) => {
            s4d.client.users.cache.get(String(s4dguild.ownerId))?.send({content: `Merci à l'équipe du serveur ${s4dguild.name}.\nPlus d'infos sur le site ou le support.`});
      });
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if (!s4dmessage.guild) return;
      const d = new Date().getDate();
      const m = new Date().getMonth() + 1;

      if (s4dmessage.content === '<:loop:1505215574387589162> l-Loading') {
        const target = s4dmessage.guild.channels.cache.find((c) => c.name === `l-${d}-${m}`);
        if (target && target.topic) {
            await s4dmessage.guild.setIcon(target.topic, 'changement de logo.');
            s4dmessage.channel.send({content: '<:check:1505215575822172170> Server logo changed.'});
        }
      }
      if (s4dmessage.content === '<:loop:1505215574387589162> n-Loading') {
        const target = s4dmessage.guild.channels.cache.find((c) => c.name === `n-${d}-${m}`);
        if (target && target.topic) {
            await s4dmessage.guild.setName(target.topic, 'changement de nom.');
            s4dmessage.channel.send({content: '<:check:1505215575822172170> Server name changed.'});
        }
      }
      if (s4dmessage.content === '<:loop:1505215574387589162> b-Loading') {
        const target = s4dmessage.guild.channels.cache.find((c) => c.name === `b-${d}-${m}`);
        if (target && target.topic) {
            await s4dmessage.guild.setBanner(target.topic, 'changement de bannière.');
            s4dmessage.channel.send({content: '<:check:1505215575822172170> Server banner changed.'});
        }
      }
      if (s4dmessage.content === '<:loop:1505215574387589162> i-Loading') {
        const target = s4dmessage.guild.channels.cache.find((c) => c.name === `i-${d}-${m}`);
        if (target && target.topic) {
            await s4dmessage.guild.setSplash(target.topic, "changement d'image d'invitation.");
            s4dmessage.channel.send({content: '<:check:1505215575822172170> Server invite image changed.'});
        }
      }
      if (s4dmessage.content === '!ping') {
        ms_on = (s4d.client.uptime);
        s4dmessage.channel.send({content: `\n<:ping:1505250928008237057> **${s4d.client.ws.ping}ms.**\nUptime :**${Math.round(ms_on / 60000)} minutes.**`});
      }
    });
    
    s4d.client.on('guildDelete', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419')?.send({content: `Bot enlevé de **${s4dguild.name}** (\`${s4dguild.id}\`).`});
    });
    
    return s4d
})();
