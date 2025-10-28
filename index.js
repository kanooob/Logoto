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
    const S4D_APP_write = require('write');
    var eventEmitter = new events.EventEmitter();
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    const S4D_WEBSITECREATION_EXPRESS = require('express')
const S4D_WEBSITECREATION_bodyParser = require('body-parser');
const S4D_WEBSITECREATION_cors = require('cors');
var S4D_WEBSITECREATION_path = require('path');
const S4D_WEBSITECREATION_EXPRESS_app = S4D_WEBSITECREATION_EXPRESS();
    
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
    var jour, ms_on;
    
    
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
      jour = ((new Date().getDate())) - 1;
      s4d.client.channels.cache.get('1413899996691955755').send({content:String('Démarrage du bot...')});
    
              while(s4d.client && s4d.client.token) {
                  await delay(50);
                    s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,' membres, ',s4d.client.guilds.cache.size,' serveurs.'].join('')),type:"WATCHING"}]});
        await delay(Number(180)*1000);
        if (jour != ((new Date().getDate()))) {
          jour = ((new Date().getDate()));
          eventEmitter.emit('logo');
        }
        ms_on = (s4d.client.uptime);
        s4d.client.channels.cache.get('1387514903778295940').send({content:String((['Ping :**',s4d.client.ws.ping,'\n','**Temps de fonctionnement **',Math.round(ms_on / 3600000),'** heures.'].join('')))});
    
                  console.log('ran')
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
        },
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup') {
        (interaction.guild).channels.create('Logo', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create(([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(interaction.guild).id].join('')), { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(([`**C'est bientôt fini !**
            Il vous reste plus qu'à mettre le lien d'une image dans le sujet sur salon, il faut que le lien soit une url discord
            -# (elle doit commencer par https://cdn.discordapp.com/attachments).`,'\n',`**It's almost over!**
            All that's left is to add a link to an image in the thread in the chat room. The link must be a Discord URL
            -# (it must begin with https://cdn.discordapp.com/attachments).`].join('')))});
            await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
          });});
      }
      if ((interaction.commandName) == 'help') {
        await interaction.reply({ content: (['Aide de Logoto - Automatisez votre Logo !','\n','====================================','\n','**Je suis le bot spécialisé dans l\'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**','\n','###','\n','Les commandes','\n','* **`/setup`** : Crée un salon de démonstration pour comprendre le fonctionnement et démarrer rapidement la configuration.','\n','* **`/logo-add`** : Crée un salon de changement de logo avec les options day (Obligatoire, pour le jour), month (Obligatoire, pour le mois).','\n','* **`/help`** : Affiche ce message d\'aide.','\n','* **`/invite`** : Invitez le bot dans votre serveurs.','\n','* **`/support`** : Rejoigniez le serveur de support.','\n','###','\n','Système de changement de logo automatique','\n','Le bot surveille un salon pour planifier les changements de logo. Voici comment le configurer manuellement :','\n','Le bot surveille un salon pour planifier les changements de logo. Voici comment le configurer manuellement :','\n','1. **Créez le Salon de Planification :**','\n','* Le nom du salon doit être au format suivant : `[JOUR]-[MOIS]-[ID du serveur]`','\n','**EXEMPLE :** Pour un logo qui changera le 31 décembre (2025) sur un serveur : `31-12`/`31-12-2025`','\n','\n','2. **Préparez le Logo :**','\n',' * Envoyez votre image de logo sur n\'importe quel salon Discord et **copiez son lien direct**.','\n','\n','3. **Planifiez le Changement :**','\n','* Modifiez le **Sujet du Salon** que vous avez créé à l\'étape 1.','\n','* Collez le **lien** de votre image dans le sujet du salon.','\n','\n','4. Résultat :','\n','* Le bot changera automatiquement le logo du serveur au jour et au mois spécifiés dans le nom du salon ! ','\n','-# ||Le logo change quand un message est envoyés sur le serveur||','\n','For the English version of the help: [Here](https://logoto.onrender.com/help)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'invite') {
        await interaction.reply({ content: (['Voici le lien d\'invitation du bot Discord :[lien](https://discord.com/oauth2/authorize?client_id=1431383390162124920)','\n','Here is the link to add the bot: [link](https://discord.com/oauth2/authorize?client_id=1431383390162124920)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'support') {
        await interaction.reply({ content: (['Voici le lien vers le serveur de support :[lien](https://discord.gg/TPXFVYVnXe)','\n','Here is the link to the support server: [link](https://discord.gg/TPXFVYVnXe)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'logo-add') {
        (interaction.guild).channels.create(([interaction.options.getInteger('day'),'-',interaction.options.getInteger('month'),'-',(interaction.guild).id].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logo') }).then(async cat =>{  (cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(([`**C'est bientôt fini !**
          Il vous reste plus qu'à mettre le lien d'une image dans le sujet sur salon, il faut que le lien soit une url discord
          -# (elle doit commencer par https://cdn.discordapp.com/attachments).`,'\n',`**It's almost over!**
          All that's left is to add a link to an image in the thread in the chat room. The link must be a Discord URL
          -# (it must begin with https://cdn.discordapp.com/attachments).`].join('')))});
          await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
        });}
    
        });
    
    /* IMPORTED - S4D Website Hosting Dependencies */
    let S4D_APP_WEBSITE_HOSTING_PORT = 8080
    
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_cors());
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.urlencoded({
        extended: false
    }));
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.json());
    
      S4D_WEBSITECREATION_EXPRESS_app.all('/help', async function(req, res) {
          S4D_APP_write.sync(String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Aide de Logoto - Automatisez votre Logo</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 20px;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    max-width: 900px;
                    margin: auto;
                    background: #fff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #7289da; /* Couleur Discord */
                    border-bottom: 2px solid #7289da;
                    padding-bottom: 10px;
                }
                h2 {
                    color: #5865f2;
                    margin-top: 30px;
                }
                code {
                    background-color: #eee;
                    padding: 2px 4px;
                    border-radius: 4px;
                }
                .command-list {
                    list-style-type: none;
                    padding: 0;
                }
                .command-list li {
                    margin-bottom: 10px;
                }
                .note {
                    background-color: #fff3cd;
                    border-left: 5px solid #ffc107;
                    padding: 15px;
                    margin-top: 20px;
                    border-radius: 4px;
                }
                .lang-switch button {
                    background-color: #7289da;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-left: 10px;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }
                .lang-switch button:hover {
                    background-color: #5865f2;
                }
                .lang-switch {
                    text-align: center;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="lang-switch">
                    <button onclick="changeLanguage('fr')">Afficher en Français</button>
                    <button onclick="changeLanguage('en')">Display in English</button>
                </div>
    
                <div id="content-area">
                    </div>
            </div>
    
            <script>
                // --- Contenu Français ---
                const contentFR = \`
                    <h1>Aide de Logoto - Automatisez votre Logo ! 🇫🇷</h1>
                    <p>Je suis le bot spécialisé dans l'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.</p>
    
                    <h2>Les Commandes</h2>
                    <ul class="command-list">
                        <li><code>/setup</code> : Crée un salon de démonstration pour comprendre le fonctionnement et démarrer rapidement la configuration.</li>
                        <li><code>/logo-add</code> : Crée un salon de changement de logo avec les options <code>day</code> (Obligatoire, pour le jour) et <code>month</code> (Obligatoire, pour le mois).</li>
                        <li><code>/help</code> : Affiche ce message d'aide (ou cette page !).</li>
                        <li><code>/invite</code> : Obtenez le lien pour inviter le bot sur votre serveur.</li>
                        <li><code>/support</code> : Rejoignez le serveur de support pour toute question ou aide.</li>
                    </ul>
    
                    <h2>Système de Changement de Logo Automatique (Configuration Manuelle)</h2>
                    <p>Le bot surveille un salon spécifique pour planifier et exécuter les changements de logo. Voici comment le configurer manuellement :</p>
    
                    <ol>
                        <li>
                            Créez le Salon de Planification :
                            <ul>
                                <li>Le nom du salon doit être au format suivant : <code>[JOUR]-[MOIS]-[ID du serveur]</code></li>
                                <li>EXEMPLE : Pour un logo qui changera le 31 décembre sur un serveur : <code>31-12-010203040506070809</code></li>
                            </ul>
                        </li>
                        <li>
                            Préparez le Logo :
                            <ul>
                                <li>Envoyez votre image de logo sur n'importe quel salon Discord et copiez son lien direct.</li>
                            </ul>
                        </li>
                        <li>
                            Planifiez le Changement :
                            <ul>
                                <li>Modifiez le Sujet du Salon (Channel Topic) que vous avez créé à l'étape 1.</li>
                                <li>Collez le lien de votre image dans le sujet du salon.</li>
                            </ul>
                        </li>
                        <li>
                            Résultat :
                            <ul>
                                <li>Le bot changera automatiquement le logo du serveur au jour et au mois spécifiés dans le nom du salon !</li>
                            </ul>
                        </li>
                    </ol>
    
                    <div class="note">
                        NOTE IMPORTANTE : Le logo change lorsque un message est envoyé sur le serveur (n'importe quel message, par n'importe quel utilisateur). Cependant, le bot envoie lui-même un message discret en début de journée pour s'assurer que le changement se fasse, donc vous n'avez pas besoin de vous inquiéter.
                    </div>
                \`;
    
                // --- Contenu Anglais ---
                const contentEN = \`
                    <h1>Logoto Help - Automate your Logo! 🇬🇧</h1>
                    <p>I am the bot specialized in automating the change of your server's logo, without requiring complex commands after the initial setup.</p>
    
                    <h2>Commands</h2>
                    <ul class="command-list">
                        <li><code>/setup</code> : Creates a demonstration channel to understand the process and quickly start the configuration.</li>
                        <li><code>/logo-add</code> : Creates a logo change channel with the options <code>day</code> (Required) and <code>month</code> (Required).</li>
                        <li><code>/help</code> : Displays this help message (or this page!).</li>
                        <li><code>/invite</code> : Get the link to invite the bot to your server.</li>
                        <li><code>/support</code> : Join the support server for any questions or assistance.</li>
                    </ul>
    
                    <h2>Automatic Logo Change System (Manual Setup)</h2>
                    <p>The bot monitors a specific channel to schedule and execute logo changes. Here's how to configure it manually:</p>
    
                    <ol>
                        <li>
                            Create the Scheduling Channel:
                            <ul>
                                <li>The channel name must follow this format: <code>[DAY]-[MONTH]-[Server ID]</code></li>
                                <li>EXAMPLE: For a logo that will change on December 31st on a server: <code>31-12-010203040506070809</code></li>
                            </ul>
                        </li>
                        <li>
                            Prepare the Logo:
                            <ul>
                                <li>Upload your logo image to any Discord channel and copy its direct link.</li>
                            </ul>
                        </li>
                        <li>
                            Schedule the Change:
                            <ul>
                                <li>Edit the Channel Topic of the channel you created in step 1.</li>
                                <li>Paste the link of your image into the channel topic.</li>
                            </ul>
                        </li>
                        <li>
                            Result:
                            <ul>
                                <li>The bot will automatically change the server logo on the day and month specified in the channel name!</li>
                            </ul>
                        </li>
                    </ol>
    
                    <div class="note">
                        IMPORTANT NOTE: The logo changes when a message is sent on the server (any message, by any user). However, the bot sends a discreet message itself at the beginning of the day to ensure the change happens, so you don't need to worry.
                    </div>
                \`;
    
                /**
                 * Fonction pour changer le contenu de la page
                 * @param {string} lang - La langue à afficher ('fr' ou 'en')
                 */
                function changeLanguage(lang) {
                    const contentArea = document.getElementById('content-area');
                    if (lang === 'fr') {
                        contentArea.innerHTML = contentFR;
                        document.documentElement.lang = 'fr'; // Met à jour l'attribut lang de la page
                    } else if (lang === 'en') {
                        contentArea.innerHTML = contentEN;
                        document.documentElement.lang = 'en'; // Met à jour l'attribut lang de la page
                    }
                    // Remonte en haut de la page pour une meilleure UX
                    window.scrollTo(0, 0);
                }
    
                // Affiche le contenu français par défaut au chargement de la page
                document.addEventListener('DOMContentLoaded', () => {
                    changeLanguage('fr');
                });
            </script>
        </body>
        </html>`), String('help.html'), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('help.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.use(function(req, res) {
          res.send(String('Ce bot à été créé le 24/10/2025'))
        res.status(Number(404))
    
      })
    
    
    S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);
    eventEmitter.on('logo', async => {
          s4d.client.guilds.cache.forEach(async (s) =>{
         s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s).id].join(''))).send({content:String('🔁 Changement...')});
    
      })
    
      });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s4dmessage.guild).id].join(''))).messages.fetch({ limit: 1 }).then(async (last_messages_in_channel) => {
            if (((last_messages_in_channel.at(1 - 1)).content) != '✅ **Le logo du serveur à été mis à jour !** Action :Changer le logo du serveur. Date :' + String([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(new Date().getFullYear())].join(''))) {
          (s4dmessage.guild).setIcon((s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s4dmessage.guild).id].join(''))).topic),'changement de logo.')
    
          s4d.client.channels.cache.find((channel) => channel.name === ([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(s4dmessage.guild).id].join(''))).send({content:String(('✅ **Le logo du serveur à été mis à jour !** Action :Changer le logo du serveur. Date :' + String([(new Date().getDate()),'-',((new Date().getMonth())) + 1,'-',(new Date().getFullYear())].join(''))))});
          console.log((['Changement de logo du serveur : ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
        }
    
      });
    
    });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot ajouté dans **',s4dguild.name,'** (',s4dguild.id,').'].join('')))});
    
    });
    
    return s4d
})();