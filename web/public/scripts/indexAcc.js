// JABdiscordToken

var socket = io('http://localhost:4567');
var data = null;

const token = sessionStorage.getItem('JABdiscordToken');
if (token !== null) {
    socket.emit('tokenToDataReq', token);
    socket.on('tokenToDataRes',(res) => {
    if (JSON.parse(res).code != undefined) {
        if (JSON.parse(res).code == 0) {
            location.href = '/login';
        }
        } else {
            data = JSON.parse(res);
            socket.emit('IDdbReq',data.id);
        }
    });
    socket.on('IDdbRes',(res) => {
        if (res.code == undefined) {
            data.db = res;
            callBackIfTokenGet();
        } else {
            location.href = '/login';
        }
    });
} else {
    callBackIfTokenDidntGet();
}

function callBackIfTokenGet() {
    document.getElementById('pdp').style.backgroundImage = 'url("https://cdn.discordapp.com/avatars/'+data.id+'/'+data.avatar+'.png")'
    document.getElementById('logout').style.display = 'block';
    document.getElementById('login').innerHTML = data.username;
    
};
function callBackIfTokenDidntGet() {

}
function logout() {
    if (data != null) {
        sessionStorage.removeItem('JABdiscordToken');
        location.reload();
    }
}