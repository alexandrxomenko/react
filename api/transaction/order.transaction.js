const ServiceLocator = require('../services/service.locator');
const UserModel = require('../models/users.model');
const ProductsModel = require('../models/products.model');
const ProductsOrders = require('../models/productsOrders.model');
const OrdersModel = require('../models/orders.model');


class OrderTransaction {

    constructor () {
        this.knex = ServiceLocator.get('db');
    }

    async create(idUser, data) {

        return  this.knex.transaction(async trx => {
        try {
            let dataOrder = {};
            dataOrder.id_users = idUser;
            dataOrder.date = new Date();

            const ordersId = await trx('orders').insert(dataOrder, 'id');
            if (!ordersId){
                throw 400
            }

            let dataProdOrd = data['products_orders'];


            for (let item of dataProdOrd) {

                const product = await new ProductsModel().find({'id': item.id_products});

                if (!product) {
                    throw 204;
                }

                item.unit_price = item.amount * product.price;
                item.id_orders = ordersId[0];
            }

            return await trx('products_orders').insert(dataProdOrd, 'id');

        }catch (e) {
            return {code: e}
        }

        });
    }

    async update(idOrder, dataFront) {

  return this.knex.transaction(async trx => {
      let error = [], toInsert = [], toUpdate = [],
      toDelete = [], arrFR = [], arrDB = [], arrRes = [];

            try {
                await trx('orders')
                    .where({'id': idOrder})
                    .update({'update': new Date()});

                let dbData = await new OrdersModel()
                    .getListsForUp(idOrder);

                for (let y = 0; y < dataFront.length; y++) {
                    arrFR.push(Object.values(dataFront[y]));
                }

                for (let i = 0; i < dbData.length; i++) {
                    arrDB.push(Object.values(dbData[i]))
                }

                console.log(arrFR);
                console.log(arrDB);

                let frontMap = new Map(arrFR);
                let backMap = new Map(arrDB);


                for (let [key, value] of frontMap.entries()) {
                    if (backMap.has(key)) {
                        if (frontMap.get(key) !== backMap.get(key)) {
                            toUpdate.push({id_products: key, amount: value})
                        }
                    }
                    if (!backMap.has(key)) {
                        toInsert.push({id_products: key, amount: value})
                    }
                }

                for (let [key, value] of backMap.entries()) {
                    if (!frontMap.has(key)) {
                        toDelete.push({id_products: key, amount: value})
                    }
                }


                for (let item of toInsert) {

                    let productModel = new ProductsModel();
                    let productValue = await productModel.find({'id': item['id_products']});

                    if (typeof productValue === 'undefined' ) {
                        throw 204
                    }

                    item.unit_price = productValue['price'] * item.amount;
                    item.id_orders = idOrder;

                    let idInsert = await trx('products_orders')
                        .insert(item, 'id');
                    arrRes.push({insertId: idInsert[0]})
                    // console.log(idInsert);

                }

                for (let item of toUpdate) {

                    let productModel = new ProductsModel();
                    let productValue = await productModel
                        .find({'id': item['id_products']});

                    item.unit_price = productValue['price'] * item.amount;
                    item.id_orders = idOrder;

                    let idUp = await trx('products_orders')
                        .where({'id_orders': item['id_orders']})
                        .andWhere({'id_products': item['id_products']})
                        .update(item, 'id');
                    arrRes.push({updateId: idUp[0]})

                }

                for (let item of toDelete) {
                    let idDel = await trx('products_orders')
                        .where('id_orders', idOrder)
                        .andWhere(
                            'id_products',
                            item['id_products'])
                        .del('id');
                    arrRes.push({deleteId: idDel[0]})

                }
                return arrRes
                // console.log('update', toUpdate);
                // console.log('insert', toInsert);
                // console.log('delete', toDelete);

            } catch (e) {
                //error.push({message: e.message});
                return {code: e}
            }
        })
    }
}

module.exports = OrderTransaction;
