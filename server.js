let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');
let userMas = {};
let counter = 0;
app.use('/', express.static('public'));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.post('/api/messages', (req, res) => {
    technolibs.publish(req.body).then(body => res.json(req.body));
});
app.get('/signin', (req, res) => {
	res.sendfile('public/index.html', {root: __dirname });
});
app.get('/signup', (req, res) => {
	res.sendfile('public/index.html', {root: __dirname });
});
app.get('/rating.json', (req, res) => {
	res.writeHead(200, {
            'Content-Type': 'application/json; charset=UTF-8'
        });
	res.send(JSON.stringif({
		medalists: [
			{
			username: "ivan",
			wins: 25
			},
			{
			username: "bob",
			wins: 20
			},
			{
			username: "oleg",
			wins: 15
			}
		]
	}));
});
app.get('/rating', (req, res) => {
	res.sendfile('public/index.html', {root: __dirname });
});
app.get('/pregame', (req, res) => {
	res.sendfile('public/index.html', {root: __dirname });
});

app.post('/signin', (req, res) => {
    let content = req.body;
    if ((content.email && (content.email in userMas)) && (userMas[content.email].password == content.password)) {
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=UTF-8',
            'Session': userMas[content.email].session
        });
    } else {
        res.writeHead(400, {
            'Content-Type': 'text/plain; charset=UTF-8'
        });
    }
    res.end();

});

app.post('/signup', (req, res) => {
    let content = req.body;
    if (content.email && !(userMas[content.email])) {
        let newUserData = {
            password: content.password,
            session: counter++
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=UTF-8',
            'Session': newUserData.session
        });
        userMas[content.email] = newUserData;
    } else {
        res.writeHead(400, {
            'Content-Type': 'text/plain; charset=UTF-8'
        });
    }
    res.end();
});

app.get('/api/messages', function(req, res) {
    res.send([
        technoDoc.mock(require('./api/scheme/Message')),
        technoDoc.mock(require('./api/scheme/Message')),
        technoDoc.mock(require('./api/scheme/Message')),
        technoDoc.mock(require('./api/scheme/Message'))
    ])
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`App started on port ${process.env.PORT || 3001}`);
});
