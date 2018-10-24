const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot)=> {
        if (com == c) {
            // detecte si le compte exist ou non
            if (acc[message.author] == undefined) {
                message.channel.send(`Vous devez vous crée un compte avec la command ${prefix}.acc pour excuter cette command, ${message.author}`);
            } else {
                message.reply(`Vous avez ${acc[message.author].points} points`);
            }
        }
    }
}