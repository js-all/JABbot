const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com === c || com === 'i') {
            if (acc[message.author] != undefined) {
            const embed = new Discord.RichEmbed()
            .setAuthor(acc[message.author].user,message.author.avatarURL)
            .setColor(0xF00f0a)
            .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
            .setTimestamp()
            .setTitle('inventaire de '+acc[message.author].user);

            if (Object.keys(acc[message.author].Object).length > 0) {
                for (var i = 0;i < Object.keys(acc[message.author].Object).length;i++) {
                    embed.addField(Object.keys(acc[message.author].Object)[i],'vous en avez :'+acc[message.author].Object[Object.keys(acc[message.author].Object)[i]].nbre);
                }
            }
            else {
                embed.addField('**RIEN** _ici..._','');
            }
            message.channel.send({embed});
        }
        else {
            message.reply('vous devez vous crée un compte avec la command '+prefix+'.acc pour avoire accès a cette commande.')
        }
    }
    }
}