const User = require('../models/users.model');
const Address =require('../models/address.model');
const ServiceLocator = require('../services/service.locator');
const Bcrypt = require('../services/bcrypt');
const uuidv4 = require('uuid/v4');

class Transaction {
    constructor(){
        this.knex = ServiceLocator.get('db')
    }

    createUser(address, user, password) {

        return this.knex.transaction(async function (trx) {

            const AddressModel = new Address();
            let addressId = await AddressModel.find('id', address);

            if (addressId) {
                user.id_address = addressId;
            } else {
                addressId = await AddressModel.createWithTransaction(address, trx, 'id');
                addressId = addressId[0];
            }

            const UserModel = new User();

            user.password = Bcrypt.setPassword(password);
            user.id_address = addressId;
            user.token = uuidv4();
            console.log(user);
            const userCreateToken = await UserModel.createWithTransaction(user, trx, 'token');
          //  console.log(userCreateToken);
            if (userCreateToken) {
                return userCreateToken
            }
            throw new Error('user not created')
        })
    }
}

module.exports = Transaction;


