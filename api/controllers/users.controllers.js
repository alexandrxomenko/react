const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const Transaction = require('../services/transaction');


class usersController {


    static  async index (req, res) {
        res.send(await new User().getList())
    };

    static async create(req, res) {
        try {
            let data = req.body;
            let address = data.address;
            let user = data.users;
            let password = user.password;

            let user_create = await  new Transaction().createUser(address, user,password);

            res.status(200).send(user_create);

        }catch {
            res.status(500).send('user_not_create')
        }
    };

    static async read(req, res) {

        let id_name = {'users.id': req.params.id};
        let readList = await new User().find(id_name);
        res.status(200).send(readList);
    };

    static async update(req, res) {

        let id_name = {'users.id': req.params.id};
        let data = req.body;
        data.password = bcrypt.hashSync(req.body.password, salt);
        let updateList = await new User().store(id_name, data)
            .then(() => 'update list');
        res.send(updateList);
    };

    static async delete(req, res) {
        let id_name = {'users.id' : req.params.id};
        let message = await new User().delete(id_name)
            .then(()=> 'List deleted');
        res.status(200).send(message);
    };


}

module.exports = usersController;




