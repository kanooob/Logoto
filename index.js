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
    let URL = require('url')
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
    var day;
    
    
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
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup') {
        (interaction.guild).channels.create('Logo', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create(([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(interaction.guild).id].join('')), { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(`🤖 Aide de Logoto - Automatisez votre Logo ! ⚙️
            ===========================================
    
            **Je suis le bot spécialisé dans l'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**
    
            **🚀 Démarrage Rapide**
    
            * **\`/setup\`** : Crée un salon de démonstration pour comprendre le fonctionnement et démarrer rapidement la configuration.
            * **\`/help\`** : Affiche ce message d'aide.
            * **\`/invite\`** : Invitez le bot dans votre serveurs.
            * **\`/support\`** : Rejoigniez le serveur de support.
    
    
            **🖼️ Système de Changement de Logo Automatique**
    
            Le bot surveille un salon pour planifier les changements de logo. Voici comment le configurer manuellement :
    
            1. **Créez le Salon de Planification :**
                * Le nom du salon doit être au format suivant : \`[JOUR]-[MOIS]-[ID du Serveur]\`
                * **EXEMPLE :** Pour un logo qui changera le 31 décembre sur un serveur (il faut pas mettre cette id) : \`31-12-1287003115291414619\`
    
            2. **Préparez l'Image (le Logo) :**
                * Envoyez votre image de logo sur n'importe quel salon Discord et **copiez son lien direct (URL)**.
    
            3. **Planifiez le Changement :**
                * Modifiez le **Sujet du Salon** que vous avez créé à l'étape 1.
                * Collez le **lien direct (URL)** de votre image dans le sujet du salon.
    
            4. Résultat :
                * Le bot changera automatiquement le logo du serveur au jour et au mois spécifiés dans le nom du salon !`)});
            await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
          });});
      }
      if ((interaction.commandName) == 'help') {
        await interaction.reply({ content: `🤖 Aide de Logoto - Automatisez votre Logo ! ⚙️
        ===========================================
    
        **Je suis le bot spécialisé dans l'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**
    
        **🚀 Démarrage Rapide**
    
        * **\`/setup\`** : Crée un salon de démonstration pour comprendre le fonctionnement et démarrer rapidement la configuration.
        * **\`/help\`** : Affiche ce message d'aide.
        * **\`/invite\`** : Invitez le bot dans votre serveurs.
        * **\`/support\`** : Rejoigniez le serveur de support.
    
    
        **🖼️ Système de Changement de Logo Automatique**
    
        Le bot surveille un salon pour planifier les changements de logo. Voici comment le configurer manuellement :
    
        1. **Créez le Salon de Planification :**
            * Le nom du salon doit être au format suivant : \`[JOUR]-[MOIS]-[ID du Serveur]\`
            * **EXEMPLE :** Pour un logo qui changera le 31 décembre sur un serveur (il faut pas mettre cette id) : \`31-12-1287003115291414619\`
    
        2. **Préparez l'Image (le Logo) :**
            * Envoyez votre image de logo sur n'importe quel salon Discord et **copiez son lien direct (URL)**.
    
        3. **Planifiez le Changement :**
            * Modifiez le **Sujet du Salon** que vous avez créé à l'étape 1.
            * Collez le **lien direct (URL)** de votre image dans le sujet du salon.
    
        4. Résultat :
            * Le bot changera automatiquement le logo du serveur au jour et au mois spécifiés dans le nom du salon !`, ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'invite') {
        await interaction.reply({ content: 'Voici le lien pour ajouter le bot : [lien](https://discord.com/oauth2/authorize?client_id=1431383390162124920)', ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'support') {
        await interaction.reply({ content: 'Voici le lien pour rejoindre le serveur de support : [lien](https://discord.gg/TPXFVYVnXe)', ephemeral: false, components: [] });
      }
    
        });
    
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
      		description: 'Rejoigniez le serveur de support.',
      		options: [
    
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('ready', async () => {
      day = ((new Date().getDate()));
      s4d.client.channels.cache.get('1413899996691955755').send({content:String('Démarrage du bot...')});
    
              while(s4d.client && s4d.client.token) {
                  await delay(50);
                    s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,' membres, ',s4d.client.guilds.cache.size,' serveurs.'].join('')),type:"WATCHING"}]});
        s4d.client.guilds.cache.forEach(async (s) =>{
           (s).setIcon((s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s).id].join(''))).topic),'changement de logo.')
    
          s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s).id].join(''))).send({content:String((['<:Valide:1431646854193610823> **Logo du Serveur Mis à Jour !** Action : Le logo du serveur a été mis à jour automatiquement. Date :',[(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''),'Nouveau Logo :',s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s).id].join(''))).topic].join('')))});
          console.log((['Changement de logo du serveur : ',(s).name,' (',(s).id,').'].join('')));
    
        })
        day = ((new Date().getDate()));
        if (day != ((new Date().getDate()))) {
        }
        await delay(Number(180)*1000);
        s4d.client.channels.cache.get('1387514903778295940').send({content:String((['Ping :',s4d.client.ws.ping,'\n','Temps allumé :',s4d.client.uptime].join('')))});
    
                  console.log('ran')
              }
    
    });
    
    return s4d
})();