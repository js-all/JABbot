const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com === c) {
            const currentAcc = acc["<@"+message.author.id+">"]
            // corp de la command ici
        }
    }
}