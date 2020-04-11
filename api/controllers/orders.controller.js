const Order = require('../models/orders.model');
const OrderTransaction = require('../transaction/order.transaction');
const {sendResponse} = require('../services/send.response');

class ordersController {

    static  async index (req, res) {

        let idUser = req.user['id'];
        let ListOrders = await new Order()
            .getList(idUser);
        res.status(200).json({ListOrders})
    };

    static async create(req, res) {

        let IdUser = req.user['id'];
           let createId =  await new OrderTransaction()
                .create( IdUser, req.body);

            sendResponse(res, createId)

    };

    static async read(req, res) {
        try{
            let order = await new Order()
                .findByID(req.user['id'], req.params.id);
            if(!order[0]){
                return res.status(404).json({
                    message : "order not found"
                })
            }
            res.status(200).json({order});
        }catch (err) {
            res.status(501).json({
                message : "something went wrong",
                error : `${err.name} : ${err.message}`
            });
        }
        


    };

    static async update(req, res) {
        let idOrder =  req.params.id;
        let data = req.body;
        let updateOrder = await new OrderTransaction()
            .update(idOrder, data['products_orders']);
        console.log(updateOrder);

        sendResponse(res, updateOrder)

    };


    static async delete(req, res) {
        await new Order()
            .delete({'id': req.params.id});
        res.status(200).send({message: 'delete'});
    };
}

module.exports = ordersController;



