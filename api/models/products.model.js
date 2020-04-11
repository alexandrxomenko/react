const BaseModel = require('./base.model');

class Product extends BaseModel {

    constructor() {
        super('products ')
    }

    async getList(){
      let products = await this.table.select(
           'categories.categorie_name',
           'products.product_name',
           'products.price',
           'products.quantity',
           'pa.attribute_name',
           'av.value_text',
           'av.value_integer',
           'av.value_date')
           .innerJoin('product_attribute as pa',
               'products.id', '=', 'pa.id_products')
           .innerJoin('attribute_value as av',
               'pa.id', '=', 'av.id_product_attribute')
           .innerJoin('categories',
               'categories.id', '=', 'products.id_categories')
           .innerJoin('brands',
               'products.id_brand', '=', 'brands.id');

        if (typeof products !== 'undefined' && products.length){
            return products
        }else{
            return {code: 204};
        }
    }
    async getListById(arrId){

        let products = await this.table.select(
            'categories.categorie_name',
            'products.product_name',
            'products.price',
            'products.quantity',
            'pa.attribute_name',
            'av.value_text',
            'av.value_integer',
            'av.value_date')
            .innerJoin('product_attribute as pa',
                'products.id', '=', 'pa.id_products')
            .innerJoin('attribute_value as av',
                'pa.id', '=', 'av.id_product_attribute')
            .innerJoin('categories',
                'categories.id', '=', 'products.id_categories')
            .innerJoin('brands',
                'products.id_brand', '=', 'brands.id')
            .whereIn('products.id', arrId);
        if (typeof products !== 'undefined' && products.length){
            return products;
        }else{
            return {code: 204};
        }
    }

    getListByID(Id, select) {

        return this.table.select(select)
            .innerJoin('product_attribute as pa',
                'products.id', '=', 'pa.id_products')
            .innerJoin('attribute_value as av',
                'pa.id', '=', 'av.id_product_attribute')
            .innerJoin('categories',
                'categories.id', '=', 'products.id_categories')
            .innerJoin('brands',
                'products.id_brand', '=', 'brands.id')
            .where('products.id', Id)

    }
   async getOneProduct(id) {
        let product = await this.table.select(
            'categories.categorie_name',
            'products.product_name',
            'products.price',
            'products.quantity',
            'pa.attribute_name',
            'av.value_text',
            'av.value_integer',
            'av.value_date')
            .innerJoin(
                'product_attribute as pa',
                'products.id',
                'pa.id_products')
            .innerJoin('attribute_value as av',
                'pa.id', '=', 'av.id_product_attribute')
            .innerJoin('categories',
                'categories.id', '=', 'products.id_categories')
            .innerJoin('brands',
                'products.id_brand', '=', 'brands.id')
            .where('products.id', id);

       if (typeof product !== 'undefined' && product.length){
           return product;
       }else{
          return {code: 204};
       }

    }
}

module.exports = Product;