const joi = require('joi')

const Schema = {
    CreateSpecification: joi.object({
        absolute_name:
        is_required:
        is_multiple:
        translations:
        absolute_values:
        value_translations:
    }),
}
"absolute_name":"type of telephon line",
      "is_reuquired" : "FALSE",
      "is_multiple" : "FALSE",
      "translations" : [
          {"lang_id" : "1", "name" : "Telefon liniyanyn gornusi"}, 
          {"lang_id" : "2", "name" : "Виды телефонной линии"}
          ],
      "absolute_values" :["ADSL", "FIBEROPTIC", "LAN"],
      "values_translations" : [ 
          [{"lang_id" : "1", "name" : "ADSL"}, {"lang_id" : "2", "name" : "АДСЛ"}], [{"lang_id" : "1", "name" : "optiki Suyum"}, {"lang_id" : "2", "name" : "Оптоволокно"}], 
          [{"lang_id" : "1", "name" : "LAN"}, {"lang_id" : "2", "name" : "LAN"}] ]