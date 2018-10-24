const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com == c) {
            const embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username)
            .setImage('https://nsa39.casimages.com/img/2018/09/06/mini_18090608422818747.png')
            .setURL('https://nsa39.casimages.com/img/2018/09/06/mini_18090608422818747.png');
            message.channel.send({embed});

        }
    }
}