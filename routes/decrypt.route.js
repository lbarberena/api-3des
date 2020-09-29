const router = require('express').Router();
const crypto = require('crypto');
const dotenv = require('dotenv');

let config = {
    cryptkey: process.env.CRYPT_KEY,//24
    iv: process.env.IV//8
};

router.post('/decrypt', (req, res) => {
    try {
        if (req.body.text === null || typeof req.body.text === 'undefined' || req.body.text === '') {
            return req.body.text;
        }
        let text = new Buffer.from(req.body.text, 'base64').toString('binary');
        let decipher = crypto.createDecipheriv('des-ede3-cbc', config.cryptkey, config.iv);
        let dec = decipher.update(text,'binary','utf8');
        dec += decipher.final('utf8');
        return res.json({
            success: true,
            msg: 'Success',
            data: dec
        });
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Ocurrió un error',
            data: error
        });
    }
});

module.exports = router;
