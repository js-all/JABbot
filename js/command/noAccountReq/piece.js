const Discord = require('discord.js');
const c = __filename.slice((__dirname.length + 1),(__filename.length - 3));
module.exports = {
    _ : (com,prefix,args,message,bot) => {
        if (com === c) {
            message.reply('3..');
            setTimeout(() => {
                message.reply('2..');
                setTimeout(() => {
                    message.reply('1..');
                    setTimeout(() => {
                        message.reply('...');
                        setTimeout(() => {
                            var rep = ((Math.round(Math.random())) == 1) ? 'pile' : 'face';
                            message.reply(rep + ' !');
                        },1500);
                    },1000);
                },500);
            },200);
            
            
            
        }
    }
}