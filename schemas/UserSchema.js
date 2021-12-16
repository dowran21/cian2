const Joi = require('joi')
const { GetSpecForTypeSearch } = require('../controller/GuestController')

const Schema = {
    Real_estate:Joi.object({
        type_id:Joi.number().required().label('тип').messages({
            'number.base':'{#label} не правильный',
            'any.required':'{#label} обязательно нужен',
        }),
        category_id:Joi.number().required().label('категория').messages({
            'number.base':'{#label} категория неправильно',
            'any.required':'{#label} обязательна нужна',
        }),
        location_id:Joi.number().label("Локация").required("{#label} Обязателень").messages({
            'number.base':"{#label} локация неправильно"
        }),
        area:Joi.number().required("{#label} required").max(99999).label('площадь').messages({
            'number.base':'{#label} неправильный',
            'any.required':'{#label} is required',
        }),
        position: Joi.object({
            lat:Joi.number().required("{#label} обязательно").min(-90).max(90),
            lng:Joi.number().required("{#label} обязательно").min(-180).max(180),
            }).description("Пожалуйста используйте правильные {lng, lat}"),
        price: Joi.number().required().max(9999999999).label('Цена').messages({
            'any.required':'{#label} неправильно',
            'number.base':'{#label} это не число',
        }),
        description_tm: Joi.string().min(10).max(500).required().messages({
            'is_empty':"{#label} обязателень",
            'string.min':"{#label} минимум 10 символов",
            'string.max':"{#label} максимум 500 символов"
        }),
        description_ru: Joi.string().min(10).max(500).required().messages({
            'is_empty':"{#label} обязателень",
            'string.min':"{#label} минимум 10 символов",
            'string.max':"{#label} максимум 500 символов"
        }),
        specifications: Joi.array().items(Joi.object({
                id:Joi.number().required().label('Спецификация').messages({
                    'any.required':'{#label} Спецификация обязательно',
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
    Update_real_estate:Joi.object({
        location_id:Joi.number().label("Локация").required("{#label} Обязателень").messages({
            'number.base':"{#label} локация неправильно"
        }),
        area:Joi.number().required("{#label} required").max(99999).label('площадь').messages({
            'number.base':'{#label} неправильный',
            'any.required':'{#label} обязательно',
        }),
        position: Joi.object({
            lat:Joi.number().required("{#label} обязательно").min(-90).max(90),
            lng:Joi.number().required("{#label} обязательно").min(-180).max(180),
            }).description("Пожалуйста используйте правильные {lng, lat}"),
        price: Joi.number().required().max(9999999999).label('Цена').messages({
            'any.required':'{#label} неправильно',
            'number.base':'{#label} это не число',
        }),
        description_tm: Joi.string().min(10).max(500).required().messages({
            'is_empty':"{#label} обязателень",
            'string.min':"{#label} минимум 10 символов",
            'string.max':"{#label} максимум 500 символов"
        }),
        description_ru: Joi.string().min(10).max(500).required().messages({
            'is_empty':"{#label} обязателень",
            'string.min':"{#label} минимум 10 символов",
            'string.max':"{#label} максимум 500 символов"
        }),
        specifications: Joi.array().items(Joi.object({
                id:Joi.number().required().label('Спецификация').messages({
                    'any.required':'{#label} Спецификация обязательно',
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
        email: Joi.string().email().allow("").min(1).max(100).label('Email').messages({
            'string.pattern.base': '{#label} talaba laýyk däl!',
            'string.email': `{#label} talaba laýyk däl!`,
            'string.min': `{#label} azyndan {#limit} simwol bolmaly!`,
            'string.max': `{#label} maksimum {#limit} simwol bolmaly!`,
        }),
        phone:Joi.string().min(8).max(8).label("phone number").required().messages({
            'any.required':"{#label} hokman gerek"
        }),
        password: Joi.string().min(8).max(200).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label('Açar söz').messages({
            'string.pattern.base': '{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly',
            'string.base': `{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly`,
            'string.empty': `{#label} boş bolmaly däl`,
            'string.min': `{#label} azyndan {#limit} harp bolmaly`,
            'any.required': `{#label} hökman gerek`,
        }),
        owner_id:Joi.number().min(1).max(2).required().label("owner_id").messages({
            'any.required':"{#label} hokman gerek",
            'number.min':"{#label} dine 1 we 0 bolup biler",
            'number.min':"{#label} dine 1 we 0 bolup biler"
        }),
    }),

    Login:Joi.object({
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
    }),

    RealEstateFilter:Joi.object({
        location_id: Joi.number().allow("").label("Yerleshyan yeri").messages({
            'number.pattern.base':"it hsould be a number"
        }).allow(""),
        type_id: Joi.number().label("Yerleshyan yeri").messages({
            'number.pattern.base':"it hsould be a number"
        }).allow(""),
        main_type_id: Joi.number().label("Yerleshyan yeri").messages({
            'number.pattern.base':"it hsould be a number"
        }).allow(""),
        category_id: Joi.number().label("Yerleshyan yeri").messages({
            'number.pattern.base':"it should be a number"
        }).allow(""),
        price:Joi.string().allow(""),
        area:Joi.string().allow(""),
        spec_values:Joi.string().allow(""),
        page:Joi.number().allow(""),
        limit:Joi.number().allow(""),
        owner_id:Joi.number().allow("")
    }),

    LangSchema:Joi.object({
        lang:Joi.string().min(2).max(2)
    }),

    IDSchema:Joi.object({
        id:Joi.number(),
        lang:Joi.string().min(2).max(2)
    }),
    
    TypeSchema:Joi.object({
        type_id:Joi.number()
    }),

    CategoryTypeSchema:Joi.object({
        type_id:Joi.number(),
        category_id:Joi.number(),
        lang:Joi.string().min(2).max(2)
    }),

    MainTypeSchema:Joi.object({
        main_type_id:Joi.number()
    }),
    MainTypeMult:Joi.object({
        main_id:Joi.number(),
        cat_id:Joi.number(),
        lang:Joi.string().min(2).max(2)
    })
}

module.exports = Schema
