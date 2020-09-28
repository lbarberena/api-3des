const router = require('express').Router();
const crypto = require('crypto');
const dotenv = require('dotenv');

let config = {
    cryptkey: process.env.CRYPT_KEY,//24
    iv: process.env.IV//8
};

router.post('/encrypt', (req, res) => {
    try {
        let cipher = crypto.createCipheriv('des-ede3-cbc', config.cryptkey, config.iv);
        let crypted = cipher.update(req.body.text,'utf8','binary');
        crypted += cipher.final('binary');
        crypted = new Buffer.from(crypted, 'binary').toString('base64');
        return res.json({
            success: true,
            msg: 'Success',
            data: crypted
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
