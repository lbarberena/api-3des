const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var cors = require('cors');

dotenv.config();

//Import Routes
const encrypt = require('./routes/encrypt.route');
const decrypt = require('./routes/decrypt.route');

app.use(bodyParser.json());

app.use(cors({ origin: true }));

app.use('/api/',
    encrypt,
    decrypt
);

app.listen(process.env.PORT || 8080, () => console.log('Server Up and Running'));
