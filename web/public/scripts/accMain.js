function callWhenData() {
    document.getElementById('pdp').style.backgroundImage = 'url("https://cdn.discordapp.com/avatars/'+data.id+'/'+data.avatar+'.png")'
document.getElementById('login').innerHTML = data.username;
}
function logout() {
    sessionStorage.removeItem('JABdiscordToken');
    location.href = '/';
}
