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
        owner_id:Joi.number().label("Type of owner").required("{#label} required").messages({
            'any.required':'{#label} is required'
        }),
        phone:Joi.number().required().label('Telephone number').min(10000000).max(99999999).messages({
            'number.base':'{#label} is not correct',
            'any.required':'{#label} is required',
            'number.string':'must be min 8',
            'number.max':'must be max 8'
        }),
        location_id:Joi.number().label("location").required("{#label} required").messages({
            'number.base':"{#label} is not correct"
        }),
        area:Joi.number().required("{#label} required").max(9999999).label('area').messages({
            'number.base':'{#label} is not correct',
            'any.required':'{#label} is required',
        }),
        position: Joi.object({
            lat:Joi.number().required("{#label} required").min(-90).max(90),
            lng:Joi.number().required("{#label} required").min(-180).max(180),
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

    }),

    Registration:Joi.object({
        full_name:Joi.string().min(3).max(140).label("Full name").required("{#label} is required").messages({
            'is_empty':"{#label} bos bolmaly dal",
            'string.min':"{#label} minimum 3 sany bolmaly",
            'string.max':"{#label} maksimum 150 sany bomaly"
        }),
        email: Joi.string().email().min(6).max(100).label('Email').messages({
            'string.pattern.base': '{#label} talaba laýyk däl!',
            'string.email': `{#label} talaba laýyk däl!`,
            'string.empty': `{#label} hökman gerek!`,
            'string.min': `{#label} azyndan {#limit} simwol bolmaly!`,
            'string.max': `{#label} maksimum {#limit} simwol bolmaly!`,
        }),
        phone:Joi.number().min(10000000).max(99999999).label("phone number").required().messages({
            'any.required':"{#label} hokman gerek"
        }),
        password: Joi.string().max(200).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label('Açar söz').messages({
            'string.pattern.base': '{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly',
            'string.base': `{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly`,
            'string.empty': `{#label} boş bolmaly däl`,
            'string.min': `{#label} azyndan {#limit} harp bolmaly`,
            'any.required': `{#label} hökman gerek`,
        }),
        owner_id:Joi.number().min(0).max(1).required().label("owner_id").messages({
            'any.required':"{#label} hokman gerek",
            'number.min':"{#label} dine 1 we 0 bolup biler",
            'number.min':"{#label} dine 1 we 0 bolup biler"
        }),
    })
}

module.exports = Schema
