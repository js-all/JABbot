// initialization
const Discord = require('discord.js');
const fs = require('fs');
const requireDir = require('require-dir');
const LOG = require('./js/ext/log.js');
const prefix = '\\.';
const bot = new Discord.Client();
const dbm = require('./js/ext/dbManager');
require('colors');


// informé quand le bot est pret
bot.on('ready', () => {
    bot.user.setActivity(prefix.slice(1) + '.help | ' + bot.guilds.size + ' server');
    console.clear();
    setTimeout(() => {
        //console.clear();
        LOG.logT();
        LOG.cd();
    }, 1);

});

// connecter le bot
bot.login(process.env.BOT_TOKEN);
// initialization de l'objet acc servant a stocké les compte
var acc = {};

// log
LOG.date();
// quand des message sont envoyer
bot.on('message', dbMsg);


function msg(message, acc) {
    const currentAcc = acc["<@"+message.author.id+">"];
    bot.user.setActivity(prefix.slice(1) + '.help | ' + bot.guilds.size + ' servers | '+Object.keys(acc).length+' users');
    // regExp de test pour savoire si il y a le prefix de la command
    var dbc = new RegExp(prefix + "\\.\.+", "i");


    if (dbc.test(message.content)) {
        var co = {
            req: requireDir('./js/command/accountReq'),
            noReq: requireDir('./js/command/noAccountReq')
        }
        var rereg = new RegExp(prefix + "\\.", "i");
        var com = message.content.replace(rereg, '');
        var args = com.trim().split(/ +/g);
        for (var f = 0; f < args.length; f++) {
            args[f] = args[f].toLowerCase();
        }
        args.shift();
        com = com.split(/ +/)[0];


        fs.readdir(__dirname + '/js/command/noAccountReq', (err, files) => {
            for (let hiu = 0; hiu < files.length; hiu++) {
                files[hiu] = files[hiu].substring(0, (files[hiu].length - 3));
            }
            for (let hu = 0; hu < files.length; hu++) {
                co.noReq[files[hu]]._(com, prefix, args, message, bot);
            }
        });

        fs.readdir(__dirname + '/js/command/accountReq', (err, files) => {
            let filesCom = [];
            for (let j = 0; j < files.length; j++) {
                filesCom.push(files[j].substring(0, (files[j].length - 3)));
            }
            for (let j = 0; j < filesCom.length; j++) {
                const com_ = filesCom[j];
                let a = co.req[com_]._(com, acc, prefix, args, message, bot);
                if (com.modifyAcc) {
                    if (a == undefined) {
                        console.log('acc not returned');
                    } else {
                        acc = a;
                    }
                }
            }
        });
        LOG.log(com, args, message.author.username, message.author.id);
        LOG.cl(com, args, message.author.username, message.author.id);
    }

    

    // on incremente les point a chaque mesg
    if (currentAcc != undefined) {
        currentAcc.msgS++;
        currentAcc.msg++;
        currentAcc.points += currentAcc.lvl * 5;
        // si les condition pour augmenter de niveaux son complete on le fait
        if (currentAcc.msgS == ((currentAcc.lvl * currentAcc.lvl) + 1)) {
            currentAcc.lvl++;
            currentAcc.msgS = 0;
            currentAcc.money += currentAcc.lvl * 250;
            message.channel.send(`_Félicitation ,${message.author} vous êtes passé lvl ${currentAcc.lvl} !, vous gagné ${currentAcc.lvl * 250} de money_`);
        }

    }
    // on detect si un msg commance par 'del after ????s'
    if (/^del after \d+s/i.test(message.content)) {
            // on stock le nombre de sec avant la supression
            var s = parseFloat(message.content.substring(10, message.content.indexOf('s')));
            setTimeout(() => {

                message.delete()
            }, (s * 1000));
    }


    return acc;
}

function dbMsg(message) {
    dbm.getAcc(ac => {
        let accc = msg(message, ac);
        dbm.setAcc(accc);
    });
}


// quand un nouveau menbre rejoin
bot.on('guildMemberAdd', (member) => {

    bot.channels.find(val => val.id == '485864813616955432').send('**bienvenue** infame **creature** nomée ' + member);
});
// quand un membre pars
bot.on('guildMemberRemove', (member) => {
    bot.channels.find(val => val.id == '485864813616955432').send('au revoire' + member + '_ahh... il/elle est enfin parti(e).._');

});
bot.on('disconnect', () => {
    bot.channels.find('id', '492737031987003392').fetchMessages().then(messages => messages.array().forEach(message => message.delete()));
    bot.channels.find('id', '492737031987003392').send('NON');
});