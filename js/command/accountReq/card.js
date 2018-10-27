const Discord = require('discord.js');
const createCard = require('../../ext/cardGen');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com === c) {
            const currentAcc = acc["<@"+message.author.id+">"]
            if (currentAcc !== undefined) {
                const username = message.author.username + '#' + message.author.discriminator;
                createCard(currentAcc, message.author.avatarURL, username, url => {
                    message.channel.send({
                        files: [{
                          attachment: url,
                          name: username+'.png'
                        }]
                    });
                });
            }
        }
    }
}