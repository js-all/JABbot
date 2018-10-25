const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,prefix,args,message,bot) => {
        if(com == c) {
            message.reply('Hi !');
        }
    }
}