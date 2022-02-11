// ---------------------------PACKAGE REQUIREMENTS---------------------------------

const express = require("express");
const app = express();
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const fs = require("fs");
const prefix = "e.";
const Database = require("@replit/database")
const db = new Database()

const { MessageActionRow, MessageButton } = require('discord.js');

// ------------------------------BOT STARTUP------------------------------------

app.listen(3000, () => {
  console.log("Project is running!");
})

app.get("/", (req, res) => {
  res.send("this do be a bruh moment");
})

client.on('ready', () => {
  client.user.setActivity('[ELITE] Clan | e.help', { type: 'WATCHING' })
})

client.on("messageCreate", async message => {
  
  // ---------------------------UTILITY COMMANDS---------------------------------

  if (message.content === "e.ping") {
    let pingembed = new Discord.MessageEmbed()
      .setTitle("Ping Command")
      .setDescription(`:desktop: **Ping - ${client.ws.ping} ms**`)
      .setColor("#42F400")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.reply("Pinging... <a:typing:940429563320754217>").then(m => {
    setTimeout(() => {
    m.edit({ content: `Showing ${message.author}'s ping to discord:`, embeds: [pingembed] })
    }, 420);
    })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **ping** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.avatar")) {
    let user = message.mentions.users.first() || message.author;
    let member = message.mentions.members.first() || message.member;
    let embed = new Discord.MessageEmbed()
      .setTitle(`${user.username}'s Avatar!`)
      .setDescription(`*Requested by ${message.author.username}*`)
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
    message.channel.send({ embeds: [embed] });
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **avatar** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.whois")) {
    let user = message.mentions.users.first() || message.author;
    let member = message.mentions.members.first() || message.member;
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${user.username}'s Userinfo`)
      .setDescription(`*Requested by ${message.author.username}*`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addField("User Mention", `<@${user.id}>`, true)
      .addField('Usertag:', `**${user.tag}**`, true)
      .addField("UserID:", `**${user.id}**`, true)
      .addField("Created At:", `**${user.createdAt}**`, true)
      .addField("Joined At:", `**${member.joinedAt}**`, true)
      .addField("Nickname:", `**${member.displayName}**`, true)
      .addField(`Roles [${member.roles.cache.size}]:`, member.roles.cache.map(r => '<@&'+r.id+'>').join(' - '))
      .setFooter('Elite Bot | v1.0.0')
      .setTimestamp()
    message.reply("Loading... Please Wait <a:typing:940429563320754217>").then(m => {
    setTimeout(() => {
    m.edit({ content: `Showing ${user.username}'s info`, embeds: [embed] })
    }, 500);
    })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **whois** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.serverinfo")) {
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Server Info")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription("Information about this server:")
      .addField("Server Name", `${message.guild.name}`)
      .addField("Server ID", `${message.guild.id}`)
      .addField("Date Created", `${message.guild.createdAt.toDateString()}`, true)
      .addField("Verification Level", `${message.guild.verificationLevel}`, true)
      .addField("Owner", `${message.guild.ownerID}`, true)
      .addField("Total Members", `${message.guild.memberCount}`, true)
      .addField("Total Channels", `${message.guild.channels.cache.size}`, true)
      .addField("Total Roles", `${message.guild.roles.cache.size}`, true)
      .addField("Total Emotes", `${message.guild.emojis.cache.size}`, true)
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.reply("Loading... Please Wait <a:typing:940429563320754217>").then(m => {
    setTimeout(() => {
    m.edit({ content: `Showing the "serverinfo" command:`, embeds: [embed] })
    }, 525);
    })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **serverinfo** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }
  
  let days = Math.floor(client.uptime / 86400000);
  let hours = Math.floor(client.uptime / 3600000) % 24;
  let minutes = Math.floor(client.uptime / 60000) % 60;
  let seconds = Math.floor(client.uptime / 1000) % 60;
  if (message.content === "e.uptime") {
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Requested by ${message.author.tag}`)
      .setTitle("Uptime Command")
      .setDescription(`:timer: ***Elite Bot's Uptime:*** | ${days}d ${hours}h ${minutes}m ${seconds}s`)
      .setColor("RANDOM")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.reply({ embeds: [embed] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **uptime** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  // -----------------------------HELP COMMANDS-----------------------------------

  if (message.content === "e.help") {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('DM me this message')
        .setStyle('PRIMARY')
        .setCustomId('dm_message')
    )
    let e = new Discord.MessageEmbed()
      .setTitle("Help Screen")
      .setDescription("Welcome to the **Help Screen**. Here you can find out how to use this bot properly and see what commands it has! Note: This bot is still under **very heavy development**, so some of the stuff listed will not be 100% accurate. That being said, we hope you find what you need.")
      .addField("Command Help", "You can use the `e.cmdlist` command to bring up an embed that will allow you to cycle through the different command categories.")
      .addField("Bot Info", "This bots prefix is `e.`\nYou can check to see how long the bot has been online by using the `e.uptime` command.\nThis bot is coded using the coding language `node.js` which is a version of `JavaScript` and is using `node.js v17.4.0`.\n\nFor more bot information, use the following commad:\n`e.botinfo`")
      .setColor("RANDOM")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.reply({ content: 'Press the button below if you want to be dmed this message.', embeds: [e], components: [btnRow] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 50000 })
      collecter.on('collect', async i => {
        if (i.customId === 'dm_message') {
          message.author.send({ content: 'Here is the message.', embeds: [e] })
          i.update({ content: 'This message has been dmed to you.', embeds: [e], components: [] })
        }
      })
      let logcmd = new Discord.MessageEmbed()
      .setTitle("Command Logger")
      .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **help** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      .setColor("#661111")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
      collecter.on('collect', async collected => {
        return;
      })
    })
  }

  if (message.content === "e.cmdlist") {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Utility')
        .setStyle("PRIMARY")
        .setCustomId("utility_cmds"),
      new MessageButton()
        .setLabel('Help')
        .setStyle("PRIMARY")
        .setCustomId("help_cmds"),
      new MessageButton()
        .setLabel('Fun')
        .setStyle("PRIMARY")
        .setCustomId("fun_cmds"),
      new MessageButton()
        .setLabel('Short')
        .setStyle("PRIMARY")
        .setCustomId("short_cmds"),
      new MessageButton()
        .setLabel('Moderation')
        .setStyle("PRIMARY")
        .setCustomId("mod_cmds")
    )
    const pg2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Econamy')
        .setStyle("SECONDARY")
        .setCustomId("eco_cmds"),
      new MessageButton()
        .setLabel('Triggers')
        .setStyle("SUCCESS")
        .setCustomId("triggers"),
      new MessageButton()
        .setLabel('Test/Other')
        .setStyle("DANGER")
        .setCustomId("test_cmds"),
    )
    let cmd = new Discord.MessageEmbed()
      .setAuthor(`Requested by ${message.author.tag}`)
      .setTitle("Command List")
      .setDescription("Welcome to the updated command list! You can now use **discord buttons** to toggle between each category of commands. Once you hit a button, you won't see this embed again. You can switch inbetween all each of the sections as many times as you like, just it may delay your inputs if you do it too much.\n\n**WHAT EACH BUTTON COLOR MEANS**\n`Blue - Normal/Working Command Categories\nGray - Categories That Don't Have Anything In Them\nGreen - Categories That Have a Catch/Aren't 'commands'.\nRed - Categories That Are Volitile/Are Either Incomplete or Have Commands That Can Crash`\n\nHope you find what you need!")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let uti = new Discord.MessageEmbed()
      .setTitle("Utility Commands")
      .setDescription("This is a list of all of the bots **Utility** commands. It includes all of the commands and a description of what each command does.")
      .addField("e.avatar", "A command that uses author tags or mention tags to get your profile photo and posts it in an embed.\n`Example: e.avatar @StuffyNose69`")
      .addField("e.ping", "Gives you your current ping to discord.")
      .addField("e.serverinfo", "Gives some information about the server teh command was used in.")
      .addField("e.uptime", "Shows the amount of time the bot has been online since last crash/update.")
      .addField("e.whois", "Gives information about either the person that sent the command or the person mentioned in the command.\n`Example: e.whois @StuffyNose69`")
      .addField("e.suggest", "Allows you to make suggestions for both the bot and the server.\n`Example: e.suggest make an actually good bot like god damn`")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let help = new Discord.MessageEmbed()
      .setTitle("Help Commands")
      .setDescription("This is a list of all of the bots **Help** commands. It includes all of the commands and a description of what each command does.")
      .addField("e.help", "Gives you a basic description of what the bot does and command lists.")
      .addField("e.embedtemplate", "Gives you a detailed example of an embed.")
      .addField("e.botinvite", "Gives you a link to invite the bot to your server.")
      .addField("e.botinfo", "Gives you some basic information about the bot.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let fun = new Discord.MessageEmbed()
      .setTitle("Fun Commands")
      .setDescription("This is a list of all of the bots **Fun** commands. It includes all of the commands and a description of what each command does.")
      .addField("e.pp", "A command that generates a random response in the shape of a dick.")
      .addField("e.cancelme", "A command that gives the user a 'How To Guide' on how to get canceled on Twitter.")
      .addField("e.slap", "A command that 'slaps' the user mentioned in the command.\n`Example: e.slap @StuffyNose69`")
      .addField("e.hug", "A command that 'hugs' the user mentioned in the command.\n`Example: e.hug @StuffyNose69`")
      .addField("e.shut", "A command that tells the mentioned user to shut up.\n`Example: e.shut @StuffyNose69`")
      .addField("e.sus", "A command that gives a pixel-art version of the word 'sus'.")
      .addField("e.okipullup", "A command that reads outputs the first 4 lyrics of Don Toliver's song 'After Party' and prints a picture of Don Toliver.")
      .addField("e.helpme", "Generates a response with a button that, when pressed, makes fun of you.")
      .addField("e.hack", "A command that allows you to 'hack' a mentioned member.\n`Example: e.hack @StuffyNose69`")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let short = new Discord.MessageEmbed()
      .setTitle("Short Commands")
      .setDescription("This is a list of all of the bots **Short** commands. It includes all of the commands and a description of what each command does.")
      .addField("e.69", "Replies to the user with 'nice'.")
      .addField("e.bruh", "Replies to the user with 'moment'.")
      .addField("e.thisisahellalongcommandwhydidyoumakethis", "A command that replies to the user with 'idfk'.")
      .addField("e.fruits", "Reacts to the user with assorted fruit reactions.")
      .addField("e.fruity", "Reacts to the user with the gay pride flag.")
      .addField("e.loading", "Replies to the user with 'Loading... Please Wait <a:typing:940429563320754217>'.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let mod = new Discord.MessageEmbed()
      .setTitle("Moderation Commands")
      .setDescription("This is a list of all of the bots **Moderation** commands. It includes all of the commands and a description of what each command does.")
      .addField("e.kick", "A command that kicks a user when mentioned in the command.\n`Example: e.kick @StuffyNose69`")
      .addField("e.ban", "A command that bans a user when mentioned in the command.\n`Example: e.ban @StuffyNose69`")
      .addField("e.warn", "A command that warns a user about a certain behavior.\n`Example: e.warn @StuffyNose69 making a bad bot`")
      .addField("e.purge", "A command that will mass delete a defined number of messages.\n`Example: e.purge 50`")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let eco = new Discord.MessageEmbed()
      .setTitle("Econamy Commands")
      .setDescription("__**COMING SOON**__")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let trig = new Discord.MessageEmbed()
      .setTitle("Triggers")
      .setDescription("These are words that when said in any message, will trigger the bot to respond with a randomized message.")
      .addField("elite", "Says propaganda about ELITE.", true)
      .addField("czar", "Says propaganda about czar.", true)
      .addField("@here or @everyone", "Complains about a ping.", true)
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let test = new Discord.MessageEmbed()
      .setTitle("Test/Other Commands")
      .setDescription("This is a list of commands that are either still in development or testing new features. These commands are most likely unstable, and will most of the time probably not trigger. The ones that do will usually have template like text, kind of like the command `e.embedtemplate`.")
      .addField("e.embedwithbuttons", "A command that produces an embed with buttons that toggle between buttons.\n**WORKING COMMAND**")
      .addField("e.button", "A command that sends a template message with a single button under it that will go away once clicked.\n**WORKING COMMAND**")
      .addField("e.emojibutton", "A command that sends a template message with a single button with an emoji label under it that will go away once clicked.\n**WORKING COMMAND**")
      .addField("e.dm", "Dms the user that sent the command.\n**WORKING COMMAND**")
      .addField("e.multiembed", "A command that sends a single message with multiple embeds in it.\n**WORKING COMMAND**")
      .addField("e.buttonmenus", "A command with menus that can lead you to different embeds.\n**WORKING COMMAND**")
      .addField("e.snipe", "A command that will use mention tags to get a users last sent message.\n__**COMMAND IN DEVELOPMENT**__")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    
    message.reply({ embeds: [cmd], components: [btnRow, pg2] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 50000 })
      collecter.on('collect', async i => {
        if (i.customId === 'utility_cmds') {
          i.update({ content: "Currently showing **Utility Commands**", embeds: [uti], components: [btnRow, pg2] })
        }
        if (i.customId === 'help_cmds') {
          i.update({ content: "Currently showing **Help Commands**", embeds: [help], components: [btnRow, pg2] })
        }
        if (i.customId === 'fun_cmds') {
          i.update({ content: "Currently showing **Fun Commands**", embeds: [fun], components: [btnRow, pg2] })
        }
        if (i.customId === 'short_cmds') {
          i.update({ content: "Currently showing **Short Commands**", embeds: [short], components: [btnRow, pg2] })
        }
        if (i.customId === 'mod_cmds') {
          i.update({ content: "Currently showing **Moderation Commands**", embeds: [mod], components: [btnRow, pg2] })
        }
        if (i.customId === 'eco_cmds') {
          i.update({ content: "Currently showing **Econamy Commands**", embeds: [eco], components: [btnRow, pg2] })
        }
        if (i.customId === 'triggers') {
          i.update({ content: "Currently showing **Triggers**", embeds: [trig], components: [btnRow, pg2] })
        }
        if (i.customId === 'test_cmds') {
          i.update({ content: "Currently showing **Other Commands**", embeds: [test], components: [btnRow, pg2] })
        }
      })
      let logcmd = new Discord.MessageEmbed()
      .setTitle("Command Logger")
      .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **cmdlist** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      .setColor("#661111")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
      collecter.on('collect', async collected => {
        return;
      })
    })
  }

  if (message.content === "e.embedtemplate") {
    let embed = new Discord.MessageEmbed()
      .setTitle("This is the embed title")
      .setAuthor("This is the embed author text", "https://i.kym-cdn.com/entries/icons/original/000/016/540/hgh08Pez.jpeg")
      .setDescription("This is the embed description")
      .setFooter("This is the embed footer", message.author.displayAvatarURL())
      .setColor("RANDOM")
      .addField("This is the name of the field", "This is the value of the field")
      .addField("This is the name of the second field, (you can have as many fields as you want)", "This is the value of the second field")
      .addField("These are 2 fields", "Because of the", true)
      .addField("On the same line", "', true' string", true)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
    message.reply({ content: "This is the embed content", embeds: [embed] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **embedtemplate** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  // -----------------------------FUN COMMANDS-----------------------------------

  if (message.content === "e.pp") {
    let nicknames = ["V", "8", "D", "8D", "8=D", "8==D", "8===D", "8====D", "8=====D", "8======D", "8=======D", "8========D", "8=========D", "8==========D", "8===========D", "8============D", "8=============D", "8==============D", "8===============D"]
    let pp = new Discord.MessageEmbed()
      .setTitle("PP Size Machine")
      .setDescription(`**${nicknames[Math.floor(Math.random() * nicknames.length)]}** is your dick size!`)
      .setColor("RANDOM")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.reply({ embeds: [pp] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **pp** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.toLowerCase() === "e.cancelme") {
    let nicknames = ["say a racial slur", "become jschlatt", "make fun of someone", "become a minecraft content creator", "make a gay joke", "make a trans joke", "say you are conservative", "say 'pride month is kinda gay'", "say literally anything about Corpse Husband", "say 'minecraft roleplay is cringe'", "say 'leafyishere'"]
    let getcanceled = new Discord.MessageEmbed()
      .setTitle("Cancelation Method Machine")
      .setDescription(`**${nicknames[Math.floor(Math.random() * nicknames.length)]}.** See you trending in a couple of hours :)`)
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      .setColor("RANDOM")
    message.reply({ embeds: [getcanceled] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **cancelme** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content === "e.bullyme") {
    let nicknames = ["Fuck you cock sucking looking ass. #FuckYou.", "Imagine being gay.", "Imagine wanting to be bullied, what a fucking weird thing to want.", "You are poopshitting.", "You are a gay ass mf.", "You should have never existed.", "You are a complete waste of oxegen.", "You are worse then a network level 3 at bedwars.", "You are an absolute tragedy.", "Matt Stafford's career is less depressing then you.", "My brother who still laughs at the word dick is smarter then you.", "You are complete cringe.", "L + Bozo + Ratio + GTFO + KYS"]
    let e = new Discord.MessageEmbed()
      .setTitle("Bullying Machineinator")
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`${nicknames[Math.floor(Math.random() * nicknames.length)]} I mean, you asked for it, so you can't cancel me on twitter now!`)
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      .setColor("RANDOM")
    message.reply({ embeds: [e] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **bullyme** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.slap")) {
    const slapguy = message.mentions.users.first()
    if (!slapguy) return message.reply("Mention someone to slap, bruh")
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} slapped ${slapguy.username}! L Bozo`)
      .setColor("RANDOM")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **slap** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.hug")) {
    const hugguy = message.mentions.users.first()
    if (!hugguy) return message.reply("Please mention someone to hug!")
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} just gave ${hugguy.username} a hug!`)
      .setColor("RANDOM")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **hug** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.shut")) {
    const shutguy = message.mentions.users.first()
    if (!shutguy) return message.reply("Please mention someone to tell to shut up, im not a mind reader.")
    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} just told ${shutguy.username} to shut up. What a fucking loser.`)
      .setColor("RANDOM")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **shut** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content.startsWith("e.sus")) {
    let sus = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Sus")
      .setDescription("⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬛⬛⬛⬛⬜⬜⬜⬛⬜⬛⬜⬛⬜⬜⬜⬛\n⬛🟥🟥🟥⬛⬜⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛\n⬛🟥🟦🟦⬛⬜⬜⬜⬛⬜⬛⬜⬛⬜⬜⬜⬛\n⬛🟥🟥🟥⬛⬛⬛⬜⬛⬜⬛⬜⬛⬛⬛⬜⬛\n⬛🟥⬛🟥⬛⬜⬜⬜⬛⬜⬜⬜⬛⬜⬜⬜⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
    message.reply({ content: "sus", embeds: [sus] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **sus** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content === "e.okipullup") {
    let afterparty = new Discord.MessageEmbed()
      .setTitle("Ok I pull up")
      .setDescription("**Hop out at the after party\nYou and all your friends, yeah, they love to get naughty\nSippin' on that Henn', I know you love that Bacardi (Sonny Digital)\n1942, I take you back in that 'Rari**")
      .setImage("https://img.texasmonthly.com/2020/03/don-toliver-houston.jpg?auto=compress&crop=faces&fit=fit&fm=pjpg&ixlib=php-1.2.1&q=45")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RED")
    message.reply({ embeds: [afterparty] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **okipullup** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }

  if (message.content === 'e.helpme') {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Yes pls')
        .setStyle('SUCCESS')
        .setCustomId('this_is_important')
    )
    message.reply({ content: 'Do you want to talk about it?', components: [btnRow] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 15000 })
      collecter.on('collect', async i => {
        if (i.customId === 'this_is_important') {
          i.update({ content: 'Too bad lmfao. L Bozo', components: [] })
        }
      })
      let logcmd = new Discord.MessageEmbed()
      .setTitle("Command Logger")
      .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **helpme** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      .setColor("#661111")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
      collecter.on('collect', async collected => {
        return;
      })
    })
  }
  
  if (message.content.includes("elite")) {
    if (!message.member.permissions.has('MANAGE_NICKNAMES')) {
      try {
          // if this generate an error we will print it in console 
        await message.author.send("listen man, please say ELITE in either all caps or at least 1 capital letter i beg i get payed less then minimum wage please dm'ing is so painful.")
      } catch (err) {
        console.error(err)
      }
      return // stop here
    }
      // otherwise proceed
    let nicknames = ["og going to lose this war", "ELITE > OG", "OG is doomed", "OG had 1 job, and they failed", "ELITE on top", "imagine not being in double digit points, im looking at og rn :eyes:", "ELITE is just too good rn", "#EliteOnTop", "OG < ELITE", "average OG player: 😡, average ELITE enjoyer: 😎", "ELITE is just better", "ELITE is where the cool kids are 😎", "ELITE will never be beaten", "ELITE cool :D", "ELITE is chad clan", "ELITE is based"]
    try {
      await message.reply(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`)
      let logcmd = new Discord.MessageEmbed()
      .setTitle("Command Logger")
      .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **ELITE** trigger in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      .setColor("#661111")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
    } catch (err) {
      console.error(err)
      message.channel.send('Oops, something went wrong. This is probably not your fault, rather the developers. Fuck that guy.')
    }
  }

  if (message.content.includes("czar")) {
    let nicknames = ["Czar doesn't work for a company, the company works for Czars power", "The Czar does not lift things, things lift themselves for the Czar", "Czar is a good clan owner :D", "Czar better then paper ez", "Czar doesn't exist in a universe, the universe exists for Czar.", "But I am Czar. I don't workout. I go to the gym and the weights lift themselves infront of me. ~ Czar 2022", "Czar isn't afraid of the dark, the dark is afraid of Czar", "All hail Czar!", "I don't breath air, the air simply breaths me. ~ Czar 2022", "I don't eat food. Food simply digests in my presense ~ Czar 2022", "i dont melt snow, snow just gets wet when it sees me ~ shrub 2022 (L to Czar)", "I don't drive my car, my car simply drives itself when I get in ~ Czar 2022", "Czar gets all the baddies 😳", "I don't use a calender, because the days revolve around me ~ Czar 2022", "Czar doesn't need a microwave, the food heats itself in Czars presence", "If i had a dollar for everyone of you, I would, PayPal me. ~ Czar", "Death once had a Near-Czar experience", "When Czar plays dodgeball the balls dodge him", "Czars keyboard has no backspace key, he doesnt make mistakes."]
    try {
      await message.reply(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`)
      let logcmd = new Discord.MessageEmbed()
      .setTitle("Command Logger")
      .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **CZAR** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      .setColor("#661111")
      .setFooter("Elite Bot | v1.0.0")
      .setTimestamp()
      client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
    } catch (err) {
      console.error(err)
      message.channel.send('Oops, something went wrong. This is probably not your fault, rather the developers. Fuck that guy.')
    }
  }

  if(message.content.toLowerCase().includes("@here") || message.content.toLowerCase().includes("@everyone")) {
    let nicknames = ["<:dissappointment:939994345631793223>", "<:cringe:939994446194442291>", "<:angreydoggo:911446559491768370>", "<:Enumclawhorsesexcase:939994052194095144>"]
    message.reply(`Ping ${nicknames[Math.floor(Math.random() * nicknames.length)]}`)
  }

  if(message.content.startsWith("e.hack")) {
  const user = message.mentions.users.first();
  if(!user) return message.channel.send("Mention Someone to hack")
  let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **hack** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  message.channel.send("**[25%]** Finding IP...").then(m => {
  setTimeout(() => {
  m.edit("**[50%]** IP FOUND! Looking for email and password...").then(m2 => {
  setTimeout(() => {
  m2.edit(`**[75%]** DONE! email: ${user.username}@icloud.com | password: XjdhgikshGdk`).then(m3 => {
  setTimeout(() => {
  m3.edit("**[100%]** Deleting System32..").then(m4 => {
  setTimeout(() => {
  m4.edit(`Done hacking ${user}! All info was sent online.`)
  }, 5500);
  });
  }, 2900);
  });
  }, 4500);
  });
  }, 5000);
  });
  };

  if(message.content.startsWith("e.ddos")) {
  const user = message.mentions.users.first();
  if(!user) return message.channel.send("Mention Someone/Something to DDoS")
  let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **ddos** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  message.channel.send("**[1%]** Loading Command Request...").then(m => {
  setTimeout(() => {
  m.edit("**[2%]** Adding Command Request to Queue...").then(m2 => {
  setTimeout(() => {
  m2.edit(`**[5%]** Command Added to Queue`).then(m3 => {
  setTimeout(() => {
  m3.edit("**[10%]** Starting Command Request...").then(m4 => {
  setTimeout(() => {
  m4.edit(`**[14%]** Loading Bot Accounts...`).then(m5 => {
  setTimeout(() => {
  m5.edit("**[21%]** Grabbing IP...").then(m6 => {
  setTimeout(() => {
  m6.edit(`**[29%]** IP Found. ${user.id}`).then(m7 => {
  setTimeout(() => {
  m7.edit("**[36%]** Finding Location...").then(m8 => {
  setTimeout(() => {
  m8.edit("**[43%]** Location Found. 87 Sookmedik Road").then(m9 => {
  setTimeout(() => {
  m9.edit("**[47%]** Setting Up Bots...").then(m10 => {
  setTimeout(() => {
  m10.edit("**[57%]** Sending Bots To IP...").then(m11 => {
  setTimeout(() => {
  m11.edit("**[71%]** Executing DDoS Scripts...").then(m12 => {
  setTimeout(() => {
  m12.edit("**[82%]** Nuking PC...").then(m13 => {
  setTimeout(() => {
  m13.edit("**[91%]** Retrieving Info...").then(m14 => {
  setTimeout(() => {
  m14.edit("**[100%]** Cleaning Up...").then(m15 => {
  setTimeout(() => {
  m15.edit(`Done ddosing ${user}! They will never be able to access the internet again.`)
  }, 2000);
  });
  }, 150);
  });
  }, 100);
  });
  }, 69);
  });
  }, 112);
  });
  }, 55);
  });
  }, 550);
  });
  }, 92);
  });
  }, 420);
  });
  }, 126);
  });
  }, 143);
  });
  }, 131);
  });
  }, 98);
  });
  }, 59);
  });
  }, 37);
  });
  };

  // -----------------------------SHORT COMMANDS--------------------------------

  if (message.content === "e.69") {
    message.reply("nice")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **69** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.liebe") {
    message.delete()
    message.channel.send("liebe used mic again")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **liebe** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.bruh") {
    message.reply("moment")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **bruh** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.thisisahellalongcommandwhydidyoumakethis") {
    message.reply("idfk")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **thisisahellalongcommandwhydidyoumakethis** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.fruits") {
    message.react("🍇")
    message.react("🍎")
    message.react("🍍")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **fruits** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.fruity") {
    message.react("🏳️‍🌈")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **fruity** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content.includes("LM FAO")) {
    message.react("<:troll:936766311936176169>")
  }

  if(message.content === "e.smile") {
    message.delete()
    message.channel.send(":D")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **smile** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.da") {
    message.delete()
    message.channel.send("damn thats crazy, didn't ask tho")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **da** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if(message.content === "e.loading") {
    message.reply("Loading... Please Wait <a:typing:940429563320754217>")
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **loading** short command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  

  // --------------------------MODERATION COMMANDS--------------------------------

  // -----------------------------TEST COMMANDS-----------------------------------

  if (message.content === "e.embedwithbuttons") {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Backward Button')
        .setStyle("PRIMARY")
        .setCustomId("test_button_1"),
      new MessageButton()
        .setLabel('Forward Button')
        .setStyle("PRIMARY")
        .setCustomId("test_button_2")
    )
    let e = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nHit the forward button to go to the second embed.\nUse the backward button to return to this embed")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let e2 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nHit the backward button to go to the previous embed.\nUse the forward button to return to this embed")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    message.reply({ content: 'test', embeds: [e], components: [btnRow] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 15000 })
      collecter.on('collect', async i => {
        if (i.customId === 'test_button_1') {
          i.update({ content: 'You have pressed a button!', embeds: [e2], components: [btnRow] })
        }
        if (i.customId === 'test_button_2') {
          i.update({ content: 'You have pressed another button!', embeds: [e], components: [btnRow] })
        }
      })
      client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **embedwithbuttons** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      collecter.on('collect', async collected => {
        return;
      })
    })
  }

  if (message.content === 'e.button') {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Im a button')
        .setStyle('PRIMARY')
        .setCustomId('this_is_important'),
    )
    message.reply({ content: 'Press the button below!', components: [btnRow] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 15000 })
      collecter.on('collect', async i => {
        if (i.customId === 'this_is_important') {
          i.update({ content: 'You have pressed a button!', components: [] })
        }
      })
      client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **button** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      collecter.on('collect', async collected => {
        return;
      })
    })
  }

  if (message.content === 'e.emojibutton') {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('this_is_important')
        .setEmoji("<a:rightarrowcroma:940428510932135976>")
    )
    message.reply({ content: 'Press the button below! This is a test for future **HELP AND ECONAMY COMMANDS**', components: [btnRow] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 15000 })
      collecter.on('collect', async i => {
        if (i.customId === 'this_is_important') {
          i.update({ content: 'You have pressed a button!', components: [] })
        }
      })
      client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **emojibutton** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      collecter.on('collect', async collected => {
        return;
      })
    })
  }

  if (message.content === "e.multiembed") {
    let e = new Discord.MessageEmbed()
      .setTitle("Embed 1")
      .setDescription("a")
      .setColor("RANDOM")
    let e2 = new Discord.MessageEmbed()
      .setTitle("Embed 2")
      .setDescription("b")
      .setColor("RANDOM")
    let e3 = new Discord.MessageEmbed()
      .setTitle("Embed 3")
      .setDescription("c")
      .setColor("RANDOM")
    let e4 = new Discord.MessageEmbed()
      .setTitle("Embed 4")
      .setDescription("deez nuts")
      .setColor("RANDOM")
    let e5 = new Discord.MessageEmbed()
      .setTitle("Embed 5")
      .setDescription("lmfaooooooooo")
      .setColor("RANDOM")
    message.reply({ contents: "this is a test command", embeds: [e, e2, e3, e4, e5] })
    client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **multiembed** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
  }

  if (message.content === "e.buttonmenus") {
    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Menu 1')
        .setStyle("PRIMARY")
        .setCustomId("test_button_1"),
      new MessageButton()
        .setLabel('Menu 2')
        .setStyle("PRIMARY")
        .setCustomId("test_button_2"),
    )
    const btnRowM1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Menu 1 Embed 1')
        .setStyle("PRIMARY")
        .setCustomId("test_button_3"),
      new MessageButton()
        .setLabel('Menu 1 Embed 2')
        .setStyle("PRIMARY")
        .setCustomId("test_button_4"),
      new MessageButton()
        .setLabel('Menu 1 Embed 3')
        .setStyle("PRIMARY")
        .setCustomId("test_button_5"),
    )
    const btnRowM2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel('Menu 2 Embed 1')
        .setStyle("PRIMARY")
        .setCustomId("test_button_6"),
      new MessageButton()
        .setLabel('Menu 2 Embed 2')
        .setStyle("PRIMARY")
        .setCustomId("test_button_7"),
      new MessageButton()
        .setLabel('Menu 2 Embed 3')
        .setStyle("PRIMARY")
        .setCustomId("test_button_8"),
    )
    let e = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embed Menus'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nHit a button to go to a menu.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m1 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 1, select an embed to go to.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m2 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 2, select an embed to go to.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m1e1 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 1 Embed 1.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m1e2 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 1 Embed 2.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m1e3 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 1 Embed 3.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m2e1 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 2 Embed 1.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m2e2 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 2 Embed 2.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    let m2e3 = new Discord.MessageEmbed()
      .setTitle("Test Command 'Embed with Buttons that Toggle Embeds'")
      .setDescription("This is a test command to see if it can be implimented into the bot.\n\nYou entered Menu 2 Embed 3.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("RANDOM")
      .setTimestamp()
    message.reply({ content: 'test', embeds: [e], components: [btnRow] }).then(msg => {
      const collecter = msg.createMessageComponentCollector({ time: 15000 })
      collecter.on('collect', async i => {
        if (i.customId === 'test_button_1') {
          i.update({ content: 'You have pressed a button!', embeds: [m1], components: [btnRowM1] })
        }
        if (i.customId === 'test_button_2') {
          i.update({ content: 'You have pressed another button!', embeds: [m2], components: [btnRowM2] })
        }
        if (i.customId === 'test_button_3') {
          i.update({ content: 'You have pressed a button!', embeds: [m1e1], components: [] })
        }
        if (i.customId === 'test_button_4') {
          i.update({ content: 'You have pressed a button!', embeds: [m1e2], components: [] })
        }
        if (i.customId === 'test_button_5') {
          i.update({ content: 'You have pressed a button!', embeds: [m1e3], components: [] })
        }
        if (i.customId === 'test_button_6') {
          i.update({ content: 'You have pressed a button!', embeds: [m2e1], components: [] })
        }
        if (i.customId === 'test_button_7') {
          i.update({ content: 'You have pressed a button!', embeds: [m2e2], components: [] })
        }
        if (i.customId === 'test_button_8') {
          i.update({ content: 'You have pressed a button!', embeds: [m2e3], components: [] })
        }
      })
      client.channels.cache.get('940771357371822140').send(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **buttonmenus** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
      collecter.on('collect', async collected => {
        return;
      })
    })
  }

  if (message.content === "e.relations") {
    let e = new Discord.MessageEmbed()
      .setTitle("Elite Relations List")
      .setDescription("This is where you can find out what clans are allied to ELITE and what clans are against ELITE in territorial.io. List will be updated accordingly.")
      .setFooter("Elite Bot | v1.0.0")
      .setColor("#661111")
      .addField("Allies 🟢 :", "**BR**")
      .addField("Enemies 🔴 :", "**OG\nTR\nKB\nKURD**")
      .setTimestamp()
    message.reply({ embeds: [e] })
    let logcmd = new Discord.MessageEmbed()
    .setTitle("Command Logger")
    .setDescription(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n${message.author.username} used the **relations** command in ${message.channel}\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
    .setColor("#661111")
    .setFooter("Elite Bot | v1.0.0")
    .setTimestamp()
    client.channels.cache.get('940771357371822140').send({ content: "A new command was used!", embeds:[logcmd]})
  }


})
