const joi = require('joi');

const pid = joi.number().required();

exports.get_city_schema = joi.object({
    pid
})