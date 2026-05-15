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
    let moment  = require("moment")
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
    
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'ping',
      		description: 'Obtenez la latence du bot',
      		options: [
    
          ]
      },{
          name: 'test',
      		description: 'Verifiez si le changement du salon sera fait',
      		options: [
    
          ]
      },{
          name: 'privee',
      		description: 'Forcer le changement (galaxie_s9)',
      		options: [
    
          ]
      },{
          name: 'setup',
      		description: 'Première commande a faire',
      		options: [
    
          ]
      },{
          name: 'info',
      		description: 'Toutes les informations utiles ',
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
        	description: 'Le jour du changement (ne pas mettre de 0 devant)',
            choices: [
    
            ]
        },{
            type: 4,
        	name: 'month',
            required: true,
        	description: 'Le mois du changement (ne pas mettre de 0 devant)',
            choices: [
    
            ]
        },
          ]
      },{
          name: 'name-add',
      		description: 'Ajoutez un nouveau changement de nom',
      		options: [
              {
            type: 4,
        	name: 'day',
            required: true,
        	description: 'Le jour du changement (ne pas mettre de 0 devant)',
            choices: [
    
            ]
        },{
            type: 4,
        	name: 'month',
            required: true,
        	description: 'Le mois du changement (ne pas mettre de 0 devant)',
            choices: [
    
            ]
        },
          ]
      },
    ],{
        debug: false,
    
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
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'setup' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create('Logoto', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create((['logoto-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join('')), { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(([`**Almost done!**
            All you have to do now is post an image link in the forum thread; it must be a direct URL to an image.`,'\n','\n',`**C'est bientôt fini !**
            Il vous reste plus qu'à mettre le lien d'une image dans le sujet sur salon, il faut que se soit une url direct d'une image.
            `].join('')))});
          });(interaction.guild).channels.create('log-logoto', { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(([`**The log room has been created.**
            You will find the server change actions performed by the bot in this room. (Please do not change the room name.)`,'\n','\n',`**Le salon des log à été créé**
            Vous obtiendrez les actions de changement du serveur fait par le bot dans ce salon. (Veuillez ne pas changer le nom du salon.)`].join('')))});
             (s4d.client.guilds.cache.get('1431674445428166806')).channels.cache.get('1433135924228784348').addFollower((cat), String('Faut être au courant.'))
            await interaction.reply({ content: (['The log and stock exchange will take place here:',cat,'\n','Le salon des log et des action se passera ici :',cat].join('')), ephemeral: true, components: [] });
          });});
      } else if ((interaction.commandName) == 'setup' && !(((interaction.member).roles.highest).permissions.has('MANAGE_GUILD'))) {
        await interaction.reply({ content: (['❌ Your highest role does not contain permissions to manage the server.','\n','❌ Votre rôle le plus élevé ne contient pas les permission pour gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'help') {
        await interaction.reply({ content: (['Aide de Logoto - Automatisez votre Logo !','\n','====================================','\n','**Je suis le bot spécialisé dans l\'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**','\n','###','\n','Les commandes','\n','* **`/setup`** : Crée les salons nécessaires (Logoto, log-logoto) pour un démarrage rapide et pour comprendre le fonctionnement.','\n','* **`/logo-add`** : Crée un salon de changement de logo avec les options day (Obligatoire, pour le jour), month (Obligatoire, pour le mois).','\n','* **`/name-add`** : Crée un salon de changement de nom avec les options day (Obligatoire, pour le jour), month (Obligatoire, pour le mois).','\n','* **`/help`** : Affiche ce message d\'aide.','\n','* **`/invite`** : Invitez le bot dans votre serveurs.','\n','* **`/support`** : Rejoigniez le serveur de support.','\n','Pour l\'aide complète :[Ici](https://logoto.onrender.com/help)','\n','For english help :[Here](https://logoto.onrender.com/help)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'invite') {
        await interaction.reply({ content: (['➕ Here is the link to add the bot: [link](https://discord.com/oauth2/authorize?client_id=1431383390162124920)','\n','\n','➕ Voici le lien d\'invitation du bot Discord :[lien](https://discord.com/oauth2/authorize?client_id=1431383390162124920)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'info') {
        await interaction.reply({ content: (['🔗 All useful links: [Website](https://logoto.onrender.com/), [Support Server](https://discord.gg/TPXFVYVnXe), [ToS](https://logoto.onrender.com/tos), [Privacy Policy](https://logoto.onrender.com/privacy).','\n','\n','🔗 Tous les lien utiles : [Site](https://logoto.onrender.com/), [Serveur de support](https://discord.gg/TPXFVYVnXe), [ToS](https://logoto.onrender.com/tos), [Politique de Confidentialité](https://logoto.onrender.com/privacy).'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: (['🏓 Pong !**','\n',s4d.client.ws.ping,'**ms.','\n','[Status page](https://logoto.betteruptime.com/)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'support') {
        await interaction.reply({ content: (['🤝 Here is the link to the support server: [link](https://discord.gg/TPXFVYVnXe)','\n','🤝 Voici le lien vers le serveur de support :[lien](https://discord.gg/TPXFVYVnXe)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'logo-add' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create((['logoto-',interaction.options.getInteger('day'),'-',interaction.options.getInteger('month')].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logoto') }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(([`**Almost done!**
          All you have to do now is post an image link in the forum thread; it must be a direct URL to an image.`,'\n','\n',`**C'est bientôt fini !**
          Il vous reste plus qu'à mettre le lien d'une image dans le sujet sur salon, il faut que se soit une url direct d'une image.
          `].join('')))});
          await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
        });} else if ((interaction.commandName) == 'logo-add' && !(((interaction.member).roles.highest).permissions.has('MANAGE_GUILD'))) {
        await interaction.reply({ content: (['❌ Your highest role does not contain permissions to manage the server.','\n','❌ Votre rôle le plus élevé ne contient pas les permission pour gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'name-add' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create((['logoto-',interaction.options.getInteger('day'),'-',interaction.options.getInteger('month')].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logoto') }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String(([`**Almost done!**
          All you have to do now is put the name of the server you want in the subject line.`,'\n',`**C'est bientôt fini !**
          Il vous reste plus qu'à mettre le nom du serveur que vous voulez dans le sujet.`].join('')))});
          await interaction.reply({ content: ('Le salon à été créé :' + String(cat)), ephemeral: true, components: [] });
        });} else if ((interaction.commandName) == 'name-add' && !(((interaction.member).roles.highest).permissions.has('MANAGE_GUILD'))) {
        await interaction.reply({ content: (['❌ Your highest role does not contain permissions to manage the server.','\n','❌ Votre rôle le plus élevé ne contient pas les permission pour gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'test' && ((((interaction.channel).topic) || '').startsWith('https://cdn.discordapp.com' || ''))) {
        await interaction.reply({ content: (['❌ Les urls discord sont déconseillé pour le changement de logo.','\n','❌ Discord URLs are not recommended for logo changes.'].join('')), ephemeral: false, components: [] });
      } else if ((interaction.commandName) == 'test' && ((((interaction.channel).topic) || '').startsWith('https://' || ''))) {
        await interaction.reply({ content: (['❔ Si le lien que vous avez mis est une url direct d\'une image c\'est bon. (Url direct :sur la page de l\'url il y a que l\'image rien d\'autre (pas le logo du site, pas de texte) et sur discord si vous envoyez le lien de l\'image direct il y aura que l\'image sans texte)','\n','❔ If the link you provided is a direct URL to an image, that\'s fine. (Direct URL: the URL page contains only the image, nothing else (no website logo, no text), and on Discord, if you send the direct image link, it will only display the image without any text.)'].join('')), ephemeral: false, components: [] });
      } else if ((interaction.commandName) == 'test') {
        await interaction.reply({ content: (['⭕ C\'est un nom de serveur. (s\'il comporter de 2 à 100 caractères).','\n','⭕ This is a server name. (if it contains between 2 and 100 characters).'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'privee' && ((interaction.member).id) == '746069923465527339') {
        await interaction.reply({ content: (['ok ','\n','❌ Discord URLs are not recommended for logo changes.'].join('')), ephemeral: true, components: [] });
        eventEmitter.emit('1');
      } else if ((interaction.commandName) == 'privee' && ((interaction.member).id) != '746069923465527339') {
        await interaction.reply({ content: (['Non.','\n','No.'].join('')), ephemeral: true, components: [] });
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
                    s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,' membres, ',s4d.client.guilds.cache.size,' serveurs.'].join('')),type:"WATCHING"}]});
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
    
    /* IMPORTED - S4D Website Hosting Dependencies */
    let S4D_APP_WEBSITE_HOSTING_PORT = 8080
    
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_cors());
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.urlencoded({
        extended: false
    }));
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.json());
    
      S4D_WEBSITECREATION_EXPRESS_app.all('/help', async function(req, res) {
          S4D_APP_write.sync(String('help.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Aide Logoto | Automatisation Logo & Nom Discord</title>
            <meta name="description" content="Découvrez comment configurer Logoto pour automatiser l'identité visuelle de votre serveur Discord via les salons et le sujet des canaux.">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <style>
                /* BASE & DISCORD THEME */
                body {
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #36393f;
                    color: #dcddde;
                    line-height: 1.6;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
    
                .content-wrapper {
                    flex-grow: 1;
                    padding: 40px 20px;
                }
    
                .container {
                    max-width: 950px;
                    margin: auto;
                    background: #2f3136;
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
    
                h1 {
                    color: #ffffff;
                    border-bottom: 2px solid #5865f2;
                    padding-bottom: 15px;
                    font-size: 2rem;
                    text-align: center;
                }
    
                h2 {
                    color: #5865f2;
                    margin-top: 35px;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
    
                h3 {
                    color: #ffffff;
                    font-size: 1.2rem;
                    margin-top: 20px;
                }
    
                p, li { font-size: 1.05rem; color: #b9bbbe; }
    
                code {
                    background-color: #202225;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-family: 'Consolas', monospace;
                    color: #f2f2f2;
                    border: 1px solid #4f545c;
                }
    
                .note {
                    background-color: rgba(241, 196, 15, 0.1);
                    border-left: 5px solid #f1c40f;
                    padding: 15px;
                    margin: 25px 0;
                    border-radius: 4px;
                }
    
                .note strong { color: #f1c40f; }
    
                .command-list {
                    list-style: none;
                    padding: 0;
                }
    
                .command-list li {
                    background: #36393f;
                    margin-bottom: 8px;
                    padding: 12px 15px;
                    border-radius: 6px;
                    transition: transform 0.2s, background 0.2s;
                }
    
                .command-list li:hover {
                    transform: translateX(5px);
                    background: #40444b;
                }
    
                /* BUTTONS */
                .lang-switch {
                    text-align: center;
                    margin-bottom: 30px;
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                }
    
                .btn {
                    padding: 10px 20px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                    cursor: pointer;
                    border: none;
                    transition: 0.3s;
                }
    
                .btn-primary { background-color: #5865f2; color: white; }
                .btn-primary:hover { background-color: #4752c4; }
                .btn-secondary { background-color: #4f545c; color: white; }
    
                footer {
                    background-color: #23272a;
                    padding: 25px;
                    text-align: center;
                    font-size: 0.9rem;
                }
    
                footer a { color: #5865f2; text-decoration: none; margin: 0 10px; }
                hr { border: 0; border-top: 1px solid #4f545c; margin: 30px 0; }
            </style>
        </head>
        <body>
    
            <div class="content-wrapper">
                <div class="container">
                    <header>
                        <div class="lang-switch">
                            <button id="btn-fr" onclick="changeLanguage('fr')" class="btn btn-primary">Français</button>
                            <button id="btn-en" onclick="changeLanguage('en')" class="btn btn-secondary">English</button>
                        </div>
                    </header>
    
                    <main id="content-area">
                        </main>
                </div>
            </div>
    
            <footer>
                <p>© Logoto Bot - Projet personnel hébergé sur Render</p>
                <a href="/tos">ToS</a> | <a href="/privacy">Confidentialité</a> | <a href="https://github.com/kanooob/Logoto">GitHub</a>
            </footer>
    
            <script>
                const translations = {
                    fr: {
                        title: "🤖 Documentation du Bot Discord Logoto",
                        intro: "Ce bot permet d'automatiser le changement de nom et de logo d'un serveur Discord en se basant sur la configuration de salons textuels spécifiques.",
                        globalWork: "🛠 Fonctionnement Global",
                        globalDesc: "Le bot surveille les salons pour détecter un message spécifique dans <code>log-logoto</code>. Il utilise la date actuelle pour identifier quel salon contient les instructions de configuration.",
                        systemTitle: "📅 Système de Salons logoto-[jour]-[mois]",
                        systemDesc: "Le bot s'appuie sur une structure de salons pour savoir quoi appliquer selon la date.",
                        formatTitle: "1. Format du nom du salon",
                        formatDesc: "Le salon doit être nommé exactement : <code>logoto-[jour]-[mois]</code>. <br>Exemple pour le 15 Mai : <code>logoto-15-5</code>",
                        configTitle: "2. Configuration du Salon (Topic)",
                        configDesc: "C'est dans la <strong>Description (Sujet)</strong> du salon que vous définissez l'action :",
                        configList: \`<li><strong>Lien (https://...) :</strong> Le bot change le <strong>Logo</strong> du serveur.</li>
                                     <li><strong>Texte simple :</strong> Le bot change le <strong>Nom</strong> du serveur.</li>
                                     <li><strong>Vide :</strong> Aucune action.</li>\`,
                        triggerTitle: "🔄 Le déclencheur",
                        triggerDesc: "Le changement est automatique. Le bot enverra deux messages dans <code>log-logoto</code> : <code>🔄 Loading...</code> puis la confirmation du changement.",
                        notesTitle: "⚠️ Notes Importantes",
                        notesList: \`<li><strong>Permissions :</strong> Le bot doit avoir les permissions 'Gérer le serveur' et 'Gérer les salons'.</li>
                                    <li><strong>Rôle :</strong> Le rôle du bot doit être placé au-dessus des autres pour modifier les paramètres.</li>
                                    <li><strong>Format :</strong> Utilisez bien le format JJ-MM (sans zéro inutile, ex: 5 et non 05).</li>\`,
                        commandsTitle: "🚀 Commandes Slash",
                        faqTitle: "❓ FAQ Rapide",
                        faqContent: "<strong>Le bot ne change rien ?</strong> Vérifiez que le salon <code>log-logoto</code> existe et que le bot peut y écrire. C'est ce salon qui 'réveille' le bot chaque jour."
                    },
                    en: {
                        title: "🤖 Logoto Discord Bot Documentation",
                        intro: "This bot automates server name and logo changes based on specific text channel configurations.",
                        globalWork: "🛠 How It Works",
                        globalDesc: "The bot monitors channels for a specific trigger message in <code>log-logoto</code>. It uses the current date to identify which channel contains the setup instructions.",
                        systemTitle: "📅 Channel System: logoto-[day]-[month]",
                        systemDesc: "The bot uses a specific channel structure to know which identity to apply based on the date.",
                        formatTitle: "1. Channel Name Format",
                        formatDesc: "The channel must be named exactly: <code>logoto-[day]-[month]</code>. <br>Example for May 15th: <code>logoto-15-5</code>",
                        configTitle: "2. Channel Configuration (Topic)",
                        configDesc: "The <strong>Channel Topic (Description)</strong> is where you define the action:",
                        configList: \`<li><strong>URL (https://...) :</strong> The bot will update the server <strong>Logo</strong>.</li>
                                     <li><strong>Plain text :</strong> The bot will update the server <strong>Name</strong>.</li>
                                     <li><strong>Empty :</strong> No action taken.</li>\`,
                        triggerTitle: "🔄 The Trigger",
                        triggerDesc: "The change is fully automated. The bot will send two messages in <code>log-logoto</code>: <code>🔄 Loading...</code> followed by the change confirmation.",
                        notesTitle: "⚠️ Important Notes",
                        notesList: \`<li><strong>Permissions:</strong> The bot requires 'Manage Server' and 'Manage Channels' permissions.</li>
                                    <li><strong>Hierarchy:</strong> Ensure the bot's role is high enough to edit server settings.</li>
                                    <li><strong>Date Format:</strong> Use the DD-MM format (no leading zeros, e.g., 5 instead of 05).</li>\`,
                        commandsTitle: "🚀 Slash Commands",
                        faqTitle: "❓ Quick FAQ",
                        faqContent: "<strong>Bot isn't changing anything?</strong> Make sure the <code>log-logoto</code> channel exists and the bot has permission to post there. This channel 'wakes up' the bot daily."
                    }
                };
    
                function renderContent(lang) {
                    const t = translations[lang];
                    const content = \`
                        <h1>\${t.title}</h1>
                        <p>\${t.intro}</p>
    
                        <h2>\${t.globalWork}</h2>
                        <p>\${t.globalDesc}</p>
    
                        <hr>
    
                        <h2>\${t.systemTitle}</h2>
                        <p>\${t.systemDesc}</p>
    
                        <h3>\${t.formatTitle}</h3>
                        <p>\${t.formatDesc}</p>
    
                        <h3>\${t.configTitle}</h3>
                        <p>\${t.configDesc}</p>
                        <ul>\${t.configList}</ul>
    
                        <hr>
    
                        <h2>\${t.triggerTitle}</h2>
                        <p>\${t.triggerDesc}</p>
    
                        <div class="note">
                            <h2>\${t.notesTitle}</h2>
                            <ul>\${t.notesList}</ul>
                        </div>
    
                        <h2>\${t.commandsTitle}</h2>
                        <ul class="command-list">
                            <li><code>/setup</code> : \${lang === 'fr' ? 'Crée les salons nécessaires.' : 'Creates necessary channels.'}</li>
                            <li><code>/logo-add</code> : \${lang === 'fr' ? 'Ajoute un salon pour un logo.' : 'Adds a channel for a logo change.'}</li>
                            <li><code>/name-add</code> : \${lang === 'fr' ? 'Ajoute un salon pour un nom.' : 'Adds a channel for a name change.'}</li>
                            <li><code>/help</code> : \${lang === 'fr' ? 'Affiche l\\'aide.' : 'Displays help.'}</li>
                        </ul>
    
                        <div class="note" style="background-color: rgba(88, 101, 242, 0.1); border-left-color: #5865f2;">
                            <h3>\${t.faqTitle}</h3>
                            <p>\${t.faqContent}</p>
                        </div>
                    \`;
                    document.getElementById('content-area').innerHTML = content;
                }
    
                function changeLanguage(lang) {
                    renderContent(lang);
                    document.documentElement.lang = lang;
    
                    // Toggle button styles
                    document.getElementById('btn-fr').className = lang === 'fr' ? 'btn btn-primary' : 'btn btn-secondary';
                    document.getElementById('btn-en').className = lang === 'en' ? 'btn btn-primary' : 'btn btn-secondary';
    
                    window.scrollTo(0, 0);
                }
    
                // Init
                renderContent('fr');
            </script>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('help.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/', async function(req, res) {
          S4D_APP_write.sync(String('home.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
    
            <title>Logoto : Bot Discord pour Changer Logo et Nom Automatiquement</title>
    
            <meta name="description" content="Découvrez Logoto, le bot Discord n°1 pour automatiser et planifier le changement du logo et du nom de votre serveur. Parfait pour les événements et les saisons !">
    
            <link rel="canonical" href="https://logoto.onrender.com/" />
    
            <meta name="google-site-verification" content="u2mt1kkF8HLYxuULsxpdU7e8dJKFjj0ItJ6IPLcs23s" />
    
            <meta name="keywords" content="bot discord, logoto, changer logo discord, changer nom discord, automatiser, planification, bot événementiel discord, auto logo, auto name">
    
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <meta property="og:title" content="Logoto : Bot d'Automatisation Discord">
            <meta property="og:description" content="Planifiez le changement de logo et de nom de votre serveur Discord pour vos événements.">
            <meta property="og:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
            <meta property="og:url" content="https://logoto.onrender.com/"> <meta property="og:type" content="website">
            <meta property="og:locale" content="fr_FR">
    
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="Logoto : Bot d'Automatisation Discord">
            <meta name="twitter:description" content="Automatisez le changement de logo et de nom de votre serveur pour les événements.">
            <meta name="twitter:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Logoto",
              "description": "Bot Discord pour automatiser et planifier le changement du logo et du nom d'un serveur.",
              "applicationCategory": "Utilities",
              "operatingSystem": "Discord",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              }
            }
            </script>
    
            <style>
                /* AJUSTEMENT DU BODY pour permettre au footer de descendre */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column; /* Permet à main et footer d'être empilés */
                    justify-content: space-between; /* Pousse le footer vers le bas */
                    min-height: 100vh;
                    background-color: #36393f;
                    color: #ffffff;
                    text-align: center;
                    box-sizing: border-box;
                }
    
                .main-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 1;
                    padding: 20px;
                }
    
                .container { max-width: 600px; width: 100%; }
                .icon {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
                h1 {
                    font-size: 2.5rem;
                    color: #7289da;
                    margin-bottom: 10px;
                }
                p.description {
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    color: #dcddde;
                }
                .button-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-top: 20px;
                }
                .btn {
                    display: inline-block;
                    padding: 15px 30px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: #ffffff;
                    transition: transform 0.2s, background-color 0.2s;
                }
                .btn:hover { transform: translateY(-2px); }
                .btn-primary { background-color: #5865f2; }
                .btn-primary:hover { background-color: #4f5bda; }
                .btn-secondary { background-color: #4f545c; }
                .btn-secondary:hover { background-color: #5d6269; }
    
                @media (min-width: 600px) {
                    .button-container {
                        flex-direction: row;
                        justify-content: center;
                    }
                }
    
                /* NOUVEAUX STYLES FOOTER */
                footer {
                    background-color: #2f3136; /* Une couleur légèrement plus foncée que le fond du body */
                    padding: 15px 20px;
                    color: #99aab5;
                    font-size: 0.9rem;
                    width: 100%;
                    box-sizing: border-box;
                }
    
                footer a {
                    color: #ffffff; /* Texte de lien blanc pour le contraste */
                    text-decoration: none;
                    margin: 0 10px;
                    transition: color 0.2s;
                }
    
                footer a:hover {
                    color: #7289da;
                    text-decoration: underline;
                }
    
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    margin-top: 5px;
                }
            </style>
        </head>
        <body>
            <div class="main-content">
                <main class="container">
                    <img src="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png"
                         alt="Icône de Logoto, le bot Discord d'automatisation de logo et de nom"
                         class="icon">
    
                    <h1>Logoto : Automatisez le Logo et le Nom de votre Serveur Discord</h1>
    
                    <p class="description">
                        Logoto est le <strong>bot Discord</strong> qu'il vous faut pour <strong>automatiser le changement de l'icône</strong> et du <strong>nom de votre serveur</strong>.
                        Planifiez vos modifications pour des événements spéciaux, des saisons ou des célébrations, sans effort !
                    </p>
    
                    <div class="button-container">
                        <a href="https://discord.com/oauth2/authorize?client_id=1431383390162124920"
                           class="btn btn-primary"
                           target="_blank"
                           rel="noopener noreferrer"> Ajouter à Discord
                        </a>
    
                        <a href="/help" class="btn btn-secondary">
                           Voir l'aide et les commandes
                        </a>
                    </div>
                </main>
            </div>
    
            <footer>
                <p>Ce site est hébergé sur Render. Logoto est un projet personnel.</p>
                <div class="footer-links">
                    <a href="/tos">Conditions d'Utilisation (ToS)</a>
                    <a href="/privacy">Politique de Confidentialité</a>
                    <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer">Code Source</a>
                </div>
            </footer>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('home.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/privacy', async function(req, res) {
          S4D_APP_write.sync(String('privacy.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <title>Politique de Confidentialité (Privacy Policy) de Logoto Bot Discord</title>
            <meta name="description" content="Politique de confidentialité du bot Discord Logoto. Détails sur les données collectées (Serveur ID, Nom de Salon) et leur utilisation pour le service d'automatisation.">
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #36393f;
                    color: #dcddde;
                    line-height: 1.6;
                }
    
                .container {
                    max-width: 900px;
                    margin: auto;
                    background: #2f3136;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
    
                h1 {
                    color: #7289da;
                    border-bottom: 2px solid #7289da;
                    padding-bottom: 10px;
                    font-size: 2.2rem;
                }
    
                h2 {
                    color: #5865f2;
                    margin-top: 30px;
                    border-bottom: 1px solid #4f545c;
                    padding-bottom: 5px;
                }
    
                p, li {
                    font-size: 1.1rem;
                    color: #dcddde;
                }
    
                a {
                    color: #7289da;
                    text-decoration: underline;
                }
    
                a:hover {
                    color: #5865f2;
                }
    
                ul {
                    padding-left: 20px;
                    list-style-type: disc;
                }
    
                li {
                    margin-bottom: 10px;
                }
    
                .important-note {
                    background-color: #3c3a2e;
                    border-left: 5px solid #ffc107;
                    padding: 15px;
                    margin-top: 20px;
                    border-radius: 4px;
                    color: #ffffff;
                }
    
                footer {
                    background-color: #36393f;
                    text-align: center;
                    margin-top: 50px;
                    padding: 20px 0;
                    color: #99aab5;
                    font-size: 0.9rem;
                }
    
                footer a {
                    color: #ffffff;
                }
            </style>
        </head>
        <body>
    
            <div class="container">
                <header>
                     <p><a href="/">← Retour à la page d'accueil</a></p>
                </header>
    
                <main>
                    <h1>Politique de Confidentialité (Privacy Policy) de Logoto</h1>
                    <p>Dernière mise à jour : 21/11/2025</p>
                    <hr>
    
                    <p>
                        La présente Politique de Confidentialité décrit les types d'informations que le Bot Discord Logoto ("le Service") collecte, comment ces informations sont utilisées et les mesures prises pour assurer leur protection. Le service est fourni par Galaxie_s9, un développeur indépendant.
                    </p>
    
                    <h2>1. Collecte et Utilisation des Informations</h2>
                    <p>
                        Logoto est un bot axé sur la fonctionnalité et la minimisation des données. Nous ne stockons que les informations strictement nécessaires pour fournir le service d'automatisation.
                    </p>
    
                    <h3>Types de Données Collectées :</h3>
                    <ul>
                        <li>
                            <strong>Identifiants de Serveur (Guild IDs) :</strong> L'identifiant unique de votre serveur Discord est collecté pour l'associer aux configurations de planification (salons, logs).
                        </li>
                        <li>
                            <strong>Identifiants de Salons (Channel IDs) :</strong> Les identifiants des salons de planification (ex : <code>l-31-12</code>, <code>n-1-1</code>) et du salon de log (<code>log-logoto</code>) sont stockés pour que le bot puisse vérifier les changements et les exécuter.
                        </li>
                        <li>
                            <strong>Contenu des Sujets de Salons (Channel Topics) :</strong> Le lien de l'image de logo ou le nouveau nom de serveur que vous placez dans le sujet de salon est stocké temporairement en mémoire lors de la vérification quotidienne, mais **n'est pas stocké de manière permanente dans une base de données** au-delà de sa présence sur Discord.
                        </li>
                        <li>
                            <strong>Identifiants d'Utilisateur (User IDs) :</strong> Les identifiants des utilisateurs peuvent être vus par le Bot lors de l'exécution d'une commande (ex: <code>/setup</code>) pour vérifier les permissions. Ces identifiants **ne sont pas stockés de manière permanente**.
                        </li>
                    </ul>
    
                    <div class="important-note">
                        <strong>Logoto ne stocke PAS :</strong> Les messages privés, les messages de discussion, les adresses IP, les noms d'utilisateur (au-delà de la vérification initiale des permissions), ni aucune donnée personnelle sensible.
                    </div>
    
                    <h2>2. Finalité du Traitement des Données</h2>
                    <p>
                        Les informations collectées sont utilisées exclusivement pour les finalités suivantes :
                    </p>
                    <ul>
                        <li>Fournir et opérer le service Logoto (changer le logo/nom du serveur à la date prévue).</li>
                        <li>Maintenir les logs d'activité du Bot pour le dépannage et la vérification des erreurs (stockées dans le salon <code>log-logoto</code> sur votre serveur).</li>
                        <li>Assurer la sécurité et la stabilité du Bot.</li>
                    </ul>
    
                    <h2>3. Partage des Informations</h2>
                    <p>
                        Nous ne vendons, n'échangeons, ni ne louons vos informations d'identification de serveur à des tiers. Les seules entités ayant accès à ces identifiants sont :
                    </p>
                    <ul>
                        <li>**Discord :** En utilisant le Bot, vous êtes soumis à la politique de Discord.</li>
                        <li>**L'Hébergeur :** Les données de fonctionnement du Bot sont stockées temporairement sur les serveurs de l'hébergeur Render.</li>
                    </ul>
    
                    <h2>4. Conservation des Données</h2>
                    <p>
                        Les identifiants de serveur et de salons sont conservés tant que le Bot Logoto est présent sur votre serveur Discord. Si vous retirez le Bot de votre serveur, toutes les informations de configuration associées à cet identifiant de serveur sont automatiquement effacées dans les [DÉLAI, ex: 24 heures] suivant le départ du Bot.
                    </p>
    
                    <h2>5. Conformité au RGPD (Résidents de l'UE)</h2>
                    <p>
                        Si vous êtes résident de l'Espace Économique Européen (EEE), vous avez certains droits en vertu du Règlement Général sur la Protection des Données (RGPD) :
                    </p>
                    <ul>
                        <li>Droit d'accès, de rectification et d'effacement de vos données personnelles (Server ID).</li>
                        <li>Droit de retirer votre consentement (en retirant simplement le Bot de votre serveur).</li>
                    </ul>
                    <p>
                        Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée dans la section 7.
                    </p>
    
                    <h2>6. Sécurité des Données</h2>
                    <p>
                        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger les données que nous traitons. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée.
                    </p>
    
                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question ou demande concernant cette Politique de Confidentialité, veuillez nous contacter à l'adresse e-mail dédiée : galaxies9@duck.com.
                    </p>
    
                </main>
    
            </div>
    
            <footer>
                <p>Logoto est un projet personnel. | <a href="https://github.com/kanooob/Logoto" target="_blank">Voir le code source</a></p>
            </footer>
    
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('privacy.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/tos', async function(req, res) {
          S4D_APP_write.sync(String('tos.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <title>Conditions d'Utilisation (ToS) de Logoto Bot Discord</title>
            <meta name="description" content="Conditions d'utilisation légales du bot Discord Logoto. Lisez nos règles concernant la gestion du serveur, la propriété intellectuelle et la limitation de responsabilité.">
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 40px 20px;
                    background-color: #36393f;
                    color: #dcddde;
                    line-height: 1.6;
                }
    
                .container {
                    max-width: 900px;
                    margin: auto;
                    background: #2f3136;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
    
                h1 {
                    color: #7289da;
                    border-bottom: 2px solid #7289da;
                    padding-bottom: 10px;
                    font-size: 2.2rem;
                }
    
                h2 {
                    color: #5865f2;
                    margin-top: 30px;
                    border-bottom: 1px solid #4f545c;
                    padding-bottom: 5px;
                }
    
                p, li {
                    font-size: 1.1rem;
                    color: #dcddde;
                }
    
                a {
                    color: #7289da;
                    text-decoration: underline;
                }
    
                a:hover {
                    color: #5865f2;
                }
    
                ol {
                    padding-left: 20px;
                }
    
                li {
                    margin-bottom: 10px;
                }
    
                footer {
                    background-color: #36393f;
                    text-align: center;
                    margin-top: 50px;
                    padding: 20px 0;
                    color: #99aab5;
                    font-size: 0.9rem;
                }
    
                footer a {
                    color: #ffffff;
                }
            </style>
        </head>
        <body>
    
            <div class="container">
                <header>
                     <p><a href="/">← Retour à la page d'accueil</a></p>
                </header>
    
                <main>
                    <h1>Conditions d'Utilisation (Terms of Service - ToS) de Logoto</h1>
                    <p>Dernière mise à jour : 21/11/2025</p>
                    <hr>
    
                    <h2>1. Acceptation des Conditions</h2>
                    <p>
                        Bienvenue sur Logoto, un service fourni par un développeur indépendant, Galaxie_S9.
                        En ajoutant et en utilisant le bot Logoto sur votre serveur Discord, vous acceptez d'être lié par les présentes Conditions d'Utilisation (les "ToS") et toutes les lois et réglementations applicables. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Bot.
                    </p>
    
                    <h2>2. Description du Service</h2>
                    <p>
                        Logoto est un bot Discord conçu pour l'automatisation. Son rôle principal est de permettre aux administrateurs de serveurs de **changer automatiquement le logo et/ou le nom de leur serveur** Discord à des dates et heures planifiées, en configurant des salons spécifiques.
                    </p>
    
                    <h2>3. Conditions d'Utilisation et Engagements de l'Utilisateur</h2>
                    <p>
                        L'utilisateur s'engage à respecter les règles suivantes lors de l'utilisation de Logoto :
                    </p>
                    <ol>
                        <li>
                            <strong>Conformité à Discord :</strong> L'utilisation de Logoto doit impérativement être conforme aux <a href="https://discord.com/terms" target="_blank">Conditions d'Utilisation de Discord</a> et aux <a href="https://discord.com/guidelines" target="_blank">Directives de la Communauté Discord</a>. Toute violation de ces règles via Logoto est interdite.
                        </li>
                        <li>
                            <strong>Autorisations :</strong> L'utilisateur garantit qu'il dispose des autorisations nécessaires (Gestion du Serveur) pour installer et configurer Logoto.
                        </li>
                        <li>
                            <strong>Contenu :</strong> Il est strictement interdit d'utiliser Logoto pour planifier ou afficher des logos ou des noms de serveur qui sont illégaux, offensants, haineux, violents, ou qui enfreignent les droits d'auteur.
                        </li>
                        <li>
                            <strong>Abus du Service :</strong> Il est interdit d'utiliser le Bot de manière abusive ou excessive qui pourrait nuire au fonctionnement du service ou aux autres utilisateurs.
                        </li>
                    </ol>
    
                    <h2>4. Propriété Intellectuelle et Licence</h2>
                    <ol>
                        <li>
                            <strong>Code Logoto :</strong> Le code source de Logoto est la propriété de Galaxie_S9 et est distribué sous la licence MIT License sur <a href="https://github.com/kanooob/Logoto?tab=MIT-1-ov-file#" target="_blank">GitHub</a>.
                        </li>
                        <li>
                            <strong>Contenu Utilisateur :</strong> Les logos et noms de serveur que l'utilisateur planifie via le Bot demeurent la propriété du serveur Discord ou de l'utilisateur. Logoto ne revendique aucun droit sur ce contenu.
                        </li>
                    </ol>
    
                    <h2>5. Limitation de Responsabilité et Avertissement</h2>
                    <p>
                        <strong>Logoto est fourni « tel quel » sans garantie.</strong> En tant que développeur indépendant, nous ne pouvons garantir que le service sera ininterrompu, exempt d'erreurs ou toujours disponible.
                    </p>
                    <p>
                        Nous ne sommes pas responsables des dommages causés directement ou indirectement par l'utilisation du Bot, y compris, mais sans s'y limiter, les erreurs de planification de logo ou de nom. L'utilisateur utilise le Bot à ses propres risques et doit toujours s'assurer qu'il dispose de sauvegardes ou de contrôles en place.
                    </p>
    
                    <h2>6. Modifications et Résiliation</h2>
                    <ol>
                        <li>
                            <strong>Modifications :</strong> Nous nous réservons le droit de modifier ces Conditions à tout moment. La date de la dernière mise à jour sera indiquée en haut de cette page. L'utilisation continue du Bot après une modification vaut acceptation des nouvelles Conditions.
                        </li>
                        <li>
                            <strong>Résiliation :</strong> Nous pouvons suspendre ou mettre fin à l'accès de Logoto à n'importe quel serveur, sans préavis, en cas de violation des présentes Conditions.
                        </li>
                    </ol>
    
                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question ou préoccupation concernant ces Conditions d'Utilisation ou l'utilisation du Bot Logoto, veuillez nous contacter à l'adresse suivante : galaxies9@duck.com.
                    </p>
    
                </main>
    
            </div>
    
            <footer>
                <p>Logoto est un projet personnel. | <a href="https://github.com/kanooob/Logoto" target="_blank">Voir le code source</a></p>
            </footer>
    
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('tos.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/404', async function(req, res) {
          S4D_APP_write.sync(String('404.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Non Trouvée | Logoto</title>
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #36393f; /* Fond sombre Discord */
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                }
    
                .container {
                    max-width: 500px;
                    width: 100%;
                    background: #2f3136; /* Fond intérieur */
                    padding: 40px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
    
                .status-code {
                    font-size: 8rem;
                    font-weight: bold;
                    color: #7289da; /* Bleu Discord */
                    margin-bottom: 5px;
                    line-height: 1;
                }
    
                h1 {
                    font-size: 1.8rem;
                    color: #dcddde;
                    margin-bottom: 20px;
                }
    
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    color: #b9bbbe;
                }
    
                .button-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-top: 20px;
                }
    
                .btn {
                    display: inline-block;
                    padding: 12px 25px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #ffffff;
                    transition: transform 0.2s, background-color 0.2s;
                }
    
                .btn:hover {
                    transform: translateY(-2px);
                }
    
                .btn-primary {
                    background-color: #5865f2; /* Nouveau bleu Discord */
                }
                .btn-primary:hover {
                    background-color: #4f5bda;
                }
    
                .btn-secondary {
                    background-color: #4f545c; /* Gris bouton Discord */
                }
                .btn-secondary:hover {
                    background-color: #5d6269;
                }
    
                /* Pour les écrans plus larges, mettre les boutons côte à côte */
                @media (min-width: 400px) {
                    .button-container {
                        flex-direction: row;
                        justify-content: center;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="status-code">404</div>
    
                <h1>Oups, cette page a disparu.</h1>
    
                <p>
                    Désolé, mais nous n'avons pas trouvé la page que vous cherchiez.
                    Veuillez utiliser les boutons ci-dessous pour revenir à une zone connue.
                </p>
    
                <div class="button-container">
                    <a href="/" class="btn btn-primary">
                        Retour à l'Accueil
                    </a>
    
                    <a href="/help" class="btn btn-secondary">
                        Accéder à l'Aide
                    </a>
                </div>
            </div>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('404.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/robots.txt', async function(req, res) {
          S4D_APP_write.sync(String('robots.txt'), String(`User-agent: *
        Allow: /
        Allow: /help
        Allow: /tos
        Allow: /privacy
        Disallow: /blocks.xml
        Disallow: /index.js
        Disallow: /404
        Sitemap: https://logoto.onrender.com/sitemap.xml`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('robots.txt')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/sitemap.xml', async function(req, res) {
          S4D_APP_write.sync(String('sitemap.xml'), String(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
        <url>
          <loc>https://logoto.onrender.com/</loc>
          <priority>1.00</priority>
        </url>
    
        <url>
          <loc>https://logoto.onrender.com/help</loc>
          <priority>0.80</priority>
        </url>
    
        <url>
          <loc>https://logoto.onrender.com/tos</loc>
          <priority>0.60</priority>
        </url>
    
        <url>
          <loc>https://logoto.onrender.com/privacy</loc>
          <priority>0.60</priority>
        </url>
    
        </urlset>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('sitemap.xml')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.use(function(req, res) {
          S4D_APP_write.sync(String('Redirection.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <meta http-equiv="refresh" content="0; url=/404">
    
            <title>Redirection en cours...</title>
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #36393f;
                    color: #dcddde;
                    text-align: center;
                    padding-top: 50px;
                }
            </style>
        </head>
        <body>
            <p>Requête Invalide détectée. Redirection immédiate vers la page 404...</p>
            <p>Si la redirection n'est pas automatique, veuillez cliquer ici : <a href="/404">Page non trouvée (404)</a>.</p>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('Redirection.html')))
    
      })
    
    
    S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '🔄 l-Loading') {
        (s4dmessage.guild).setIcon(((s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de logo.')
    
        s4dmessage.channel.send({content:String('✅ Logo du serveurs changé.')});
        console.log((['Logo du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '🔄 n-Loading') {
        (s4dmessage.guild).setName(((s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de nom.')
    
        s4dmessage.channel.send({content:String('✅ Nom du serveurs changé.')});
        console.log((['Nom du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if (((s4dmessage).content) == '!ping') {
        ms_on = (s4d.client.uptime);
        s4dmessage.channel.send({content:String((['🏓 Pong! My ping is **',s4d.client.ws.ping,'ms**.','\n','And I\'ve been on for **',Math.round(ms_on / 60000),' minutes**.'].join('')))});
      }
    
    });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot ajouté dans **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
    
    });
    
    s4d.client.on('guildDelete', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot enlevé de **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
    
    });
    
    eventEmitter.on('1', async => {
          s4d.client.guilds.cache.forEach(async (s) =>{
         if (typeof (s).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('🔄 l-Loading')});
        }
        if (typeof (s).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('🔄 n-Loading')});
        }
        if ((typeof (s).channels.cache.find((category) => category.name === 'log-logoto') !== undefined) && (typeof (s).channels.cache.find((category) => category.name === (['logoto',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined)) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('🔄 Loading...')});
        }
    
      })
    
      });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if (((s4dmessage).content) == '🔄 Loading...' && ((((s4dmessage.guild).channels.cache.find((category) => category.name === (['logoto-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic) || '').startsWith('https://' || ''))) {
        (s4dmessage.guild).setIcon(((s4dmessage.guild).channels.cache.find((category) => category.name === (['logoto-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de logo.')
    
        s4dmessage.channel.send({content:String('✅ Logo du serveurs changé.')});
      } else if (((s4dmessage).content) == '🔄 Loading...') {
        (s4dmessage.guild).setName(((s4dmessage.guild).channels.cache.find((category) => category.name === (['logoto-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de nom.')
    
        s4dmessage.channel.send({content:String('✅ Nom du serveurs changé.')});
      }
    
    });
    
    return s4d
})();