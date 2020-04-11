const BaseModel = require('./base.model');

class Address extends BaseModel {
    constructor() {
        super('address')
    }

    find(item, data) {
        return this.table.select(item)
            .where('country', data.country)
            .andWhere('state', data.state)
            .andWhere('city', data.city)
            .andWhere('adres', data.adres)
            .first().then(function (result) {
                if(result) {
                    return result[item]
                }
                return null
            })

    }

}

module.exports = Address


