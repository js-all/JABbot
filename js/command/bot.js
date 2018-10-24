const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1), (__filename.length - 3));
module.exports = {
    _: (com, acc, prefix, args, message, bot) => {
        if (com === c) {
            if (message.author.id == '299165255639105536') {
                message.channel.send(args.join(' '));
            }
            else {
                message.reply('Vous ne posseder pas l\'autorisation d\'exacuter cette command.')
            }
        }
    }
}
