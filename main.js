// initialization
const Discord = require('discord.js');
var fs = require('fs');
var requireDir = require('require-dir');
var LOG = require('./js/ext/log.js');
var prefix = '\\.';
var bot = new Discord.Client();
var colors = require('colors');


// informé quand le bot est pret
bot.on('ready', () => {
    bot.user.setActivity(prefix.slice(1) + '.help | ' + bot.guilds.size + ' server');
    bot.channels.find('name', 'ephemer').fetchMessages()
        .then(messages => messages.array().forEach(
            message => message.delete()
        ));
    bot.channels.find('name', 'ephemer').send('**```dans ce salon tout msg ne dure que 10 sec\n\nexpter ceux de bot dont le temp de supresion est  d\'un dixiem de second```**');
    console.clear();
    setTimeout(() => {
        //console.clear();
        LOG.logT();
        LOG.cd();
    }, 1);
    bot.channels.find('id','492737031987003392').send('OUI');

});

// connecter le bot
bot.login('My Token Here');
// initialization de l'objet acc servent a stocké les compte
var acc = {
    "<@666>": {
        user: 'bot acc corupted',
        points: 318648,
        lvl: 99,
        money: 24750,
        msg: 999999,
        msgS: 9801,
        roles: ['ADMIN']
    }
}
// log
LOG.date();
// quand des message sont envoyer
bot.on('message', message => {
    
    bot.user.setActivity(prefix.slice(1) + '.help | ' + bot.guilds.size + ' server');
    mes = message.content;
    // definition du surnom du bot via la command !nickname
    if (message.content.startsWith('!nickname ')) {
        if (message.content.charAt(0) === '!') {
            var nick = message.content.replace(/!nickname /, '');
            message.guild.members.get(bot.user.id).setNickname(nick);
            message.channel.send(`my nickname as been changed as '` + nick + `' ${message.author} !`);
        }
    }
    // regExp de test pour savoire si il y a le prefix de la command
    var dbc = new RegExp(prefix + "\\.\.+", "i");
    if (dbc.test(message.content)) {
        acc = JSON.parse(fs.readFileSync(__dirname + '/acc.json'));
        var co = requireDir('./js/command');
        var rereg = new RegExp(prefix + "\\.", "i");
        var com = message.content.replace(rereg, '');
        var args = com.trim().split(/ +/g);
        for (var f = 0; f < args.length; f++) {
            args[f] = args[f].toLowerCase();
        }
        args.shift();
        com = com.split(/ +/)[0];
        fs.readdir(__dirname + '/js/command', (err, files) => {
            for (var hiu = 0; hiu < files.length; hiu++) {
                files[hiu] = files[hiu].substring(0, (files[hiu].length - 3));
            }
            for (var hu = 0; hu < files.length; hu++) {
                var a = co[files[hu]]._(com, acc, prefix, args, message, bot);
                if (a != undefined) { acc = a;}
                
            

            }
            
            LOG.log(com, args, message.author.username, message.author.id);
            LOG.cl(com, args, message.author.username, message.author.id);
        });
        fs.writeFileSync(__dirname + '/acc.json', JSON.stringify(acc));
    }



    // on incremente les point a chaque mesg
    if (acc[message.author] != undefined) {
        acc[message.author].msgS++;
        acc[message.author].msg++;
        acc[message.author].points += acc[message.author].lvl * 5;
        // si les condition pour augmenter de niveaux son complete on le fait
        if (acc[message.author].msgS == ((acc[message.author].lvl * acc[message.author].lvl) + 1)) {
            acc[message.author].lvl++;
            acc[message.author].msgS = 0;
            acc[message.author].money += acc[message.author].lvl * 250;
            message.channel.send(`_Félicitation ,${message.author} vous êtes passé lvl ${acc[message.author].lvl} !, vous gagné ${acc[message.author].lvl * 250} de money_`);
        }

    }
    // on detect si un msg commance par 'del after ????s'
    if (/^del after \d+s/i.test(message.content)) {
        if (message.channel.id != '486196459025334282') {
            // on stock le nombre de sec avant la supression
            var s = parseFloat(message.content.substring(10, message.content.indexOf('s')));
            setTimeout(() => {

                message.delete()
            }, (s * 1000));
        }
    }
    if (message.channel.id == '486196459025334282') {
        if (message.author.id == bot.user.id) {
            if (message.content == '**```dans ce salon tout msg ne dure que 10 sec\n\nexpter ceux de bot dont le temp de supresion est  d\'un dixiem de second```**') {

            } else {
                setTimeout(() => {
                    message.delete();
                }, 100);
            }
        } else {
            setTimeout(() => {
                message.delete();
            }, 10000);
        }

    }
    
    
});
// quand un nouveau menbre rejoin
bot.on('guildMemberAdd', (member) => {

    bot.channels.find(val => val.id == '485864813616955432').send('**bienvenue** infame **creature** nomée ' + member);
});
// quand un membre pars
bot.on('guildMemberRemove', (member) => {
    bot.channels.find(val => val.id == '485864813616955432').send('au revoire' + member + '_ahh... il/elle est enfin parti(e).._');

});
bot.on('disconnect',() => {
    bot.channels.find('id','492737031987003392').fetchMessages().then(messages => messages.array().forEach(message => message.delete()));
    bot.channels.find('id','492737031987003392').send('NON');
});
