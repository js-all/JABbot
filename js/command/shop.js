const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com === c) {
            if (acc[message.author] == undefined) {
                message.channel.send(`Vous devez vous crée un compte avec la command ${prefix}.acc pour avoir accès au shop, ${message.author}`);
            } else {
                // on affiche le shop
                const embed = new Discord.RichEmbed()
                    .setTitle("SHOP !")
                    .setAuthor("shop", message.author.avatarURL)
                    .setColor(0x740C82)
                    .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                    .setThumbnail(message.author.avatarURL)
                    .setTimestamp()
                    .addField("info", "m = money\nyou have " + acc[message.author].money + "m")
                    .addField("**__ROLES-COLOR__**", " red : 1000m,\nblue:1000m,\ngrenn : 1000m")
                    .addField("**__CUSTOM-COLOR__**", "10 000m !")
                    .addField("**__SURNOM__**", "nom de compte personaliser : 2500m")
                    .addField('***__CHANNEL__*','pour 10 000 points (et non money) vous pouver acheter un channel personelle');

                message.channel.send({
                    embed
                });
            }
        }
    }
}