const Joi = require('joi')

const Schema = {
    AddOperator:Joi.object({
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
        password: Joi.string().min(8).max(50).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().label('Açar söz').messages({
            'string.pattern.base': '{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly',
            'string.base': `{#label} Iň azyndan sekiz simwol, iň bolmanda bir harp we bir san bolmaly`,
            'string.empty': `{#label} boş bolmaly däl`,
            'string.min': `{#label} azyndan {#limit} harp bolmaly`,
            'any.required': `{#label} hökman gerek`,
        }),
    }),

    AddSpecification: Joi.object({
        absolute_name:Joi.string().min(3).max(250).required(),
        is_required:Joi.boolean().required(),
        is_multiple:Joi.boolean().required(),
        translations:Joi.array().items(Joi.object({
            lang_id:Joi.number().required(),
            name:Joi.string().required()
            })
        ),
        absolute_values:Joi.array().required(),
        value_translations:Joi.array().required(),
    }),

    AddSpecificationValue: Joi.object({
        absolute_value:Joi.string().required(),
        value_translations:Joi.array().items(Joi.object({
            lang_id:Joi.number().required(),
            name:Joi.string().required()
        }))
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