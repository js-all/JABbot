var socket = io('http://localhost:4567');


socket.emit('tokenToDataReq', token);
socket.on('tokenToDataRes',(res) => {
if (JSON.parse(res).code != undefined) {
    if (JSON.parse(res).code == 0) {
        location.href = '/login';
    }
    } else {
        data = JSON.parse(res);
        callWhenData();
        socket.emit('IDdbReq',data.id);
    }
});
socket.on('IDdbRes',(res) => {
    if (res.code == undefined) {
        data.db = res;
        if (sessionStorage.getItem('JABdiscordToken') === null) {
            sessionStorage.setItem('JABdiscordToken',token);
            location.href = '/account';
        }
        callWhendb();
    } else {
        if (sessionStorage.getItem('JABdiscordToken') === null) {
            sessionStorage.setItem('JABdiscordToken',token);
            location.href = '/account';
        }
    }
});