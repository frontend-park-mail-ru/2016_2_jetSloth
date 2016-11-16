'use strict';

import express from 'express'
import parser from 'body-parser'
import technoDoc from 'techno-gendoc'
import path from 'path'

technoDoc.generate(require('./api'), 'public');

const app = express();

['/', '/signin', '/signup'].forEach((paths) => { app.use(paths, express.static('public', {maxAge: 1})); });

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${process.env.PORT || 3000}`);
});