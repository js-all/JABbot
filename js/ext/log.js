var colors = require('colors')
var fs = require('fs');
module.exports = {
    date: () => {
        var conv = 0;
        var d = new Date();
        var g = '';
        var m = '';
        switch (d.getDay()) {
            case 1:
                g = 'lundi'
                break;
            case 2:
                g = 'mardi'
                break;
            case 3:
                g = 'mercredi'
                break;
            case 4:
                g = 'jeudi'
                break;
            case 5:
                g = 'vendredi'
                break;
            case 6:
                g = 'samedi'
                break;
            case 7:
                g = 'dimanche'
                break;
        }
        switch (d.getMonth()) {
            case 0:
                m = 'janvier';
                break;
            case 1:
                m = 'fevrier';
                break;
            case 2:
                m = 'mars';
                break;
            case 3:
                m = 'avril';
                break;
            case 4:
                m = 'mai';
                break;
            case 5:
                m = 'juin';
                break;
            case 6:
                m = 'juillet';
                break;
            case 7:
                m = 'aout';
                break;
            case 8:
                m = 'septembre';
                break;
            case 9:
                m = 'octobre';
                break;
            case 10:
                m = 'novembre';
                break;
            case 11:
                m = 'decembre';
                break;

        }
        // enregistré la date du lancement du bot dans log.md
        var nl = fs.readFileSync(__dirname+'/../../log.md') +
            '## le ' +
            g +
            ' ' +
            d.getDate() +
            ' ' +
            m +
            ' ' +
            d.getFullYear() +
            ' a ' +
            d.getHours() +
            ':' +
            d.getMinutes() +
            '\n**command** -- `params` -- _nom_ -- _id_\n\n';
        fs.writeFile(__dirname+'/../../log.md', nl, 'utf-8', (err) => {
            if (err) throw err;
        });
    },
    log: (cn, p, n, id) => {
        var ifm = (p[0] != undefined) ? '`' : '';
        var llog = '**' + cn + '** , '+ifm + p + ifm + ' by _' + n + '_ id, _<@' + id + '>_\n\n';
        llog = fs.readFileSync(__dirname+'/../../log.md') + llog;
        fs.writeFile(__dirname+'/../../log.md', llog, 'utf-8', (err) => {
            if (err) throw err;
        });
    },
    cl: (cn,p,n,id) => {
        
        var llog = '\n' + cn.red + ' , '+ p.toString().green + ' by ' + n.cyan + ' id, <@'.yellow + id.yellow + '>\n'.yellow;
        console.log(llog);
    },
    cd: () => {
        var d = new Date();
        var g = '';
        var m = '';
        switch (d.getDay()) {
            case 1:
                g = 'lundi'
                break;
            case 2:
                g = 'mardi'
                break;
            case 3:
                g = 'mercredi'
                break;
            case 4:
                g = 'jeudi'
                break;
            case 5:
                g = 'vendredi'
                break;
            case 6:
                g = 'samedi'
                break;
            case 7:
                g = 'dimanche'
                break;
        }
        switch (d.getMonth()) {
            case 0:
                m = 'janvier';
                break;
            case 1:
                m = 'fevrier';
                break;
            case 2:
                m = 'mars';
                break;
            case 3:
                m = 'avril';
                break;
            case 4:
                m = 'mai';
                break;
            case 5:
                m = 'juin';
                break;
            case 6:
                m = 'juillet';
                break;
            case 7:
                m = 'aout';
                break;
            case 8:
                m = 'septembre';
                break;
            case 9:
                m = 'octobre';
                break;
            case 10:
                m = 'novembre';
                break;
            case 11:
                m = 'decembre';
                break;

        }
        console.log(`\nJAB lancer le ${g} ${d.getDate()} ${m} à ${d.getHours()}h ${d.getMinutes()}m ${d.getSeconds()}.${d.getMilliseconds()}s .\n`);
    },
    logT: () => {
        console.log(`-------------------------------------------------------------------------------`.white.bgWhite);
        console.log(`===============================================================================`.black.bgBlack);
        console.log(`${'||'.white.bgWhite}                                                                           ${'||'.white.bgWhite}`);
        console.log(`${'||'.white.bgWhite}   ${'#####'.red.bgRed}    ${'####'.red.bgRed}   ${'######'.red.bgRed}          ${'#####'.red.bgRed}   ${'######'.red.bgRed}   ${'####'.red.bgRed}   ${'#####'.red.bgRed}   ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'||'.white.bgWhite}`);
        console.log(`${'||'.white.bgWhite}   ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}    ${'##'.red.bgRed}            ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}      ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}   ${'####'.red.bgRed}   ${'||'.white.bgWhite}`);
        console.log(`${'||'.white.bgWhite}   ${'#####'.red.bgRed}   ${'##'.red.bgRed}  ${'##'.red.bgRed}    ${'##'.red.bgRed}            ${'#####'.red.bgRed}   ${'####'.red.bgRed}    ${'######'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}    ${'##'.red.bgRed}    ${'||'.white.bgWhite}`);
        console.log(`${'||'.white.bgWhite}   ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}    ${'##'.red.bgRed}            ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}      ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}    ${'##'.red.bgRed}    ${'||'.white.bgWhite}`);
        console.log(`${'||'.white.bgWhite}   ${'#####'.red.bgRed}    ${'####'.red.bgRed}   ${'######'.red.bgRed}          ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'######'.red.bgRed}  ${'##'.red.bgRed}  ${'##'.red.bgRed}  ${'#####'.red.bgRed}     ${'##'.red.bgRed}    ${'||'.white.bgWhite}`);
        console.log(`${'||'.white.bgWhite}                                                                           ${'||'.white.bgWhite}`);
        console.log(`===============================================================================`.black.bgBlack);
        console.log(`-------------------------------------------------------------------------------`.white.bgWhite);
    }
}