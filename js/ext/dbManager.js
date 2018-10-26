const sqlite = require('sqlite3');
sqlite.verbose();
const db = new sqlite.Database(__dirname + '/../../db/account.db3');
module.exports = {
    getAcc(callBack) {
        let res = {};
        db.each('SELECT * FROM account',(err, row) => {
            if (err) throw err;
            let roles = row.roles == null ? [] : row.roles.split(',');
            res[row.id] = {
                user: row.user,
                points: row.points,
                lvl: row.lvl,
                money: row.money,
                msg: row.msg,
                msgS: row.msgS,
                roles: roles,
                objects: {
                    "cette-fonctialiter-est-en-construction": {
                        nbre: null
                    }
                }
            }
        }, () => {
            if (callBack != undefined && typeof callBack == 'function') callBack(res);
            return res;
        });
    },
    setAcc(acc) {
        this.getAcc(geted => {
            if (JSON.stringify(acc) == JSON.stringify(geted)) return;
            for (let i in acc) {
                const e = acc[i];
                    let roles = e.roles == [] ? null : e.roles.join(',');
                    if (geted[i] == undefined) {
                        db.run("INSERT INTO account values(?, ?, ?, ?, ?, ?, ?, ?)", [i, e.user, e.points, e.lvl, e.money, e.msg, roles, e.msgS]);
                    } else {
                        db.run("UPDATE account SET user = ?, points = ?, lvl = ?, money = ?, msg = ?, roles = ?, msgS = ? WHERE id = ?", [e.user, e.points, e.lvl, e.money, e.msg, roles, e.msgS, i]);
                    }
            }
        });
    }
}