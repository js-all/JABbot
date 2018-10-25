const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _: (com, prefix, args, message, bot) => {
        const embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.avatarURL)
            .setColor(0x3456AF)
            .setDescription(`help for ${bot.user.username} bot`)
            .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
            .setTimestamp()
            .setTitle('HELP')
            .addField(prefix + '.acc', 'donne toute les information utile (ou non) sur votre compte, si celui ci n\'exist pas il vous en crée un nouveaux.')
            .addField(prefix + '.botIMG', 'affiche simplement l\'image du bot')
            .addField(prefix + '.buy', 'vous permet d\'acheter toutes les choses disponible a la vente')
            .addField(prefix + '.hello', 'dite bonjour au bot')
            .addField(prefix + '.help / h', 'affiche cette page')
            .addField(prefix + '.i / inventaire', 'affiche tout les objet que vous avez durement aqui au combat !')
            .addField(prefix + '.lvl', 'affiche votre lvl')
            .addField(prefix + '.money', 'affiche votre argent')
            .addField(prefix + '.msgS', 'vous donne des info sur vtre nombre de msg envoyer')
            .addField(prefix + '.piece', 'vous repond par pile ou face aleatoirement')
            .addField(prefix + '.points', 'affiche votre nombre de points')
            .addField(prefix + '.roles', 'vous permet de gerez tous ce qui est relatif aux roles que vous avez')
            .addField(prefix + '.shop', 'affiche le shop (magazin pour les faché avec l\'anglais)');
        if (com === c || com === 'h') {
            if (args[0] == 'private') {
                message.author.send({
                    embed
                });
            } else if (args[0] == 'here') {
                message.channel.send({
                    embed
                });
            } else {
                message.reply('veuiller entré un argument valide ex : ' + prefix + '.help private\nargument valide : \nprivate --> envoi la page d\'aide en msg privé\nhere --> envoi la pàage d\'aide ici');
            }
        }
    }
}
