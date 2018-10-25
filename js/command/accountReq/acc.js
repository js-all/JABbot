const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : function (com,acc,prefix,args,message,bot) {
        if (com == c) {
            // test si un compte existe deja
            if (acc["<@"+message.author.id+">"] == undefined) {
                // si non on crée un nouveaux compte
                acc["<@"+message.author.id+">"] = {
                    user: '',
                    points: 0,
                    lvl: 1,
                    money: 0,
                    msgS: 0,
                    msg: 0,
                    roles: [],
                    Object: {}
                }
                acc["<@"+message.author.id+">"].user = message.author.username;
                message.reply('Votre comtpe a été crée !');
            } else {
                // si oui on affiche les info du compte
                const embed = new Discord.RichEmbed()
                    .setTitle("information sur le compte")
                    .setAuthor(acc["<@"+message.author.id+">"].user, message.author.avatarURL)
                    .setColor(0x00AE86)
                    .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                    .setThumbnail(message.author.avatarURL)
                    .setTimestamp()
                    .addField("STAT :", "**__NIVEAU__** : " + acc["<@"+message.author.id+">"].lvl + "\n**__POINTS__** : " + acc["<@"+message.author.id+">"].points + "\n**__MONEY__** : " + acc["<@"+message.author.id+">"].money)
                    .addField("INFORMATION ADDITIONELLE :", "msg evoyer au total :" + acc["<@"+message.author.id+">"].msg + "\nnombre de msg pour le prochain niveau : " + (((acc["<@"+message.author.id+">"].lvl * acc["<@"+message.author.id+">"].lvl) + 1) - acc["<@"+message.author.id+">"].msgS));

                message.channel.send({
                    embed
                });
            }
        }
        
    },
    modifyAcc: false
}