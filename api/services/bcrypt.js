const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

class Bcrypt {

    static setPassword(password){
        return bcrypt.hashSync(password, salt);
    }

    static getPassword(password, hash){
       return bcrypt.compareSync(password, hash);
    }
}

module.exports = Bcrypt;