const ordersRouter  = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const {allowRoles, disallowRoles, Roles} = require('../autch/acl');


ordersRouter.get(
    '/',
    allowRoles([
        Roles.ADMIN
    ]),
    ordersController.index
);

ordersRouter.get(
    '/:id',
    allowRoles([
        Roles.USER,
        Roles.ADMIN
    ]),
    ordersController.read
);

ordersRouter.post(
    '/',

    allowRoles([
        Roles.USER,
        Roles.ADMIN
    ]),
    ordersController.create
);

ordersRouter.put(
    '/:id',
    allowRoles(Roles.ADMIN),
    ordersController.update
);

ordersRouter.delete(
    '/id',
    allowRoles(Roles.ADMIN),
    ordersController.delete
);



module.exports = ordersRouter;
