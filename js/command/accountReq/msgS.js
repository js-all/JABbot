const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,acc,prefix,args,message,bot) => {
        if (com === c) {
            if (acc["<@"+message.author.id+">"] != undefined) {
                if (args[0] == '-t') {
                    message.reply('vous avez envoyer ' + acc["<@"+message.author.id+">"].msg + ' msg aux total de puis la creation de votre compte')
                }
                else if (args[0]== '-p') {
                    message.reply('il vous reste ' + (((acc["<@"+message.author.id+">"].lvl * acc["<@"+message.author.id+">"].lvl) + 1) - acc["<@"+message.author.id+">"].msgS) + 'a envoyer pour passé au prochain niveaux');
                }
                else {
                    message.reply('pour utiliser la command msgS veuiller mettre un argument soit : \n-t --> msg envoyer de puis la creation de votre compte\n-p --> nbr de msg a envoyer pour le prochain niveaux');
                }
            }
            else {
                message.reply('vous devez avoire un compte pour untiliser cette command , faite '+prefix+'.acc pour vous en crée un.');
            }
        }
    },
    modifyAcc: false
}