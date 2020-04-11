const BaseModel = require('./base.model');

class Order extends BaseModel {

    constructor() {
        super('orders')
    }

    getList(idUser) {

        return this.table.select([
            'orders.id',
            'orders.date',
            'products_orders.amount',
            'products_orders.unit_price',
            'products.product_name'])
            .innerJoin('products_orders',
                'orders.id',
                'products_orders.id_orders')
            .innerJoin('products',
                'products_orders.id_products',
                'products.id')
            .where({'orders.id_users': idUser})
    }

    findByID(idUser, idOrder) {

        return this.table.select([
            'orders.id',
            'orders.date',
            'products_orders.amount',
            'products_orders.unit_price',
            'products.product_name'])
            .innerJoin('products_orders',
                'orders.id',
                'products_orders.id_orders')
            .innerJoin('products',
                'products_orders.id_products',
                'products.id')
            .where({'orders.id_users': idUser})
            .andWhere({'orders.id': idOrder})

    }

    getListsForUp(id) {
        return this.table.select([
            'products_orders.id_products',
            'products_orders.amount'])
            .innerJoin(
                'products_orders',
                'orders.id',
                'products_orders.id_orders')
            .where({'orders.id': id})
    }

}

module.exports = Order;