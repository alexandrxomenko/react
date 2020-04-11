const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const uuidv4 = require('uuid/v4');
const User = require('../models/users.model');
const Roles = require('../autch/acl').Roles;

passport.use(new LocalStrategy(
    async function(username, password, done) {

        // console.log(username);
        // console.log(password)
        const UserModel = new User();
        const user = await  UserModel.getUserByCredentials(username, password);
            // console.log(user)
        if(!user) {

            // return error
            return done('User not found', false)
        }

        user.token = uuidv4();
        await UserModel.update(user);


        return done(null, user)

    }
));

passport.use(new BearerStrategy(
    async function(token, done) {

        const UserModel = new User();
        const user = await UserModel.getUserByToken(token);

        if(!user) {

            return done(null, {roles: Roles.GUEST})
        }

        return done(null, user)
    }
));

module.exports = passport;