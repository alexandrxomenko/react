const BaseModel = require('./base.model');

class Brands extends BaseModel {
    constructor() {
        super('brands')
    }
}

module.exports = Brands;