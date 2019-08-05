const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const port = process.env.PORT || 3000;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'));
});

router.get('/maps', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/maps.html'));
});

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/templates'));

app.use('/', router);

app.listen(port, () => {
    console.log('Running');
});