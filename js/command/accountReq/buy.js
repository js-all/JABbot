const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _: (com,acc,prefix,args,message,bot) => {
        if (com == c) {
            // on test si le compte exist
            if (acc["<@"+message.author.id+">"] != undefined) {
                // on test si il y a des parametre
                if (args[0] == undefined) {
                    const embed = new Discord.RichEmbed()
                        .setAuthor('', '')
                        .setColor(0xE87807)
                        .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                        .setThumbnail('')
                        .setTimestamp()
                        .setTitle('help - '+prefix+'.buy')
                        .addField(''+prefix+'.buy', ''+prefix+'.buy type\ntype :\nR --> role\nN --> nom du compte\nCh --> channel');
                    message.channel.send({
                        embed
                    });
                } else {
                    if (args[0] == 'r') {
                        if (args[1] == 'c') {
                            if (args[2] == 'r') {
                                // si on a assez d'argent pour acheter ce qu'on veut
                                if (acc["<@"+message.author.id+">"].money >= 1000) {
                                    // on ajoute le role a la liste des role de l'utilisateure
                                    acc["<@"+message.author.id+">"].roles.push('rouge');
                                    // on enlève l'argent
                                    acc["<@"+message.author.id+">"].money -= 1000;
                                    // on en informe l'utilisateur
                                    message.channel.send('vous venez d\'acheter le role  pour 1000m !,' + message.author);

                                } else {
                                    message.reply('vous n\'avez pas assé d\'argent pour acheter cela');
                                }
                            } else if (args[2] == 'v') {
                                // de meme
                                if (acc["<@"+message.author.id+">"].money >= 1000) {
                                    acc["<@"+message.author.id+">"].roles.push('vert');
                                    acc["<@"+message.author.id+">"].money -= 1000;
                                    message.channel.send('vous venez d\'acheter le role  pour 1000m !,' + message.author);
                                } else {
                                    message.reply('vous n\'avez pas assé d\'argent pour acheter cela');
                                }

                            } else if (args[2] == 'b') {
                                // le meme chose
                                if (acc["<@"+message.author.id+">"].money >= 1000) {
                                    acc["<@"+message.author.id+">"].roles.push('bleu');
                                    acc["<@"+message.author.id+">"].money -= 1000;
                                    message.channel.send('vous venez d\'acheter le role  pour 1000m !,' + message.author);
                                } else {
                                    message.reply('**vous** n\'avez pas assé d\'argent pour acheter cela');
                                }

                            } else if (args[2] == 'c') {
                                // la meme chose a quelque exeption pres
                                if (acc["<@"+message.author.id+">"].money >= 10000) {
                                    // on test si le 4emme parametre est bien une couleure hexadecimal 
                                    if (args[3] != undefined && /#[0-9A-Fa-f]{6}/.test(args[3]) == true) {
                                        acc["<@"+message.author.id+">"].roles.push('--' + message.author.username + '\'s custom ' + args[3] + ' role--');
                                        acc["<@"+message.author.id+">"].money -= 10000;
                                        message.channel.send('vous venez d\'acheter le role custom color pour 10000m !,' + message.author);
                                    } else {
                                        message.reply('veuillé entré une couleure hexadecimal correct commencant par # ne cotenant que 6 nombre de 0 a 9 ou lettres de A a F');
                                    }
                                } else {
                                    message.reply('vous n\'avez pas assé d\'argent pour acheter cela');
                                }
                            } else {
                                // page d'aide si ereure
                                const embed = new Discord.RichEmbed()
                                    .setAuthor('', '')
                                    .setColor(0xE87807)
                                    .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                                    .setThumbnail('')
                                    .setTimestamp()
                                    .setTitle('help - '+prefix+'.buy R C')
                                    .addField(''+prefix+'.buy R C', ''+prefix+'.buy R C color\ncolor :\nR --> rouge\nV --> vert\nB --> bleu\nC --> couleure custom , ex '+prefix+'.buy R C C #123456\done le role de couleure hexadecimal #123456');
                                message.channel.send({
                                    embed
                                });
                            }
                        } else {
                            // pareille
                            const embed = new Discord.RichEmbed()
                                .setAuthor('', '')
                                .setColor(0xE87807)
                                .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                                .setThumbnail('')
                                .setTimestamp()
                                .setTitle('help - '+prefix+'.buy R')
                                .addField(''+prefix+'.buy R', ''+prefix+'.buy R type\ntype :\nC --> color');
                            message.channel.send({
                                embed
                            });
                        }
                    } else if (args[0] == 'n') {
                        if (args[1] == 't') {

                        } else if (args[1] == 'c') {
                            if (acc["<@"+message.author.id+">"].money >= 2500) {
                                if (args[2] != undefined && args[3] == undefined && args[2].indexOf('|') == -1 && /.{2,26}/.test(args[2]) && !/-{2,26}/.test(args[2])) {
                                    acc["<@"+message.author.id+">"].user = args[2].replace(/-/gi,' ');
                                    acc["<@"+message.author.id+">"].money -= 2500;
                                    message.channel.send(`votre nom de compte a été modifier en ${args[2].replace(/-/gi,' ')} pour 2500m ! ${message.author}`);
                                }   
                                else {
                                    message.reply(`veuiller entré un nom valide après la commande ex : ${prefix}.buy N C mon-nouveau-nom , les tirret seron replacer par des espace. Sans bar vertical | et de longueure entre 2 et 26 ne contenent pas que des espaces.`);
                                }
                            }
                            else {
                                message.reply('vous n\'avez pas assé d\'argent pour acheter cela');
                            }
                        } else {
                            const embed = new Discord.RichEmbed()
                                .setAuthor('', '')
                                .setColor(0xE87807)
                                .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                                .setThumbnail('')
                                .setTimestamp()
                                .setTitle('help - '+prefix+'.buy N')
                                .addField(''+prefix+'.buy N', ''+prefix+'.buy N type\ntype :\nC --> custom\nT --> titre');
                            message.channel.send({
                                embed
                            });
                        }
                    } else if (args[0] == 'ch') {
                        if (args[1] != undefined) {
                            
                        }
                        else {

                        }
                    } else {
                        const embed = new Discord.RichEmbed()
                            .setAuthor('', '')
                            .setColor(0xE87807)
                            .setFooter("message send by dark bot , a bot by pouloulou_Inc", bot.user.avatarURL)
                            .setThumbnail('')
                            .setTimestamp()
                            .setTitle('help - '+prefix+'.buy')
                            .addField(''+prefix+'.buy', ''+prefix+'.buy type\ntype :\nR --> role\nN --> nom du compte');
                        message.channel.send({
                            embed
                        });
                    }
                }
            } else {
                message.channel.send(`vous devez vous crée un compte avec la command '+prefix+'.acc pour avoir accès au shop, ${message.author}`)
            }
        }
        return acc;
    },
    modifyAcc: true
}
