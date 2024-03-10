const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './client/views'})
})

app.get('/feed', function (req, res) {
    res.sendFile('feed.html', {root: './client/views'})
})

app.use(express.static('client/public'));

app.listen(1337, () => console.log('Twangster listening on port 1337!'));