'use strict';

const express = require('express');
const parser = require('body-parser');
const technoDoc = require('techno-gendoc');
const path = require('path');


technoDoc.generate(require('./api'), 'public');

const app = express();

['/', '/signin', '/signup', '/app'].forEach((paths) => { app.use(paths, express.static('public', {maxAge: 1})); });

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});