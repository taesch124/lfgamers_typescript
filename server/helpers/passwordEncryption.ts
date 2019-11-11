const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) reject(err);
    
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err);
    
                resolve(hash);
            });
        });
    })
    
}

async function validatePassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            if (err) {console.error(err); reject(err)}

            if(match) {
                resolve(true);
            } else {
                console.error(err) ;
            }
        });
    });
}

module.exports = {
    hashPassword,
    validatePassword,
}