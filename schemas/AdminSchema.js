const Joi = require('joi')

const Schema = {
    AddOperator:Joi.object({
        full_name:Joi.string().min(3).max(140).label("Full name").required("{#label} is required").messages({
            'is_empty':"{#label} bos bolmaly dal",
            'string.min':"{#label} minimum 3 sany bolmaly",
            'string.max':"{#label} maksimum 150 sany bomaly"
        }),
        email: Joi.string().email().min(1).max(100).required().label('Email').messages({
            'string.pattern.base': '{#label} неправильный',
            'string.email': `{#label} непраильный!`,
            'string.min': `{#label} должен состоять минимум из {#limit} сомволов!`,
            'string.max': `{#label} должен состоять максимум из {#limit} сомволов`,
        }),
        phone:Joi.string().min(8).max(8).label("phone number").required().messages({
            'any.required':"{#label} телефон обязателень"
        }),
        password: Joi.string().min(8).max(200).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label('Açar söz').messages({
            'string.pattern.base': '{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly',
            'string.base': `{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly`,
            'string.empty': `{#label} boş bolmaly däl`,
            'string.min': `{#label} azyndan {#limit} harp bolmaly`,
            'any.required': `{#label} hökman gerek`,
        }),
    }),
    UpdateOperator:Joi.object({
        full_name:Joi.string().min(3).max(140).label("Full name").required("{#label} is required").messages({
            'is_empty':"{#label} bos bolmaly dal",
            'string.min':"{#label} minimum 3 sany bolmaly",
            'string.max':"{#label} maksimum 150 sany bomaly"
        }),
        email: Joi.string().email().min(1).max(100).label('Email').messages({
            'string.pattern.base': '{#label} talaba laýyk däl!',
            'string.email': `{#label} talaba laýyk däl!`,
            'string.min': `{#label} azyndan {#limit} simwol bolmaly!`,
            'string.max': `{#label} maksimum {#limit} simwol bolmaly!`,
        }),
        phone:Joi.string().min(8).max(8).label("phone number").required().messages({
            'any.required':"{#label} hokman gerek"
        }),
        id:Joi.number().required(),
    }),

    ChangePassword:Joi.object({
        password: Joi.string().min(8).max(200).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label('Açar söz').messages({
            'string.pattern.base': '{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly',
            'string.base': `{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly`,
            'string.empty': `{#label} boş bolmaly däl`,
            'string.min': `{#label} azyndan {#limit} harp bolmaly`,
            'any.required': `{#label} hökman gerek`,
        }),
    }),

    AddSpecification: Joi.object({
        is_required:Joi.boolean().required(),
        is_multiple:Joi.boolean().required(),
        translation_tm:Joi.string().required().min(3).max(150),
        translation_ru:Joi.string().required().min(3).max(150),
        value_translations:Joi.array().items(Joi.object({
            name_ru:Joi.string().min(1).max(150),
            name_tm:Joi.string().min(1).max(150),
        })),
    }),

    AddSpecificationValue: Joi.object({
        value_translations:Joi.array().items(Joi.object({
            name_ru:Joi.string().min(1).max(150),
            name_tm:Joi.string().min(1).max(150),
        })),
    }),

    AddSpecToType: Joi.array().required().items(Joi.object({
        spec_id: Joi.number().min(1).required(),
        position: Joi.number().min(1).required()
    })),

    AddMainLocation: Joi.object({
        absolute_name:Joi.string().required(),
        translations:Joi.array().items(Joi.object({
            lang_id:Joi.number().required(),
            name:Joi.string().required()
        }))
    }),

    AddLocation:Joi.object({
        absolute_name:Joi.string().required(),
        main_location_id: Joi.number().required(),
        translations:Joi.array().items(Joi.object({
            lang_id:Joi.number().required(),
            name:Joi.string().required()
        }))
    }),

    IdSchema:Joi.object({
        id:Joi.number().min(1).required()
    }),
}

module.exports = Schema