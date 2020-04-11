const ServiceLocator = require('../services/service.locator');
const ProductsModel = require('../models/products.model');
const BrandsModel = require('../models/brands.model');



class ProductTransaction {

    constructor() {
        this.knex = ServiceLocator.get('db')
    }

    async create(product, attributes, values) {

        return this.knex.transaction(async trx => {

            // check brand existence
            const brand = await new BrandsModel()
                .find({'brand_name': product['brand_name']});
            if (brand) {
                product.id_brand = brand['id'];
                delete product.brand_name;
            }

            if (!brand) {
                const idBrand = await new BrandsModel()
                    .createWithTransaction({'brand_name': product['brand_name']}, trx, 'id');
                product.id_brand = idBrand[0];
                delete product.brand_name;
            }


            const idProduct = await new ProductsModel()
                .createWithTransaction(product, trx, 'id');

            attributes.forEach(attribute => attribute.id_products = idProduct[0]);

            console.log(attributes);

            const idAttribute = await this.knex('product_attribute')
                .insert(attributes, ['id', 'attribute_type'])
                .transacting(trx);

console.log('id', idAttribute)
            if (values.length !== idAttribute.length) {
                throw new Error('attributeLength != valueLength')
            }

            for (let i = 0; i < values.length; i++) {
                for (let y = 0; y < idAttribute.length; y++) {
                    if (i === y) {

                        values[i].id_product_attribute = idAttribute[y].id;
                        values[i].id_products = idProduct[0];
                        const typeValue = idAttribute[y].attribute_type.trim();
                        switch (typeValue) {
                            case 'text': {

                                if (values[i].value) {
                                    values[i].value_text = values[i].value;
                                    delete values[i].value;
                                }
                                break
                            }
                            case 'integer' : {

                                if (values[i].value) {
                                    values[i].value_integer = values[i].value;
                                    delete values[i].value;
                                }
                                break
                            }
                            case 'date' : {

                                if (values[i].value) {
                                    values[i].value_date = values[i].value;
                                    delete values[i].value;
                                }
                                break
                            }
                        }
                    }
                }
            }


            await this.knex('attribute_value')
                .insert(values)
                .transacting(trx);

            return idProduct;

        })

    }

    async update (id, {brands, products, attribute, value}){

        console.log("data front", id, products);


        this.knex.transaction(async trx => {

            let productsValueFront = [], productsKeyFront = [], toInsert = [], toUpdate = [], toDelete = [],
                valuesAttributeDb = [], allValuesProdDb = [], attributeFr = [];
            let productUpdate = {};

            const getData = (item) => {
                let items = Object.assign({}, item);
                delete items['attribute_name'];

                if (items['attribute_type'] === 'text') {
                    items['value_text'] = items['value'];
                    delete items['attribute_type'];
                    delete items['value'];
                }
                if (items['attribute_type'] === 'integer') {
                    items['value_integer'] = items['value'];
                    delete items['attribute_type'];
                    delete items['value'];
                }
                if (items['attribute_type'] === 'date') {
                    items['value_date'] = items['value'];
                    delete items['attribute_type'];
                    delete items['value'];
                }
                return items
            };



            // пошук чи існує в базі бренд, я кщо не снує то створюєм і присвоюєм властивість id_brand' для продуктів
            let Brands = new BrandsModel();
            let brand = await Brands.find(brands);

            if (!brand) {
                let idBrand = await Brands.createWithTransaction(brands, trx, 'id');
                products['id_brand'] = idBrand[0]
            }
            if (brand) {
                products['id_brand'] = brand['id'];

            }

            // створюєм масив значень для продуктів з фронта
            for (let value of Object.values(products)) {
                productsValueFront.push(value)
            }
            // створюєм масив значень ключів
            for (let key of Object.keys(products)) {
                productsKeyFront.push(key)
            }


            const ProductModel =  new ProductsModel();

            const productDB = await ProductModel
                .getListByID(
                    id, [
                        'product_name',
                        'price',
                        'id_categories',
                        'quantity',
                        'id_brand',

                        'attribute_name',
                        'attribute_type',
                        'value_text',
                        'value_integer',
                        'value_date'
                    ]);

            //console.log(productDB);
            // сворення масиву значень продукту
            productDB.forEach(i => {
                let arr = [];
                for (let value of Object.values(i)) {
                    if (typeof value === 'string') {
                        arr.push(value.trim())
                    } else {
                        arr.push(value)
                    }
                }
                allValuesProdDb.push(arr);
            });

            //вирізаєм властивості для таблиці продуктс
            let valuesProductDb = allValuesProdDb[0].slice(0, 5);

// створюєм обєкт для обновлення виду product update { product_name: 'HT5500', id_brand: 140 }
console.log(productsValueFront)
            console.log(valuesProductDb)

            for (let p = 0; p < productsValueFront.length; p++) {
                for (let b = 0; b < valuesProductDb.length; b++) {
                    for (let k = 0; k < productsKeyFront.length; k++) {
                        if (p === b && p === k && productsValueFront[p] !== valuesProductDb[b]) {
                            productUpdate[productsKeyFront[k]]= productsValueFront[p];
                        }
                    }
                }
            }

            console.log('product update', productUpdate);

            if (Object.keys(productUpdate).length !== 0) {
                await trx('products').where({'id': id}).update(productUpdate);
            }


// вирізаю з дані attribute_name', 'attribute_type' з бази даних і створюю масив
            allValuesProdDb.forEach(item => {
                let arr = [];
                arr = item.slice(5, 10);
                let arrr = arr.filter(i => {
                    if (i!=='null'){
                        return i
                    }
                });
                valuesAttributeDb.push([arrr[0], [arrr[1], arrr[2]]]);
            });


           attribute.forEach(item => {
               let arr = [];
               Object.values(item).map( (i, index) => {
                   arr[index] = i
               });
               attributeFr.push([arr[0], [arr[1], arr[2]]])
           });


            let mapDb = new Map(valuesAttributeDb);
            let mapFront = new Map(attributeFr);


            for (let [key, value] of mapFront.entries()) {
                if (mapDb.has(key)) {

                    let set = new Set(value);
                    mapDb.get(key).forEach(item => {
                        set.add(item)
                    });

                    if (set.size > 2) {
                        toUpdate.push({
                            attribute_name: key,
                            attribute_type: value[0],
                            value: value[1],
                            id_products: id
                        })
                    }
                }
                if (!mapDb.has(key)) {
                    toInsert.push({
                        attribute_name: key,
                        attribute_type: value[0],
                        value: value[1],
                        id_products: id
                    })
                }
            }
            for (let [key, value] of mapDb.entries()){
                if (!mapFront.has(key)){
                    toDelete.push({
                        attribute_name: key,
                        id_products: id
                    })
                }
            }


            console.log('to up', toUpdate);
            console.log('to insert ', toInsert);
            console.log('to del', toDelete);

            for (let item of toDelete) {
            await trx('product_attribute')
                .where(item)
                .del()
            }
            for (let item of toUpdate){
                let data = Object.assign({}, item);
                delete data['value'];

                let idAttribut = await trx('product_attribute')
                    .where({'attribute_name': data['attribute_name']})
                    .andWhere({'id_products': id})
                    .update(data, 'id');
                item['id_product_attribute'] = idAttribut[0];
                let att = getData(item);
                await trx('attribute_value').where({'id_products': id})
                    .andWhere({'id_product_attribute': item['id_product_attribute']})
                    .update(att).transacting(trx);

            }
            for (let item of toInsert){

                let data = Object.assign({}, item);
                delete data['value'];

                let idAttribut = await this.knex('product_attribute')
                    .insert(data, 'id')
                    .transacting(trx);
                item['id_product_attribute'] = idAttribut[0];

                let val = getData(item);
                await this.knex('attribute_value').insert(val).transacting(trx);
            }

        });

    }

}




module.exports = ProductTransaction;