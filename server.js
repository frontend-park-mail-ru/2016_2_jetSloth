let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

let db = {};

app.use('/', express.static('public'));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});


app.post('/users', (req, res) => {

    if (db[req.body.email] != undefined) {
        db[req.body.email] += 1;
    } else {
        db[req.body.email] = 0;
    }

    console.log(db[req.body.email]);
    res.send(db[req.body.email].toString());
    // TODO: вернуть количество обращений
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])

});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
