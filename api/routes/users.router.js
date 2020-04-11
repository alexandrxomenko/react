const usersRouter = require('express').Router();
const usersController = require('../controllers/users.controllers');
const AddCRUDController = require('../static/AddCRUDController');
const {allowRoles, Roles} = require('../autch/acl');

usersRouter.use(allowRoles(Roles.ADMIN));
AddCRUDController (usersRouter, usersController);

module.exports = usersRouter;