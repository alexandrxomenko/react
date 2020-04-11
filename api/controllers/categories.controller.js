const Categorie = require ('../models/categorie.model');
const {sendResponse} = require('../services/send.response');

class categoriesController {

    static  async index (req, res) {
        let list = await  new Categorie()
            .getList();
        sendResponse(res, list)

    };

    static async create(req, res) {
        let data = req.body;
        let createID = await new Categorie()
            .create(data);
        sendResponse(res, createID)

    };

    // static async read(req, res) {
    //     let id_name = {'id': req.params.id};
    //     res.send(await new Categorie().find(id_name))
    // };

    static async update(req, res) {
        let id = {'id': req.params.id};
        let data = req.body;
        let upCategorie = await new Categorie()
            .store(id, data);
        sendResponse(res, upCategorie)
    };

    static async delete(req, res) {
        let id = {'id' : req.params.id};
        let rmCategorie = await new Categorie()
            .delete(id);

        sendResponse(res, rmCategorie)

    };
}

module.exports = categoriesController;