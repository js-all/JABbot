const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com === c) {
            if (acc[message.author] != undefined) {
                message.reply('vous avez ' + acc[message.author].money + ' de money');
            }
            else {
                message.reply('vous devez avoire un compte pour untiliser cette command , faite '+prefix+'.acc pour vous en crée un.');
            }
        }
    }
}