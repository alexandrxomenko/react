const productsRouter = require ('express').Router();
const productsController = require('../controllers/products.controller');
const AddCRUDController = require('../static/AddCRUDController');
const {allowRoles, Roles} = require('../autch/acl');
const validate = require('../services/validate');

productsRouter.post(
    '/',
    allowRoles(Roles.ADMIN),
    validate({
        'products.product_name': 'required',
        'products.price': 'required',
        'products.quantity': 'required'
    }),
    productsController.create
);

productsRouter.put(
    '/id',
    allowRoles(Roles.ADMIN),
    productsController.update
);

productsRouter.delete(
    '/id',
    allowRoles(Roles.ADMIN),
    productsController.delete
);

AddCRUDController(productsRouter, productsController);

module.exports = productsRouter;