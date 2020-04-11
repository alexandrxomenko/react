const serviceLocator = require('../services/service.locator');


class BaseModel {

    constructor(tableName, primaryKeyName = 'id') {
        this.table = serviceLocator
            .get('db')
            .table(tableName);
        this.primaryKey = primaryKeyName;
        this.tableName = tableName;
    }

    async getList() {
        let list = await this.table.select('*');
        if (typeof list !== "undefined" && list.length) {
            return list;
        }else{
            return {code: 204}
        }
    }

    find(id) {
        return this.table.select('*')
            .where(id)
            .first()
    }

    async delete(id) {
        let idDel = await this.table.where (id)
            .del('id');
        if (typeof idDel !== "undefined" && idDel.length){
            return {code: 204}
        }else{
            return {code: 404, message: 'not Found'}
        }

    }

    async create(data) {
        let id = await this.table
            .insert(data, 'id');
        console.log('id', id);
        if (typeof id !== "undefined" && id.length){
            return {code: 201}
        }else{
            return {code: 400, message: 'not created'}
        }
    }

    store(id, data) {
        return this.table.where(id)
            .update(data, 'id')
    }

    update(data){

        let buffer = {...data};
        if(!buffer[this.primaryKey]){
            return false;
        }
        const id = buffer[this.primaryKey];
        delete buffer[this.primaryKey];
        return this.table.where(this.primaryKey, id).update(data)
    }

    createWithTransaction(data, trx, ...params) {
        return trx.insert(data, ...params).into(this.tableName);
    }


}

module.exports = BaseModel;