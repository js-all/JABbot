const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('./utils');
const CLIENT_ID = process.env.BOT_ID;
const CLIENT_SECRET = process.env.BOT_SECRET;
const redirect = encodeURIComponent('http://localhost:4567/discord/get/callback');
router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify%20guilds`);
             //`https://discordapp.com/api/oauth2/authorize?client_id=505316364567707652&redirect_uri=${redirect}&response_type=code&scope=identify%20guilds`
});
router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code) res.redirect('/');
    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${creds}`,
        },
      });
    const json = await response.json();

    res.redirect(`/account?token=${json.access_token}`);
  }));

module.exports = router;