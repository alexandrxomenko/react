const Product = require('../models/products.model');
const Transaction = require('../transaction/product.transaction');
const ApiFilter = require('../services/filter');
const {sendResponse} = require ('../services/send.response');

class productsController {

    static  async index (req, res) {
        let listProduct={};
        let arrId = [];
        let {filter} = req.query;

        if (filter) {

            let apiFilter = new ApiFilter();
            listProduct = await apiFilter
                .find(filter);

            listProduct.forEach(item => {
                for (let i of Object.values(item)) {
                    arrId.push(i)
                }
            });

            listProduct = await new Product()
                .getListById(arrId);
        }
        if(!filter){

            listProduct = await new Product()
                .getList()
        }
        sendResponse(res, listProduct)

    };


    static async create(req, res, next) {

        try {
            let data = req.body;

            let createList = await new Transaction()
                .create(
                    data['products'],
                    data['attribute'],
                    data['value']);

            res.status(200).json({createList});
        } catch (e) {
            next(new Error('not created'));
        }
    };

    static async read(req, res) {

        const ProductsList = await new Product()
            .getOneProduct(req.params.id);

        sendResponse(res, ProductsList);
    };

    static async update(req, res) {
        let idProduct = req.params.id;
        let data = req.body;

        let updateList = await new Transaction()
            .update(idProduct, data);

        res.send(updateList);
    };

    static async delete(req, res) {
        let id = {'id' : req.params.id};
        let deleteProduct = await new Product()
            .delete(id);
        sendResponse(res, deleteProduct)

    };
}

module.exports = productsController;
