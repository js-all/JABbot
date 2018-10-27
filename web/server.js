const express = require('express');
const app = express();
const server = require('http').Server(app);
const { catchAsync } = require('./utils');
const fetch = require('node-fetch');
const io = require('socket.io')(server); 
const dbm = require('../js/ext/dbManager');
app.use(express.static(__dirname + '/public'));
app.use('/discord/get',require('./discordGet'));
app.use('/images', express.static(__dirname + '/res/img'));
app.get('/',(req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/login',(req, res) => {
    //res.sendFile(__dirname + '/public/login.html');
    res.redirect("/discord/get/login")
});
app.get('/account',(req, res) => {
    res.sendFile(__dirname+'/public/acc.html');
});
app.get('/join',(req, res) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${process.env.BOT_ID}&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A4567%2F&scope=bot`);
});

app.use((err, req, res, next) => {
    switch (err.message) {
      case 'NoCodeProvided':
        return res.status(400).send({
          status: 'ERROR',
          error: err.message,
        });
      default:
        return res.status(500).send({
          status: 'ERROR',
          error: err.message,
        });
    }
  });

io.on('connection',(socket) => {
    socket.on('tokenToDataReq', catchAsync(async (token) => {
        const resp = await fetch('http://discordapp.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        });
        const json = await resp.json();
        const respo = await fetch('http://discordapp.com/api/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        });
        const jason = await respo.json();
        json.guilds = jason;
        socket.emit('tokenToDataRes',JSON.stringify(json));
    }));
    socket.on('IDdbReq', (id) => {
        dbm.getAcc((acc) => {
            const e = acc['<@'+id+'>'];
            if (e != undefined) {
                socket.emit('IDdbRes',e);
            } else {
                socket.emit('IDdbRes',{code: 0});
            }
        });
    });
    socket.on('createAccReq',(username, id) => {
        dbm.getAcc(acc => {
            if (acc["<@"+id+">"] !== undefined) {
                socket.emit('createAccRes', false);
            } else {
                acc["<@"+id+">"] = {
                    user: '',
                    points: 0,
                    lvl: 1,
                    money: 0,
                    msgS: 0,
                    msg: 0,
                    roles: [],
                    Object: {}
                }
                acc["<@"+id+">"].user = username;
                dbm.setAcc(acc);
                socket.emit('createAccRes', true);
            }
        });
    });
});


server.listen(4567);
console.log('server')