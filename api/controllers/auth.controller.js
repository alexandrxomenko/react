const passport = require('../autch/passport');
const Transaction = require('../services/transaction');


class AuthController {
    static login (req, res) {
                                console.log(req)
        passport.authenticate('local', { session: false }, (err, user, trace) => {

            if(err) {
                throw new Error(err);
                //res.send('incorrect date');
            }

            res.send(user)
        })(req, res)
    }

    static async logout (req, res) {

        res.send({success: true})
    }

    static async register (req, res) {

        try {
            let data = req.body;
            let address = data.address;
            let user = data.users;
            let password = user.password;
            console.log(data)
            let user_create = await  new Transaction().createUser(address, user,password);
// console.log(user_create)
                res.status(200).send(user_create);

        }catch {

            res.status(402).send('Error_controller')
        }



    }
}

module.exports = AuthController;