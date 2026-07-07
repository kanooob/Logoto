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
    
    
    await s4d.client.login((process.env[String('token')])).catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
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
    
    s4d.client.on('ready', async () => {
      jour = ((new Date().getDate()));
      if (((new Date().getHours())) < 4) {
        jour = ((new Date().getDate())) - 1;
      }
      s4d.client.channels.cache.get('1413899996691955755').send({content:String('Démarrage du bot...')});
    
              while(s4d.client && s4d.client.token) {
                  await delay(50);
                    s4d.client.user.setPresence({status: "online",activities:[{name:([s4d.client.users.cache.size,'members, ',s4d.client.guilds.cache.size,'servers.'].join('')),type:"WATCHING"}]});
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
        (cat).send({content:String((['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs channel has been created. You will see the server changes made by the bot in this channel. (Please do not change the channel name.) Now you just need to run this command </add-an-event:1505515202072805377> to create an automation.','\n','<:track_next:1505295937856213072> Le salon des logs a été créé. Vous obtiendrez les actions de changement du serveur fait par le bot dans ce salon. (Veuillez ne pas changer le nom du salon.) Maintenant vous avez juste à faire cette commande </add-an-event:1505515202072805377> pour créer une automatisation.'].join('')))});
      } else if ((interaction.commandName) == 'setup' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create('Logoto', { type: 'GUILD_CATEGORY' }).then(async cat => {  (interaction.guild).channels.create('log-logoto', { type: "GUILD_TEXT", parent: (cat) }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });(cat).send({content:String((['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs channel has been created. You will see the server changes made by the bot in this channel. (Please do not change the channel name.) Now you just need to run this command </add-an-event:1505515202072805377> to create an automation.','\n','<:track_next:1505295937856213072> Le salon des logs a été créé. Vous obtiendrez les actions de changement du serveur fait par le bot dans ce salon. (Veuillez ne pas changer le nom du salon.) Maintenant vous avez juste à faire cette commande </add-an-event:1505515202072805377> pour créer une automatisation.'].join('')))});
            (cat).messages.fetch({ limit: 1 }).then(async (last_messages_in_channel) => {
                  (last_messages_in_channel.at(1 - 1)).pin()
            });
             (s4d.client.guilds.cache.get('1431674445428166806')).channels.cache.get('1433135924228784348').addFollower((cat), String('follow the project'))
            await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Information**','\n','<:track_next:1505295937856213072> The logs and actions will take place here:',cat,'\n','<:track_next:1505295937856213072> Le salon des logs et du suivi des actions se trouve ici :',cat].join('')), ephemeral: true, components: [] });
          });});
      } else if ((interaction.commandName) == 'setup') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Your highest role must contain the following permissions to run this command: Server Owner or Admin or Manage Server.','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contenir au moins une des permissions suivantes pour faire cette commande : Propriétaire du serveur ou Admin ou Gérer le serveur.'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'help') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Aide de Logoto - Automatisez votre Logo !**','\n','====================================','\n','<:track_next:1505295937856213072> **Je suis le bot spécialisé dans l\'automatisation du changement de logo de votre serveur, sans nécessiter de commandes complexes après la configuration.**','\n','###','\n','<:track_next:1505295937856213072> Les commandes','\n','* **`/setup`** : Crée les salons nécessaires (Logoto, log-logoto) pour un démarrage rapide mais aussi obligatoire pour le bon fonctionnement du bot.','\n','* **`/add-an-event`** : Crée un salon de changement de logo avec les options [type] (obligatoire) pour le type d\'événement (logo/name), [day] (Obligatoire) indique le jour du changement, [month] (Obligatoire) indique le mois de changement.','\n','* **`/help`** : Affiche ce message d\'aide.','\n','* **`/invite`** : Invitez le bot dans votre serveur.','\n','* **`/support`** : Rejoignez le serveur de support.','\n','<:link:1505215573364047913> [Website home](https://logoto.onrender.com/index-en), [Help page](https://logoto.onrender.com/help-en)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'invite') {
        await interaction.reply({ content: (['<:serremains:1505250979430531134> **Invite the bot**','\n','<:track_next:1505295937856213072> Invite the bot to your server using this link:','\n','<:track_next:1505295937856213072> Inviter le bot grâce au lien sur votre serveur :','\n','-# <:link:1505215573364047913> [Discord bot](https://discord.com/oauth2/authorize?client_id=1431383390162124920)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'info') {
        await interaction.reply({ content: (['<:track_next:1505295937856213072> **Useful links**','\n','<:link:1505215573364047913> [Website](https://logoto.onrender.com/index-en), [Support Server](https://discord.gg/TPXFVYVnXe), [ToS](https://logoto.onrender.com/tos), [Privacy Policy](https://logoto.onrender.com/privacy).','\n','<:link:1505215573364047913> [Site](https://logoto.onrender.com/), [Serveur de support](https://discord.gg/TPXFVYVnXe), [ToS](https://logoto.onrender.com/tos), [Politique de Confidentialité](https://logoto.onrender.com/privacy).'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'ping') {
        await interaction.reply({ content: (['<:ping:1505250928008237057> **',s4d.client.ws.ping,'ms.**','\n','-# <:link:1505215573364047913> [Status](https://logoto.betteruptime.com/)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'support') {
        await interaction.reply({ content: (['<:serremains:1505250979430531134> **Support server**','\n','<:track_next:1505295937856213072> Join the support server if you need help:','\n','<:track_next:1505295937856213072> Rejoignez le serveur de support si vous avez besoin d\'aide :','\n','-# <:link:1505215573364047913> [Discord server](https://discord.gg/TPXFVYVnXe)'].join('')), ephemeral: false, components: [] });
      }
      if ((interaction.commandName) == 'privee' && ((interaction.member).id) == '746069923465527339') {
        await interaction.reply({ content: '<:asterisk:1505250975282106469> C\'est bon retournement de situation !', ephemeral: true, components: [] });
        eventEmitter.emit('1');
      } else if ((interaction.commandName) == 'privee' && ((interaction.member).id) != '746069923465527339') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> You do not have permission to use this command','\n','<:regional_indicator_x:1505250983436091634> Vous ne possédez pas les permissions pour utiliser cette commande'].join('')), ephemeral: true, components: [] });
      }
      if ((interaction.commandName) == 'add-an-event' && ((((interaction.member).roles.highest).permissions.has('MANAGE_GUILD')) || (((interaction.member).roles.highest).permissions.has('ADMINISTRATOR')) || (String((interaction.guild).ownerId)) == ((interaction.member).id))) {
        (interaction.guild).channels.create(([interaction.options.getString('type'),'-',interaction.options.getInteger('day'),'-',interaction.options.getInteger('month')].join('')), { type: "GUILD_TEXT", parent: (interaction.guild).channels.cache.find((category) => category.name === 'Logoto') }).then(async cat =>{  (cat).permissionOverwrites.edit((s4d.client.users.cache.get(String('1431383390162124920'))), { VIEW_CHANNEL: true });(cat).permissionOverwrites.edit(((interaction.guild).roles.cache.get(((interaction.guild).id))), { VIEW_CHANNEL: false });if ((interaction.options.getString('type')) == 'l') {
            (cat).send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All that remains is to put the direct url of an image/logo to finalize the programming of the server change in the subject of this room.','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre l\'url directe d\'une image/logo pour finaliser la programmation du changement du serveur dans le sujet de ce salon.'].join('')))});
          } else {
            (cat).send({content:String((['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All that remains is to put the name in the subject of this channel to finalize the programming of the server change.','\n','<:track_next:1505295937856213072> Il reste plus qu\'à mettre le nom dans le sujet de ce salon pour finaliser la programmation du changement du serveur.'].join('')))});
          }
          await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Last step**','\n','<:track_next:1505295937856213072> All you have to do now is follow the instructions in the channel:','\n','<:track_next:1505295937856213072> Il ne vous reste plus qu\'à suivre les instructions dans le salon :','\n','-# <:track_next:1505295937856213072> ',cat].join('')), ephemeral: true, components: [] });
        });} else if ((interaction.commandName) == 'add-an-event') {
        await interaction.reply({ content: (['<:asterisk:1505250975282106469> **Error**','\n','<:regional_indicator_x:1505250983436091634> Your highest role must contain the following permissions to run this command: Server Owner or Admin or Manage Server.','\n','<:regional_indicator_x:1505250983436091634> Votre rôle le plus élevé doit contient les permissions suivant pour faire cette commande : Proprietaire du serveur ouAdmin ou Gérer le serveur.'].join('')), ephemeral: true, components: [] });
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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <title>Aide et Commandes Logoto | Configurer votre Bot Discord</title>
            <meta name="description" content="Guide officiel du bot Discord Logoto. Découvrez toutes les commandes (/setup, /help, /add-an-event) pour automatiser le changement de logo et de nom de votre serveur.">
            <link rel="canonical" href="https://logoto.onrender.com/help">
    
            <link rel="alternate" hreflang="fr" href="https://logoto.onrender.com/help">
            <link rel="alternate" hreflang="en" href="https://logoto.onrender.com/help-en">
            <link rel="alternate" hreflang="x-default" href="https://logoto.onrender.com/help">
    
            <meta property="og:type" content="article">
            <meta property="og:url" content="https://logoto.onrender.com/help">
            <meta property="og:title" content="Aide & Commandes | Logoto Bot Discord">
            <meta property="og:description" content="Le tutoriel complet pour configurer l'automatisation des logos et noms de votre serveur Discord.">
            <meta property="og:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
            <meta property="og:locale" content="fr_FR">
    
            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="Aide & Commandes | Logoto Bot Discord">
            <meta name="twitter:description" content="Le tutoriel complet pour configurer l'automatisation de votre serveur Discord.">
            <meta name="twitter:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": "Guide de Configuration et Commandes du Bot Logoto",
              "description": "Apprenez à configurer et utiliser toutes les commandes de Logoto pour automatiser le changement de logo et de nom de votre serveur Discord.",
              "image": "https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png",
              "inLanguage": "fr-FR",
              "author": {
                "@type": "Organization",
                "name": "Logoto",
                "url": "https://logoto.onrender.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Logoto",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png"
                }
              }
            }
            </script>
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #36393f;
                    color: #dcddde;
                    line-height: 1.6;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .content-wrapper { flex-grow: 1; padding: 40px 20px; }
                .container {
                    max-width: 900px;
                    margin: auto;
                    background: #2f3136;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
    
                /* En-tête de navigation haut */
                header {
                    margin-bottom: 35px;
                    border-bottom: 1px solid #4f545c;
                    padding-bottom: 15px;
                }
                .lang-switch {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
    
                h1 { color: #7289da; padding-bottom: 10px; font-size: 2.2rem; margin-top: 10px; }
                h2 { color: #5865f2; margin-top: 35px; border-bottom: 1px solid #4f545c; padding-bottom: 5px; }
                p, li { font-size: 1.1rem; color: #dcddde; }
                code { background-color: #484c52; padding: 3px 6px; border-radius: 4px; font-family: Consolas, monospace; color: #f2f2f2; }
                .note { background-color: #3c3a2e; border-left: 5px solid #ffc107; padding: 15px; margin-top: 25px; border-radius: 4px; color: #ffffff; }
                .note strong { color: #ffc107; }
                .command-list { list-style-type: none; padding: 0; }
                .command-list li { margin-bottom: 10px; background-color: #3a3d42; padding: 12px; border-radius: 5px; }
    
                /* Style des liens par défaut dans le texte */
                .container a { text-decoration: underline; color: #7289da; }
    
                /* Boutons */
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    border-radius: 6px;
                    text-decoration: none !important;
                    font-size: 0.95rem;
                    font-weight: bold;
                    color: #ffffff !important;
                    transition: transform 0.2s, background-color 0.2s;
                    border: none;
                    cursor: pointer;
                }
                .btn:hover { transform: translateY(-1px); }
                .btn-primary { background-color: #5865f2; }
                .btn-primary:hover { background-color: #4f5bda; }
                .btn-secondary { background-color: #4f545c; }
                .btn-secondary:hover { background-color: #5d6269; }
    
                footer { background-color: #2f3136; padding: 15px 20px; color: #99aab5; font-size: 0.9rem; width: 100%; box-sizing: border-box; text-align: center; margin-top: auto; }
                footer a { color: #ffffff; text-decoration: none; margin: 0 10px; }
                footer a:hover { color: #7289da; text-decoration: underline; }
                .footer-links { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 5px; }
                hr { border: 0; border-top: 1px solid #4f545c; margin: 40px 0; }
                ol { padding-left: 20px; }
                ol li { margin-bottom: 15px; }
                ol ul { list-style-type: disc; padding-left: 20px; }
    
                @media (max-width: 480px) {
                    .lang-switch { flex-direction: column; align-items: stretch; text-align: center; }
                    h1 { font-size: 1.8rem; }
                }
            </style>
        </head>
        <body>
    
            <div class="content-wrapper">
                <div class="container">
    
                    <header>
                        <div class="lang-switch">
                            <a href="/" class="btn btn-secondary">← Retour à l'accueil</a>
                            <a href="/help-en" class="btn btn-primary">English version 🇬🇧</a>
                        </div>
                    </header>
    
                    <main>
                        <h1>Aide et Commandes Logoto : Automatisez votre Logo & Nom Discord 🇫🇷</h1>
                        <p>Je suis le bot spécialisé dans l'automatisation du changement de logo et du nom de votre serveur Discord, sans nécessiter de configurations ou de lignes de code complexes.</p>
    
                        <h2>Les Commandes du Bot Logoto</h2>
                        <ul class="command-list">
                            <li><code>/setup</code> : Première commande à faire. Crée automatiquement la catégorie et les salons nécessaires (Logoto, log-logoto) pour un démarrage rapide.</li>
                            <li><code>/add-an-event</code> : Crée automatiquement un salon de planification au bon format pour vos événements futurs (Logo ou Nom).</li>
                            <li><code>/help</code> : Affiche la liste des commandes du bot (ou cette page de documentation !).</li>
                            <li><code>/info</code> : Renvoie toutes les informations utiles concernant l'état actuel et le statut du bot.</li>
                            <li><code>/ping</code> : Obtenez la latence en temps réel entre le bot et l'API Discord.</li>
                            <li><code>/invite</code> : Obtenez le lien d'invitation officiel pour ajouter Logoto sur votre propre serveur.</li>
                            <li><code>/support</code> : Rejoignez notre serveur de support pour poser vos questions ou obtenir de l'aide.</li>
                        </ul>
    
                        <hr>
    
                        <h2>Système de Changement de Logo Automatique</h2>
                        <p>Le bot surveille la présence de salons textuels spécifiques pour planifier et exécuter les changements d'avatar du serveur. Vous pouvez utiliser la commande <code>/add-an-event</code> ou faire la création manuellement :</p>
    
                        <ol>
                            <li>
                                <strong>Créez le Salon de Planification (Logo) :</strong>
                                <ul>
                                    <li>Le salon doit suivre scrupuleusement le format : <code>l-[JOUR]-[MOIS]</code> (ou généré via <code>/add-an-event</code>).</li>
                                    <li>EXEMPLE : Pour programmer un logo automatique pour Halloween (31 octobre) : <code>l-31-10</code></li>
                                </ul>
                            </li>
                            <li>
                                <strong>Préparez le Logo :</strong>
                                <ul>
                                    <li>Envoyez l'image souhaitée dans n'importe quel salon de votre serveur, faites un clic droit dessus et copiez son <strong>lien direct</strong> (URL).</li>
                                    <li>Le lien doit pointer vers un format d'image valide (PNG, JPEG).</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Planifiez le Changement :</strong>
                                <ul>
                                    <li>Modifiez le <strong>Sujet du Salon</strong> (Channel Topic) du salon textuel créé à l'étape 1.</li>
                                    <li>Collez le <strong>lien direct de l'image</strong> directement dans le sujet de ce salon.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Résultat :</strong>
                                <ul>
                                    <li>Le bot changera automatiquement la photo de profil du serveur au jour et au mois indiqués !</li>
                                </ul>
                            </li>
                        </ol>
    
                        <hr>
    
                        <h2>Système de Changement de Nom Automatique</h2>
                        <p>Le principe est identique pour modifier automatiquement le nom d'affichage de votre serveur Discord à une date précise :</p>
    
                        <ol>
                            <li>
                                <strong>Créez le Salon de Planification (Nom) :</strong>
                                <ul>
                                    <li>Le salon doit suivre le format : <code>n-[JOUR]-[MOIS]</code> (ou généré via <code>/add-an-event</code>).</li>
                                    <li>EXEMPLE : Pour planifier un changement de nom le 1er Janvier : <code>n-1-1</code></li>
                                </ul>
                            </li>
                            <li>
                                <strong>Planifiez le Changement :</strong>
                                <ul>
                                    <li>Modifiez le <strong>Sujet du Salon</strong> (Channel Topic) du salon créé.</li>
                                    <li>Écrivez textuellement le <strong>nouveau nom complet</strong> que devra prendre le serveur dans le sujet.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Résultat :</strong>
                                <ul>
                                    <li>Le bot appliquera automatiquement le nouveau nom au jour et au mois spécifiés !</li>
                                </ul>
                            </li>
                        </ol>
    
                        <div class="note">
                            <strong>NOTE IMPORTANTE :</strong> Pour que les vérifications et les changements automatiques s'exécutent correctement, le salon nommé <code>log-logoto</code> <strong>doit impérativement exister</strong> sur votre serveur.
                            <br><br>
                            Le bot utilise ce salon pour envoyer ses messages techniques quotidiens de chargement (<code>l-Loading</code> ou <code>n-Loading</code>), ce qui déclenche la mise à jour des configurations du serveur. La commande <code>/setup</code> s'occupe de le créer proprement pour vous.
                        </div>
                    </main>
    
                </div>
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
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('help.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/help-en', async function(req, res) {
          S4D_APP_write.sync(String('helpen.html'), String(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <title>Logoto Help & Commands | Configure your Discord Bot</title>
            <meta name="description" content="Official guide for the Logoto Discord bot. Discover all commands (/setup, /help, /add-an-event) to automate your Discord server's logo and name changes.">
            <link rel="canonical" href="https://logoto.onrender.com/help-en">
    
            <link rel="alternate" hreflang="fr" href="https://logoto.onrender.com/help">
            <link rel="alternate" hreflang="en" href="https://logoto.onrender.com/help-en">
            <link rel="alternate" hreflang="x-default" href="https://logoto.onrender.com/help">
    
            <meta property="og:type" content="article">
            <meta property="og:url" content="https://logoto.onrender.com/help-en">
            <meta property="og:title" content="Help & Commands | Logoto Discord Bot">
            <meta property="og:description" content="Complete tutorial to configure your Discord server's automatic logo and name changes.">
            <meta property="og:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
            <meta property="og:locale" content="en_US">
    
            <meta name="twitter:card" content="summary">
            <meta name="twitter:title" content="Help & Commands | Logoto Discord Bot">
            <meta name="twitter:description" content="Complete tutorial to configure your Discord server's automation.">
            <meta name="twitter:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "headline": "Logoto Bot Configuration Guide and Commands",
              "description": "Learn how to configure and use all Logoto commands to automate your Discord server logo and name updates.",
              "image": "https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png",
              "inLanguage": "en-US",
              "author": {
                "@type": "Organization",
                "name": "Logoto",
                "url": "https://logoto.onrender.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Logoto",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png"
                }
              }
            }
            </script>
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #36393f;
                    color: #dcddde;
                    line-height: 1.6;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                .content-wrapper { flex-grow: 1; padding: 40px 20px; }
                .container {
                    max-width: 900px;
                    margin: auto;
                    background: #2f3136;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
                }
    
                /* Top Navigation Header */
                header {
                    margin-bottom: 35px;
                    border-bottom: 1px solid #4f545c;
                    padding-bottom: 15px;
                }
                .lang-switch {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                }
    
                h1 { color: #7289da; padding-bottom: 10px; font-size: 2.2rem; margin-top: 10px; }
                h2 { color: #5865f2; margin-top: 35px; border-bottom: 1px solid #4f545c; padding-bottom: 5px; }
                p, li { font-size: 1.1rem; color: #dcddde; }
                code { background-color: #484c52; padding: 3px 6px; border-radius: 4px; font-family: Consolas, monospace; color: #f2f2f2; }
                .note { background-color: #3c3a2e; border-left: 5px solid #ffc107; padding: 15px; margin-top: 25px; border-radius: 4px; color: #ffffff; }
                .note strong { color: #ffc107; }
                .command-list { list-style-type: none; padding: 0; }
                .command-list li { margin-bottom: 10px; background-color: #3a3d42; padding: 12px; border-radius: 5px; }
    
                /* Text Links style */
                .container a { text-decoration: underline; color: #7289da; }
    
                /* Buttons */
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    border-radius: 6px;
                    text-decoration: none !important;
                    font-size: 0.95rem;
                    font-weight: bold;
                    color: #ffffff !important;
                    transition: transform 0.2s, background-color 0.2s;
                    border: none;
                    cursor: pointer;
                }
                .btn:hover { transform: translateY(-1px); }
                .btn-primary { background-color: #5865f2; }
                .btn-primary:hover { background-color: #4f5bda; }
                .btn-secondary { background-color: #4f545c; }
                .btn-secondary:hover { background-color: #5d6269; }
    
                footer { background-color: #2f3136; padding: 15px 20px; color: #99aab5; font-size: 0.9rem; width: 100%; box-sizing: border-box; text-align: center; margin-top: auto; }
                footer a { color: #ffffff; text-decoration: none; margin: 0 10px; }
                footer a:hover { color: #7289da; text-decoration: underline; }
                .footer-links { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 5px; }
                hr { border: 0; border-top: 1px solid #4f545c; margin: 40px 0; }
                ol { padding-left: 20px; }
                ol li { margin-bottom: 15px; }
                ol ul { list-style-type: disc; padding-left: 20px; }
    
                @media (max-width: 480px) {
                    .lang-switch { flex-direction: column; align-items: stretch; text-align: center; }
                    h1 { font-size: 1.8rem; }
                }
            </style>
        </head>
        <body>
    
            <div class="content-wrapper">
                <div class="container">
    
                    <header>
                        <div class="lang-switch">
                            <a href="/index-en" class="btn btn-secondary">← Back to Home</a>
                            <a href="/help" class="btn btn-primary">Afficher en Français 🇫🇷</a>
                        </div>
                    </header>
    
                    <main>
                        <h1>Logoto Help - Automate your Logo & Name! 🇬🇧</h1>
                        <p>I am the bot specialized in automating the change of your server's logo AND name, without requiring complex configurations or lines of code after the initial setup.</p>
    
                        <h2>Commands</h2>
                        <ul class="command-list">
                            <li><code>/setup</code> : First command to run. Automatically creates the required category and channels (Logoto, log-logoto) for a quick start.</li>
                            <li><code>/add-an-event</code> : Automatically creates a scheduling channel with the correct format for your future events (Logo or Name).</li>
                            <li><code>/help</code> : Displays the bot commands list (or this documentation page!).</li>
                            <li><code>/info</code> : Returns all useful information regarding the current state and status of the bot.</li>
                            <li><code>/ping</code> : Get the real-time latency between the bot and the Discord API.</li>
                            <li><code>/invite</code> : Get the official invitation link to add Logoto to your own server.</li>
                            <li><code>/support</code> : Join our support server to ask questions or get assistance.</li>
                        </ul>
    
                        <hr>
    
                        <h2>Automatic Logo Change System</h2>
                        <p>The bot monitors specific text channels to schedule and execute server avatar changes. You can use the <code>/add-an-event</code> command or create them manually:</p>
    
                        <ol>
                            <li>
                                <strong>Create the Scheduling Channel (Logo):</strong>
                                <ul>
                                    <li>The channel name must strictly follow this format: <code>l-[DAY]-[MONTH]</code> (or generated via <code>/add-an-event</code>).</li>
                                    <li>EXAMPLE: To schedule an automatic logo for Halloween (October 31st): <code>l-31-10</code></li>
                                </ul>
                            </li>
                            <li>
                                <strong>Prepare the Logo:</strong>
                                <ul>
                                    <li>Upload your desired image to any channel on your server, right-click it, and copy its <strong>direct link</strong> (URL).</li>
                                    <li>The link must point to a valid image format (PNG, JPEG).</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Schedule the Change:</strong>
                                <ul>
                                    <li>Edit the <strong>Channel Topic</strong> of the text channel created in step 1.</li>
                                    <li>Paste the <strong>direct image link</strong> directly into the topic of this channel.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Result:</strong>
                                <ul>
                                    <li>The bot will automatically change the server's profile picture on the specified day and month!</li>
                                </ul>
                            </li>
                        </ol>
    
                        <hr>
    
                        <h2>Automatic Name Change System</h2>
                        <p>The principle is identical for automatically changing your Discord server's display name on a key date:</p>
    
                        <ol>
                            <li>
                                <strong>Create the Scheduling Channel (Name):</strong>
                                <ul>
                                    <li>The text channel name must follow this format: <code>n-[DAY]-[MONTH]</code> (or generated via <code>/add-an-event</code>).</li>
                                    <li>EXAMPLE: To schedule a name change on January 1st: <code>n-1-1</code></li>
                                </ul>
                            </li>
                            <li>
                                <strong>Schedule the Change:</strong>
                                <ul>
                                    <li>Edit the <strong>Channel Topic</strong> of the created channel.</li>
                                    <li>Type the exact <strong>new full name</strong> that the server should take inside the channel topic.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Result:</strong>
                                <ul>
                                    <li>The bot will automatically apply the new name on the specified date!</li>
                                </ul>
                            </li>
                        </ol>
    
                        <div class="note">
                            <strong>IMPORTANT NOTE:</strong> For the automatic daily verifications and changes to run properly, the channel named <code>log-logoto</code> <strong>must absolutely exist</strong> on your server.
                            <br><br>
                            The bot uses this channel to send its daily technical loading messages (<code>l-Loading</code> or <code>n-Loading</code>), which trigger the server configurations refresh. The <code>/setup</code> command takes care of creating it cleanly for you.
                        </div>
                    </main>
    
                </div>
            </div>
    
            <footer>
                <p>This site is hosted on Render. Logoto is a personal project.</p>
                <div class="footer-links">
                    <a href="/tos">Terms of Service (ToS)</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer">Source Code</a>
                </div>
            </footer>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('helpen.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/index-en', async function(req, res) {
          S4D_APP_write.sync(String('homeen.html'), String(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <title>Logoto: Discord Bot to Automatically Change Logo and Server Name</title>
            <meta name="description" content="Discover Logoto, the ultimate Discord bot to automate and schedule your server's icon and name changes. Easily manage everything with /setup and /add-an-event!">
            <link rel="canonical" href="https://logoto.onrender.com/index-en">
    
            <link rel="alternate" hreflang="fr" href="https://logoto.onrender.com/">
            <link rel="alternate" hreflang="en" href="https://logoto.onrender.com/index-en">
            <link rel="alternate" hreflang="x-default" href="https://logoto.onrender.com/">
    
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://logoto.onrender.com/index-en">
            <meta property="og:title" content="Logoto: Discord Automation Bot">
            <meta property="og:description" content="Schedule your Discord server's logo and name changes automatically for your events.">
            <meta property="og:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
            <meta property="og:locale" content="en_US">
    
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="Logoto: Discord Automation Bot">
            <meta name="twitter:description" content="Automate your server's logo and name updates for seasonal and special events.">
            <meta name="twitter:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
    
            <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Logoto",
              "description": "Discord bot to automate and schedule server logo and name changes.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Discord",
              "inLanguage": "en-US",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
            </script>
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 100vh;
                    background-color: #36393f;
                    color: #ffffff;
                    text-align: center;
                    box-sizing: border-box;
                }
    
                .main-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 1;
                    padding: 20px;
                }
    
                .lang-header {
                    width: 100%;
                    max-width: 600px;
                    margin-top: 20px;
                    text-align: right;
                }
    
                .lang-link {
                    color: #7289da;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 0.95rem;
                    background-color: #2f3136;
                    padding: 8px 15px;
                    border-radius: 5px;
                    transition: background-color 0.2s;
                }
                .lang-link:hover {
                    background-color: #4f545c;
                }
    
                .container { max-width: 600px; width: 100%; margin-top: auto; margin-bottom: auto; }
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
    
                footer {
                    background-color: #2f3136;
                    padding: 15px 20px;
                    color: #99aab5;
                    font-size: 0.9rem;
                    width: 100%;
                    box-sizing: border-box;
                }
                footer a {
                    color: #ffffff;
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
                <header class="lang-header">
                    <a href="/" class="lang-link">Français 🇫🇷</a>
                </header>
    
                <main class="container">
                    <img src="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png"
                         alt="Logoto icon, the automatic Discord bot for server logo and name changes"
                         class="icon">
    
                    <h1>Logoto: Automate Your Discord Server's Logo and Name</h1>
    
                    <p class="description">
                        Logoto is the ultimate <strong>Discord bot</strong> designed to <strong>automate your server's icon</strong> and <strong>name changes</strong>.
                        Easily schedule your modifications for special events, seasons, or community celebrations, effortlessly!
                    </p>
    
                    <div class="button-container">
                        <a href="https://discord.com/oauth2/authorize?client_id=1431383390162124920"
                           class="btn btn-primary"
                           target="_blank"
                           rel="noopener noreferrer"> Add to Discord
                        </a>
    
                        <a href="/help-en" class="btn btn-secondary">
                            View Help & Commands
                        </a>
                    </div>
                </main>
            </div>
    
            <footer>
                <p>This site is hosted on Render. Logoto is a personal project.</p>
                <div class="footer-links">
                    <a href="/tos">Terms of Service (ToS)</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer">Source Code</a>
                </div>
            </footer>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('homeen.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/', async function(req, res) {
          S4D_APP_write.sync(String('home.html'), String(`<!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <title>Logoto : Bot Discord pour Changer Logo et Nom Automatiquement</title>
            <meta name="description" content="Découvrez Logoto, le bot Discord d'automatisation pour planifier le changement du logo et du nom de votre serveur. Gérez tout facilement avec /setup et /add-an-event !">
            <link rel="canonical" href="https://logoto.onrender.com/">
    
            <meta name="google-site-verification" content="u2mt1kkF8HLYxuULsxpdU7e8dJKFjj0ItJ6IPLcs23s">
    
            <link rel="alternate" hreflang="fr" href="https://logoto.onrender.com/">
            <link rel="alternate" hreflang="en" href="https://logoto.onrender.com/index-en">
            <link rel="alternate" hreflang="x-default" href="https://logoto.onrender.com/">
    
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://logoto.onrender.com/">
            <meta property="og:title" content="Logoto : Bot d'Automatisation Discord">
            <meta property="og:description" content="Planifiez le changement de logo et de nom de votre serveur Discord pour vos événements.">
            <meta property="og:image" content="https://raw.githubusercontent.com/kanooob/Logoto/refs/heads/main/Logoto.png">
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
              "description": "Bot Discord pour automatiser et planifier le changement du logo et du nom d'un serveur avec /setup et /add-an-event.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Discord",
              "inLanguage": "fr-FR",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              }
            }
            </script>
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 100vh;
                    background-color: #36393f;
                    color: #ffffff;
                    text-align: center;
                    box-sizing: border-box;
                }
    
                .main-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 1;
                    padding: 20px;
                }
    
                .lang-header {
                    width: 100%;
                    max-width: 600px;
                    margin-top: 20px;
                    text-align: right;
                }
    
                .lang-link {
                    color: #7289da;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 0.95rem;
                    background-color: #2f3136;
                    padding: 8px 15px;
                    border-radius: 5px;
                    transition: background-color 0.2s;
                }
                .lang-link:hover {
                    background-color: #4f545c;
                }
    
                .container { max-width: 600px; width: 100%; margin-top: auto; margin-bottom: auto; }
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
    
                footer {
                    background-color: #2f3136;
                    padding: 15px 20px;
                    color: #99aab5;
                    font-size: 0.9rem;
                    width: 100%;
                    box-sizing: border-box;
                }
                footer a {
                    color: #ffffff;
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
                <header class="lang-header">
                    <a href="/index-en" class="lang-link">English 🇬🇧</a>
                </header>
    
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
            <meta name="description" content="Politique de confidentialité du bot Discord Logoto. Détails sur les données nécessaires (Serveur ID, configurations d'événements) et leur utilisation pour le service d'automatisation.">
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
                    <p>Dernière mise à jour : 20/05/2026</p>
                    <hr>
    
                    <p>
                        La présente Politique de Confidentialité décrit les types d'informations que le Bot Discord Logoto ("le Service") collecte, comment ces informations sont utilisées et les mesures prises pour assurer leur protection. Le service est fourni par Galaxie_s9, un développeur indépendant.
                    </p>
    
                    <h2>1. Collecte et Utilisation des Informations</h2>
                    <p>
                        Logoto est un bot axé sur la fonctionnalité et la minimisation des données. Nous ne traitons et ne conservons que les informations strictement nécessaires pour fournir le service d'automatisation et de planification.
                    </p>
    
                    <h3>Types de Données Collectées :</h3>
                    <ul>
                        <li>
                            <strong>Identifiants de Serveur (Guild IDs) :</strong> L'identifiant unique de votre serveur Discord est traité pour associer votre serveur à ses configurations de planification d'événements.
                        </li>
                        <li>
                            <strong>Configurations d'Événements (Noms et URLs d'images) :</strong> Lorsque vous utilisez la commande <code>/add-an-event</code>, le nouveau nom planifié du serveur et/ou le lien de l'image du logo fournis sont enregistrés pour permettre au bot d'exécuter la modification à la date définie.
                        </li>
                        <li>
                            <strong>Identifiants d'Utilisateur (User IDs) :</strong> L'identifiant unique de l'utilisateur exécutant une commande (ex: <code>/setup</code>, <code>/add-an-event</code>) est vérifié de manière éphémère pour s'assurer qu'il possède les permissions requises sur le serveur. Il n'est pas stocké de manière permanente.
                        </li>
                    </ul>
    
                    <div class="important-note">
                        <strong>Logoto ne stocke PAS :</strong> Les messages privés, le contenu des salons textuels de discussion, les adresses IP, l'historique complet des utilisateurs, ni aucune donnée personnelle sensible.
                    </div>
    
                    <h2>2. Finalité du Traitement des Données</h2>
                    <p>
                        Les informations collectées sont utilisées exclusivement pour les finalités suivantes :
                    </p>
                    <ul>
                        <li>Fournir et opérer le service Logoto (changer automatiquement le logo et/ou le nom du serveur à la date prévue).</li>
                        <li>Envoyer un compte-rendu ou un log d'activité directement sur votre serveur dans le salon configuré pour le suivi des tâches.</li>
                        <li>Assurer la sécurité, la stabilité et le dépannage technique du Bot.</li>
                    </ul>
    
                    <h2>3. Partage des Informations</h2>
                    <p>
                        Nous ne vendons, n'échangeons, ni ne louons vos configurations ou vos identifiants de serveur à des tiers. Les seules entités intervenant dans le traitement technique sont :
                    </p>
                    <ul>
                        <li><strong>Discord :</strong> En utilisant ce Bot, vos données transitent par l'infrastructure de Discord et vous restez soumis à leurs conditions d'utilisation.</li>
                        <li><strong>L'Hébergeur :</strong> Le Bot s'exécute et stocke de manière sécurisée ses fichiers de configuration sur la plateforme d'hébergement Render.</li>
                    </ul>
    
                    <h2>4. Conservation et Suppression des Données</h2>
                    <p>
                        Les données de configuration liées à la planification des événements sont conservées tant que le Bot Logoto est présent sur votre serveur Discord. Si vous retirez (kickez) le Bot de votre serveur, l'événement Discord correspondant supprime instantanément l'intégralité des données et fichiers associés à l'identifiant de votre serveur.
                    </p>
    
                    <h2>5. Conformité au RGPD (Résidents de l'UE)</h2>
                    <p>
                        Si vous êtes résident de l'Espace Économique Européen (EEE), vous avez certains droits en vertu du Règlement Général sur la Protection des Données (RGPD) :
                    </p>
                    <ul>
                        <li>Droit d'accès, de rectification et d'effacement des données de configuration liées à votre serveur.</li>
                        <li>Droit de retirer votre consentement à tout moment (en retirant simplement le Bot de votre serveur, ce qui détruit immédiatement les configurations liées).</li>
                    </ul>
                    <p>
                        Pour toute demande d'exercice de vos droits, vous pouvez nous contacter à l'adresse indiquée dans la section 7.
                    </p>
    
                    <h2>6. Sécurité des Données</h2>
                    <p>
                        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger les configurations stockées. Cependant, aucun mode de transmission ou de stockage électronique sur Internet ne peut être garanti à 100 %.
                    </p>
    
                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question ou demande concernant cette Politique de Confidentialité, veuillez nous contacter à l'adresse e-mail dédiée : <a href="mailto:galaxies9@duck.com">galaxies9@duck.com</a>.
                    </p>
    
                </main>
    
            </div>
    
            <footer>
                <p>Logoto est un projet personnel. | <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer">Voir le code source</a></p>
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
                    <p>Dernière mise à jour : 20/05/2026</p>
                    <hr>
    
                    <h2>1. Acceptation des Conditions</h2>
                    <p>
                        Bienvenue sur Logoto, un service fourni par un développeur indépendant, Galaxie_S9.
                        En ajoutant et en utilisant le bot Logoto sur votre serveur Discord, vous acceptez d'être lié par les présentes Conditions d'Utilisation (les "ToS") et toutes les lois et réglementations applicables. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Bot.
                    </p>
    
                    <h2>2. Description du Service</h2>
                    <p>
                        Logoto est un bot Discord conçu pour l'automatisation. Son rôle principal est de permettre aux administrateurs de serveurs de <strong>changer automatiquement le logo et/ou le nom de leur serveur</strong> Discord à des dates et heures planifiées. Ces événements et planifications se configurent simplement à l'aide des commandes slash dédiées (comme <code>/setup</code> et <code>/add-an-event</code>).
                    </p>
    
                    <h2>3. Conditions d'Utilisation et Engagements de l'Utilisateur</h2>
                    <p>
                        L'utilisateur s'engage à respecter les règles suivantes lors de l'utilisation de Logoto :
                    </p>
                    <ol>
                        <li>
                            <strong>Conformité à Discord :</strong> L'utilisation de Logoto doit impérativement être conforme aux <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Conditions d'Utilisation de Discord</a> et aux <a href="https://discord.com/guidelines" target="_blank" rel="noopener noreferrer">Directives de la Communauté Discord</a>. Toute violation de ces règles via Logoto est interdite.
                        </li>
                        <li>
                            <strong>Autorisations :</strong> L'utilisateur garantit qu'il dispose des autorisations nécessaires (Gestion du Serveur) pour installer, configurer et planifier des événements avec Logoto.
                        </li>
                        <li>
                            <strong>Contenu :</strong> Il est strictement interdit d'utiliser Logoto pour planifier ou afficher des logos ou des noms de serveur qui sont illégaux, offensants, haineux, violents, ou qui enfreignent les droits d'auteur.
                        </li>
                        <li>
                            <strong>Abus du Service :</strong> Il est interdit d'utiliser le Bot de manière abusive ou excessive (notamment les spams de requêtes) qui pourrait nuire au bon fonctionnement du service ou à la stabilité des infrastructures.
                        </li>
                    </ol>
    
                    <h2>4. Propriété Intellectuelle et Licence</h2>
                    <ol>
                        <li>
                            <strong>Code Logoto :</strong> Le code source de Logoto est la propriété de Galaxie_S9 et est distribué librement sous la licence MIT sur <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer">GitHub</a>.
                        </li>
                        <li>
                            <strong>Contenu Utilisateur :</strong> Les logos, images et noms de serveur que l'utilisateur planifie via le Bot demeurent la propriété exclusive de leurs auteurs ou du serveur Discord concerné. Logoto ne revendique aucun droit sur ce contenu.
                        </li>
                    </ol>
    
                    <h2>5. Limitation de Responsabilité et Avertissement</h2>
                    <p>
                        <strong>Logoto est fourni « tel quel » sans garantie d'aucune sorte.</strong> En tant que projet indépendant, nous ne pouvons garantir que le service sera totalement ininterrompu, exempt d'erreurs ou disponible 100% du temps.
                    </p>
                    <p>
                        Nous ne pourrons être tenus responsables des dommages causés directement ou indirectement par l'utilisation du Bot, y compris, mais sans s'y limiter, les erreurs ou retards dans l'application automatique d'une planification de logo ou de nom. L'utilisateur utilise le Bot à ses propres risques.
                    </p>
    
                    <h2>6. Modifications et Résiliation</h2>
                    <ol>
                        <li>
                            <strong>Modifications :</strong> Nous nous réservons le droit de modifier ces Conditions à tout moment. La date de la dernière mise à jour sera systématiquement indiquée en haut de cette page. L'utilisation continue du Bot après une modification vaut acceptation des nouvelles Conditions.
                        </li>
                        <li>
                            <strong>Résiliation :</strong> Nous pouvons suspendre ou mettre fin à l'accès de Logoto à n'importe quel serveur, sans préavis, en cas de non-respect ou de violation constatée des présentes Conditions.
                        </li>
                    </ol>
    
                    <h2>7. Contact</h2>
                    <p>
                        Pour toute question ou préoccupation concernant ces Conditions d'Utilisation ou l'utilisation du Bot Logoto, veuillez nous contacter à l'adresse e-mail dédiée : <a href="mailto:galaxies9@duck.com">galaxies9@duck.com</a>.
                    </p>
    
                </main>
    
            </div>
    
            <footer>
                <p>Logoto est un projet personnel. | <a href="https://github.com/kanooob/Logoto" target="_blank" rel="noopener noreferrer">Voir le code source</a></p>
            </footer>
    
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('tos.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/404', async function(req, res) {
          S4D_APP_write.sync(String('404.html'), String(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Page Not Found | Logoto</title>
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
    
                <h1>Oops, this page has disappeared.</h1>
    
                <p>
                    Sorry, but we couldn't find the page you were looking for.<br>
                    Please use the buttons below to return to a known area.
                </p>
    
                <div class="button-container">
                    <a href="/index-en" class="btn btn-primary">
                        Return to Home
                    </a>
    
                    <a href="/help-en" class="btn btn-secondary">
                        Access Help
                    </a>
                </div>
            </div>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('404.html')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.all('/robots.txt', async function(req, res) {
          S4D_APP_write.sync(String('robots.txt'), String(`User-agent: *
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
            <lastmod>2026-05-20</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.00</priority>
          </url>
    
          <url>
            <loc>https://logoto.onrender.com/index-en</loc>
            <lastmod>2026-05-20</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.00</priority>
          </url>
    
          <url>
            <loc>https://logoto.onrender.com/help</loc>
            <lastmod>2026-05-20</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.80</priority>
          </url>
    
          <url>
            <loc>https://logoto.onrender.com/help-en</loc>
            <lastmod>2026-05-20</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.80</priority>
          </url>
    
          <url>
            <loc>https://logoto.onrender.com/tos</loc>
            <lastmod>2026-05-20</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.60</priority>
          </url>
    
          <url>
            <loc>https://logoto.onrender.com/privacy</loc>
            <lastmod>2026-05-20</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.60</priority>
          </url>
    
        </urlset>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('sitemap.xml')))
    
      })
      S4D_WEBSITECREATION_EXPRESS_app.use(function(req, res) {
          S4D_APP_write.sync(String('Redirection.html'), String(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
            <meta http-equiv="refresh" content="0; url=/404">
    
            <title>Redirecting...</title>
    
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #36393f;
                    color: #dcddde;
                    text-align: center;
                    padding-top: 50px;
                }
                a {
                    color: #7289da;
                    text-decoration: underline;
                }
                a:hover {
                    color: #5865f2;
                }
            </style>
        </head>
        <body>
            <p>Invalid request detected. Immediate redirection to page 404...</p>
            <p>If the redirection is not automatic, please click here: <a href="/404">Page not found (404)</a>.</p>
        </body>
        </html>`), { overwrite: true });res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('Redirection.html')))
    
      })
    
    
    S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);
    eventEmitter.on('1', async => {
          s4d.client.guilds.cache.forEach(async (s) =>{
         if ((s).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) != null) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:loop:1505215574387589162> l-Loading')});
        }
        if ((s).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) != null) {
          (s).channels.cache.find((category) => category.name === 'log-logoto').send({content:String('<:loop:1505215574387589162> n-Loading')});
        }
    
      })
    
      });
    
    s4d.client.on('guildCreate', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot ajouté dans **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannel).send({content:String((['<:loudspeaker:1505590722798293253> **Thank you for adding me**','\n','Logoto is a Discord bot that automates the changing of your server\'s icon and name.','\n','<:track_next:1505295937856213072> To get started, run the following command: </setup:1431390983215386674>','\n','Logoto est un bot Discord qui automatiser le changement de l\'icône et du nom de votre serveur.','\n','<:track_next:1505295937856213072> Pour commencer, exécutez la commande suivante : </setup:1431390983215386674>'].join('')))});
      await delay(Number(0.1)*1000);
      ((s4d.client.guilds.cache.get((s4dguild.id))).systemChannel).messages.fetch({ limit: 1 }).then(async (last_messages_in_channel) => {
            (s4d.client.users.cache.get(String((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId))))).send({content:String((['<:loudspeaker:1505590722798293253> **I thank the ',s4dguild.name,' Discord server team.**','\n','<:track_next:1505295937856213072> For more information, please visit my website and my support server.','\n','<:track_next:1505295937856213072> Pour plus d\'information vous avez mon site internet et mon serveurs de support.','\n','-# <:link:1505215573364047913> [Website](https://logoto.onrender.com/index-en), [Support server](https://discord.gg/TPXFVYVnXe), https://discord.com/channels/',s4dguild.id,'/',((last_messages_in_channel.at(1 - 1)).channel).id,'/',(last_messages_in_channel.at(1 - 1)).id].join('')))});
    
      });
    
    });
    
    s4d.client.on('messageCreate', async (s4dmessage) => {
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '<:loop:1505215574387589162> l-Loading') {
        (s4dmessage.guild).setIcon(((s4dmessage.guild).channels.cache.find((category) => category.name === (['l-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de logo.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server logo changed.')});
        console.log((['Logo du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
      if ((typeof (s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))) !== undefined) && ((s4dmessage).content) == '<:loop:1505215574387589162> n-Loading') {
        (s4dmessage.guild).setName(((s4dmessage.guild).channels.cache.find((category) => category.name === (['n-',(new Date().getDate()),'-',((new Date().getMonth())) + 1].join(''))).topic),'changement de nom.')
    
        s4dmessage.channel.send({content:String('<:check:1505215575822172170> Server name changed.')});
        console.log((['Nom du serveur ',(s4dmessage.guild).name,' (',(s4dmessage.guild).id,').'].join('')));
      }
    
    });
    
    s4d.client.on('guildDelete', async (s4dguild) => {
      s4d.client.channels.cache.get('1432341468059537419').send({content:String((['Bot enlevé de **',s4dguild.name,'** (`',s4dguild.id,'`).'].join('')))});
    
    });
    
    return s4d
})();