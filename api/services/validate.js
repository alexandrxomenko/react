const validator = require('validator');
const serviceLocator = require ('../services/service.locator');


module.exports = rules => async (req, res, next) => {

    const errors = [];

    for (let [field, fieldRules] of Object.entries(rules)) {

        const value = getValue(field, req.body);
        const error = {
            field: field,
            errors: []
        };

        const splittedFieldRules = fieldRules.split('|');

        for (let rule of splittedFieldRules) {

            const ruleDetails = rule.split(':');

            switch (ruleDetails[0]) {
                case 'required': {
                    if (!value) {
                        error.errors.push('required')
                    }
                    break
                }
                case 'min': {
                    const minValue = parseInt(ruleDetails[1], 10);
                    if (value.length < minValue) {
                        error.errors.push(`min: ${minValue}`)
                    }
                    break
                }
                case 'max': {
                    const maxValue = parseInt(ruleDetails[1], 10);
                    if (value.length > maxValue) {
                        error.errors.push(`max: ${maxValue}`)
                    }
                    break
                }
                case 'email': {
                    if (!validator.isEmail(value)) {
                        error.errors.push(`not email`)
                    }
                    break
                }
                case 'unique': {
                    let paramDB = ruleDetails[1].split('.');
                    let result = await serviceLocator.get('db').table(paramDB[0])
                        .select(paramDB[1]).where(paramDB[1], value).first();
                    if (result) {
                        error.errors.push(`email exist`)
                    }
                    break
                }

            }
        }

        if (error.errors.length) {
            errors.push(error);
        }
    }

    console.log(errors);

    if (errors.length) {
        return res.status(402).send({errors})
    }
    next()
};


const getValue = (field, data) => {
    const keys = field.split(".");
    let value = data;
    keys.forEach(key => {
        value = value[key];
    });

    return value;
};

