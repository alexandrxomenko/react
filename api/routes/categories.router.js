const categoriesRouter  = require('express').Router();
const categoriesController = require('../controllers/categories.controller');
// const AddCRUDController = require('../static/AddCRUDController');
const {allowRoles, Roles} = require('../autch/acl');
const validate = require('../services/validate');

categoriesRouter.post('/',
    validate({
    'categorie_name': 'required',
    'parent_id': 'required'
}), allowRoles(Roles.ADMIN), categoriesController.create);

categoriesRouter.put('/:id',
    validate({
    'categorie_name': 'required',
    'parent_id': 'required'
}), allowRoles(Roles.ADMIN), categoriesController.update);

categoriesRouter.delete('/:id', allowRoles(Roles.ADMIN), categoriesController.delete);

// AddCRUDController(categoriesRouter, categoriesController);


module.exports = categoriesRouter;
