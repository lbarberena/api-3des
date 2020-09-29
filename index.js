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

const allowedOrigins = [
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://localhost:4200',
    'https://uca-3des.web.app/',
    'uca-3des.web.app'
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api/',
    encrypt,
    decrypt
);

app.listen(process.env.PORT || 8080, () => console.log('Server Up and Running'));
