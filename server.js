let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();

let db = {};

app.use('/', express.static('public'));

app.use(parser.json());
app.use(technologger);

app.post('/users', (req, res) => {

    if( db[req.body.email] != undefined ){
        db[req.body.email] += 1;
    }else
    {
        db[req.body.email] = 0;
    }

    console.log(db[req.body.email]);
    res.send(db[req.body.email].toString());
    // TODO: вернуть количество обращений
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
