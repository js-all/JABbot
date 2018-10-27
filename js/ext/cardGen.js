const Jimp = require('jimp');

Object.defineProperty(String.prototype, 'dir', {
    get: function() {
        return __dirname + '/' + this;
    }
});

module.exports = function (acc, avatarURL, userCompleteName, callBack) {
    Jimp.read('../../img/card/template/card.png'.dir).then((img) => {
        Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then((fnt1) => {
            const moveleft = acc.lvl.toString().length > 1 ? ((acc.lvl.toString().length - 1) * 35) : 0;
            img.print(fnt1, 160 - moveleft, 570, acc.lvl);
            Jimp.read(avatarURL).then((avatar) => {
                    avatar.resize(264, 264);
                    img.composite(avatar, 78, 768);
                    Jimp.read('../../img/card/template/pdpCache.png'.dir).then(pdpc => {
                        img.composite(pdpc, 0, 0);
                        Jimp.read('../../img/card/template/xp.png'.dir).then(xpi => {
                            const total = acc.lvl * acc.lvl;
                            const rr = acc.msgS;
                            const u = rr / total;
                            const r = u * 541;
                            xpi.resize(r, 58);
                            img.composite(xpi, 484, 974);
                            Jimp.read('../../img/card/template/xpCache.png'.dir).then(xpc => {
                                img.composite(xpc, 0, 0);
                                const fotd = acc.user.length > 11 ? Jimp.FONT_SANS_32_WHITE : Jimp.FONT_SANS_64_WHITE;
                                Jimp.loadFont(fotd).then(fnt2 => {
                                    const lefyt = (acc.user.length) * (acc.user.length > 9 ? 3 : acc.user.length > 5 ? (7 - acc.user.length / 10) : acc.user.length > 3 ? 2.5 : (2 - acc.user.length / 1.5));
                                    img.print(fnt2, (acc.user.length > 3 ? 158 : acc.user.length >= 2 ? 163 : 190) - lefyt, 30, acc.user);
                                    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(fnt3 => {
                                        const ntf = acc.roles.length > 5 ? 5 : acc.roles.length;
                                        let top = 230;
                                        const addac = 40;
                                        for (let i = 0; i < ntf; i++) {
                                            img.print(fnt3, 110, top, acc.roles[i]);
                                            top += addac;
                                        }
                                        if (acc.roles.length > 5) {
                                            img.print(fnt3, 110, top, '....');
                                        }
                                        img.print(fnt3, 147, 175, 'ROLES');
                                        img.print(fnt3, 150, 490, 'LEVEL');
                                        let topp = 100;
                                        const molef = 500;
                                        const adda = 70;
                                        img.print(fnt3, molef, topp, 'POINTS: ' + acc.points);
                                        topp += adda;
                                        img.print(fnt3, molef, topp, 'MONEY: ' + acc.money);
                                        topp += adda;
                                        img.print(fnt3, molef, topp, 'MSG: ' + acc.msg);
                                        topp += adda;
                                        img.print(fnt3, molef, topp, 'MSG depui le dernier niveau:');
                                        topp += 50;
                                        img.print(fnt3, molef, topp, acc.msgS + ' / '+ (acc.lvl * acc.lvl)+1);
                                        topp += adda + adda;
                                        img.print(fnt3, molef, topp, 'CHANNELS PERSO: ');
                                        topp += 50;
                                        img.print(fnt3, molef, topp, 'cette fonctionaliter est en construction.');
                                        topp += adda + adda;
                                        img.print(fnt3, molef, topp, 'OBJETS: ');
                                        topp += 50;
                                        img.print(fnt3, molef, topp, 'cette fonctionaliter est en construction.');
                                        topp += adda;
                                        img.write(`../../img/card/users/${userCompleteName}.png`.dir);
                                        callBack(`../../img/card/users/${userCompleteName}.png`.dir);
                                    });
                                });
                            });
                        });
                    });
                });
        });
    }).catch(err => {
        console.log('CARD generator err -> ' + err);
    });
}