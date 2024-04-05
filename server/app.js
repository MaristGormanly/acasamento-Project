const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({type: 'application/json'}));

let userRoutes = require('./route/userRoute');
app.use('/api/user', userRoutes);

let postRoutes = require('./route/postRoute');
app.use('/api/post', postRoutes);

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './client/views'})
})

app.get('/feed', function (req, res) {
    res.sendFile('feed.html', {root: './client/views'})
})

app.use(express.static('client/public'));

app.listen(1337, () => console.log('Twanger listening on port 1337!'));