const BaseModel = require('./base.model');
const Bcrypt = require ('../services/bcrypt');



class User extends BaseModel {
    constructor() {
        super('users')
    }


    getList() {
        return this.table.select('*')
            .innerJoin('address',  'users.id_address', '=', 'address.id')
    }

    find(id) {

        return this.table.select('*')
            .innerJoin('address',  'users.id_address', '=', 'address.id')
            .where(id)
            .first()
    }

    getUserByCredentials(username, password) {

       return this.table.select('*')
           .where('email',username, )
           .first()
                .then((found) => {
                    console.log(found)
                    let pass = Bcrypt.getPassword(password, found.password);
                    console.log(pass)
                    if(pass){
                        return found
                    }
                        return  null;
                })
    }

    getUserByToken(token) {

        return this.table.select('*')
            .where('token', token)
            .first()
    }

    getUserAttribute (attributName, attribut) {
        return this.table.select('*').where(attributName, attribut).first()
    }

    create(password, data) {
        data.password = Bcrypt.setPassword(password);
        return this.table.insert(data)
    }





}

module.exports = User;