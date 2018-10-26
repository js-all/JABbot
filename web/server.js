const express = require('express');
const app = express();
const server = require('http').Server(app);
const { catchAsync } = require('./utils');
const fetch = require('node-fetch');
const io = require('socket.io')(server); 
app.use(express.static(__dirname + '/public'));
app.use('/discord/get',require('./discordGet'));
app.use('/images', express.static(__dirname + '/res/img'));
app.get('/',(req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/login',(req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/account',(req, res) => {
    res.sendFile(__dirname+'/public/acc.html');
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
        console.log(jason);
        console.log(json);
        json.guilds = jason;
        socket.emit('tokenToDataRes',JSON.stringify(json));
    }));
    socket.on('IDdbReq', (id) => {
        const dbm = require('../js/ext/dbManager');
        dbm.getAcc((acc) => {
            const e = acc['<@'+id+'>'];
            if (e != undefined) {
                socket.emit('IDdbRes',e);
            } else {
                socket.emit('IDdbRes',{code: 0});
            }
        });
    });
});


server.listen(4567);