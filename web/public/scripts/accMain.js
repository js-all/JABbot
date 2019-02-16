const serverBOX = document.getElementById('servers');
serverBOX.addBox = function(guild) {
    let box = document.createElement('div');
    box.setAttribute('class', 'serverBoxContainer');
    let icon = document.createElement('div');
    icon.setAttribute('class', 'serverBoxIcon');
    icon.style.backgroundImage = `url("https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png")`;
    let c = document.createElement('div');
    c.setAttribute('class', 'serverBoxName');
    c.innerHTML = guild.name;
    box.appendChild(icon);
    box.appendChild(c);
    serverBOX.appendChild(box);
    return box;
}

function callWhenData() {
    document.getElementById('pdp').style.backgroundImage = 'url("https://cdn.discordapp.com/avatars/'+data.id+'/'+data.avatar+'.png")'
    document.getElementById('login').innerHTML = data.username;
}
function logout() {
    sessionStorage.removeItem('JABdiscordToken');
    location.href = '/';
}
function callWhendb() {
    document.getElementById('acc').style.display = 'block';
    document.getElementById('accIcon').style.backgroundImage = 'url("https://cdn.discordapp.com/avatars/'+data.id+'/'+data.avatar+'.png")';
    document.getElementById('colLname').innerHTML = `${data.db.user}<br /><p id="colLname2">${`${data.username}#${data.discriminator}</p>`}`;
    document.getElementById('colLlvl').innerHTML = `level<br /><p id="colLlvl2">${data.db.lvl}</p>`;
    socket.emit('GlobalRankReq', data.id);
    document.getElementById('colLchannelE').appendChild(document.createElement('div')).setAttribute('id','noch');
    document.getElementById('noch').innerHTML = 'vous ne posséder pas de channel pour le moment';
    let se = 0;
    for(let i of data.guilds) {
        if (se < 3) {
            se++;
            serverBOX.addBox(i);
        }
    }
    if (data.guilds.length > 3) {
        let e = document.createElement('a');
        e.href = '/account/servers';
        e.innerHTML = '&nbsp;more&nbsp;';
        e.style.textAlign = 'left';
        e.style.textIndent = '10px';
        e.classList.add('as');
        serverBOX.appendChild(e);
    }
    document.getElementById('points').innerHTML = '<span class="d_b">points :</span> '+data.db.points+"<br />";
    document.getElementById('money').innerHTML = '<span class="d_b">money :</span> '+data.db.money+"<br />";
    document.getElementById('msg').innerHTML = '<span class="d_b">msg :</span> '+data.db.msg+"<br />";
    document.getElementById('msgS').innerHTML = '<span class="d_b">msg depuis le dernier niveau :</span> '+data.db.msgS;
    document.getElementById('roles').innerHTML = '<span class="d_b">roles :</span><br />';
    let pass = false;
    for (let i = 0;i < (data.db.roles.length > 5 ? 5 : data.db.roles.length);i++) {
        let e = document.createElement('div');
        e.innerHTML = data.db.roles[i];
        pass = true;
        e.setAttribute('class','role');
        if (data.db.roles[i] != '') {
            document.getElementById('roles').appendChild(e);
        }
        else {
            pass = false;
        }
    }
    if (!pass) {
        let e = document.createElement('div');
        e.innerHTML = 'vous ne posséder aucun roles.';
        document.getElementById('roles').appendChild(e).setAttribute('class', 'role g');
    }
    if (data.db.roles.length > 5) {
        let e = document.createElement('div');
        e.innerHTML = '...';
        document.getElementById('roles').appendChild(e).setAttribute('class', 'role g');
    }
    const xpc = document.getElementById('xpc');
    const path = document.getElementById('path');
    let dash = path.getTotalLength();
    let v = 100-((data.xp.v / data.xp.o) * 100);
    let o = (dash / data.xp.o) * dash;
    xpc.setAttribute('stroke-dasharray', o);
    o = (v * dash) / 100;
    xpc.setAttribute('stroke-dashoffset', -o);
    document.getElementById('xpb').style.width = ((data.xp.v / data.xp.o) * 100) + '%';
    document.getElementById('xpb').innerHTML = Math.round((data.xp.v / data.xp.o) * 100)+'%';
    
    
    
}
function createAcc() {
    socket.emit('createAccReq',data.username, data.id);
}
function callWhenNodb () {
    document.getElementById('noAcc').style.display = 'block';
}
function v() {
    const maxCardCHeight = parseFloat(getComputedStyle(document.getElementById('accCardC')).height)* 1;
    console.log(maxCardCHeight - 80)
    document.getElementById('accCard').style = `--accCard-height: ${maxCardCHeight - (80 + 70)}px;`
}
socket.on('createAccRes',res => {
    if (res == true) {
        location.reload();
    }
});
socket.on('GlobalRankRes', res => {
    document.getElementById('colLrank').innerHTML = `Global Rank<br />${res.rank} / <p id="colLrank2">${res.on}</p>`;
});
v();
window.addEventListener('resize', v);
