const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com == c) {
            // test si le compte exist
            if (acc[message.author] != undefined) {
                // si oui on regard les parametre
                if (args[0] == '-i') {
                    // on affische l'iventaire des roles
                    const embed = new Discord.RichEmbed()
                        .setTitle(`inventaire des roles de ${message.author.username}`)
                        .setAuthor(acc[message.author].user, message.author.avatarURL)
                        .setColor(0x528E60)
                        .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                        .setThumbnail(message.author.avatarURL)
                        .setTimestamp();
                    var rol = '';
                    for (var k = 0; k < acc[message.author].roles.length; k++) {
                        rol += ' ' + (k + 1) + ' : ' + acc[message.author].roles[k] + ' ,\n';
                    }
                    embed.addField('roles :', rol);
                    message.channel.send({
                        embed
                    });
                } else if (args[0] == '-e') {
                    // on equipe un role
                    if (acc[message.author].roles.length >= args[2]) {
                        if (message.guild.roles.find('name', acc[message.author].roles[args[1] - 1]) != undefined) {
                            message.member.addRole(message.guild.roles.find('name', acc[message.author].roles[args[1] - 1]));
                        }
                    }
                } else if (args[0] == '-u') {
                    // on enleve un role
                    if (message.guild.roles.find('name', acc[message.author].roles[args[1] - 1]) != undefined) {
                        message.member.removeRole(message.guild.roles.find('name', acc[message.author].roles[args[1] - 1]));
                    }
                } else {
                    message.reply('veiller metre un argumant valide : \n-e ,pour equiper\n-u ,pour desequiper\n-i pour voire les roles qu\'on a.');
                }
            } else {
                message.channel.send(`vous devez vous crée un compte avec la command ${prefix}.acc pour avoir accès a l'inventair de role, ${message.author}`)
            }
        }
    }
}