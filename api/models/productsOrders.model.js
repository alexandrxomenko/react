const BaseModel = require('./base.model');

class ProductsOrder extends BaseModel {

    constructor() {
        super('products_orders')
    }

    getId (id) {
        return this.table.select('*')
            .where(id).then((item ) => {
                let arr = [];

                item.forEach(i => {
                    arr.push(i['id'])
                });
                return arr
            } )
    }
    delete(idOrder, idProduct) {
        return this.table.where('id_orders', idOrder).andWhere('id_products', idProduct)
            .del()
    }


}

module.exports = ProductsOrder;