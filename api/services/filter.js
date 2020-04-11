const ServiceLocator = require('../services/service.locator');

class Filter {
    constructor(){
        this.knex = ServiceLocator.get('db')
    }

    async find(request) {

        console.log(request);

        const query =  this.knex('products').select('products.id')
            .innerJoin('product_attribute as pa',
            'products.id', '=', 'pa.id_products')
            .innerJoin('attribute_value as av',
                'pa.id', '=', 'av.id_product_attribute')
            .innerJoin('categories',
                'categories.id', '=', 'products.id_categories')
            .innerJoin('brands',
                'products.id_brand', '=', 'brands.id')

            .where(builder => {
                for (let [key, value] of Object.entries(request)) {

                    if (key === 'where') {
                        for (let [keys, values] of Object.entries(value)) {
                            let valueSplit = values.split('_').join(' ');
                            builder.where(keys, valueSplit)
                        }

                    }

                    if (key === 'andWhere') {
                        for (let [keys, values] of Object.entries(value)) {
                            let valueSplit = values.split('_').join(' ');
                            builder.where(keys, valueSplit)
                        }
                    }

                    if (key === 'whereBetween') {
                        for (let [keyBetween, valueBetween] of Object.entries(value)) {
                            builder.whereBetween(keyBetween, valueBetween)
                        }
                    }
                }
            });
        if(request['limit']){
            query.limit(request['limit'])
        }

        if(request['page']){
            let offset = request['limit'] * request['page'] - request['limit'];
            console.log(offset);
            query.offset(offset)
        }


        return query.groupBy('products.id')
    }
}

module.exports = Filter;