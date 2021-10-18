const Joi = require('joi')

const Schema = {
    Real_estate:Joi.object({
        type_id:Joi.number().required().label('type').messages({
            'number.base':'{#label} is not correct',
            'any.required':'{#label} is required',
        }),
        category_id:Joi.number().required().label('category').messages({
            'number.base':'{#label} is not correct',
            'any.required':'{#label} is required',
        }),
        phone:Joi.number().required().label('Telephone number').min(10000000).max(99999999).messages({
            'number.base':'{#label} is not correct',
            'any.required':'{#label} is required',
            'number.string':'must be min 8',
            'number.max':'must be max 8'
        }),
        location_id:Joi.number().label("location").messages({
            'number.base':"{#label} is not correct"
        }),
        area:Joi.number().required().max(9999999).label('area').messages({
            'number.base':'{#label} is not correct',
            'any.required':'{#label} is required',
        }),
        position: Joi.object({
            lat:Joi.number().min(-90).max(90),
            lng:Joi.number().min(-180).max(180),
            }).description("Please use correct position {lng, lat}"),
        price: Joi.number().required().max(99999999999).label('Baha').messages({
            'any.required':'{#label} is required',
            'number.base':'{#label} is not correct',
        }),
        descriptions: Joi.array().items(Joi.object({
                language_id:Joi.number().required().label('Dil sayla').messages({
                    'any.required':'{#label} is required'
                }),
                description: Joi.string().min(10).max(300).label('Description').messages({
                    'string.empty': `{#label} boş bolmaly däl`,
                    'string.min': `{#label} azyndan {#limit} harp bolmaly`,
                    'string.max': `{#label} iň köp {#limit} harp bolmaly`,
                    'any.required': `{#label} hökman gerek`,
                })
                })
        ),
        urgency : Joi.boolean().label("Urgency of real estate").description("urgency should be true or false"),
        specifications: Joi.array().items(Joi.object({
                id:Joi.number().required().label('Specification id').messages({
                    'any.required':'{#label} is required',
                }),
                is_required: Joi.boolean().required(),
                is_multiple: Joi.boolean().required(),
                values: Joi.array()
                    .when('is_required', {is:true, 
                        then : Joi.when('is_multiple', {is:true, then: Joi.array().required().min(1) }) })
                    .when('is_required', {is:true, 
                        then : Joi.when('is_multiple', {is:false, then: Joi.array().required().min(1).max(1) }) })
                    .when('is_required', {is:false, 
                        then : Joi.when('is_multiple', {is:true, then: Joi.array().min(0) }) })
                    .when('is_required', {is:false, 
                        then : Joi.when('is_multiple', {is:false, then: Joi.array().required().max(1) }) })
                }),
            )

    })
}

module.exports = Schema

// "ctype_id":5,
// "area":"5412",
// "position":"(4521562325, 45845712)",
// "status_id": 2,
// "price":45624862,
// "descriptions" : [{"language_id":1, "description":"something about this home what you need to know"},
//                 {"language_id":2, "description":"something about this home what you need to know, "}],
// "specifications":[{"id":251, "is_required":"TRUE/FALSE", "is_multiple":"TRUE/FALSE", "values":[]}] , 