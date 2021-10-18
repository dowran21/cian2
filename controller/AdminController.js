const database = require("../db/index.js")
const {status} = require('../utils/status')

const AddSpecification = async (req, res) =>{
    /*************************************** 
{
      "absolute_name":"type of telephon line",
      "is_required" : "FALSE",
      "is_multiple" : "FALSE",
      "translations" : [
          {"lang_id" : "1", "name" : "Telefon liniyanyn gornusi"}, 
          {"lang_id" : "2", "name" : "Виды телефонной линии"}
          ],
      "absolute_values" :["ADSL", "FIBEROPTIC", "LAN"],
      "values_translations" : [ 
          [{"lang_id" : "1", "name" : "ADSL"}, {"lang_id" : "2", "name" : "АДСЛ"}], 
          [{"lang_id" : "1", "name" : "optiki Suyum"}, {"lang_id" : "2", "name" : "Оптоволокно"}], 
          [{"lang_id" : "1", "name" : "LAN"}, {"lang_id" : "2", "name" : "LAN"}] ]
    }
      *********************************************************/
    const {absolute_name, is_required, is_multiple, translations, absolute_values, values_translations} = req.body 
    console.log("I am in controller")
    let spec_values = ``

    for (let i=0; i<absolute_values.length; i++){
        spec_values += `, insert_value${i} AS (
                INSERT INTO specification_values (spec_id, absolute_value)
                    VALUES ((SELECT id FROM inserted), '${absolute_values[i]}') RETURNING id
        )`
        if (values_translations && values_translations.length){
            let value_translation = values_translations[i]
            spec_values += `, insert_val_trans${i} AS (
                INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                    VALUES 
                        ${value_translation.map(item => `('${item.name}', ${item.lang_id}, (SELECT id FROM insert_value${i}))`)}
            )`
        }
    }
    const query_text = `
            WITH inserted AS (
                INSERT INTO specifications (absolute_name, is_required, is_multiple) 
                    VALUES ($1, $2, $3) RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES 
                    ${translations.map(item =>`('${item.name}', ${item.lang_id}, (SELECT id FROM inserted))`).join(',')} 
            )${spec_values} SELECT id FROM inserted
        `
    try {
        console.log(query_text)
        const {rows} = await database.query(query_text, [absolute_name, is_required, is_multiple ])
        return res.json("You have added succesfully")
    } catch (e) {
        console.log(e)
        throw e
    }

}

const GetSpecificationByID = async (req, res)=>{

    const {id} = req.params
    const query_text = `    
        SELECT spec.id, spec.absolute_name, 
            
            (SELECT json_agg(translation) FROM 
                (SELECT st.language_id, st.name 
                    FROM specification_translations st WHERE st.spec_id = spec.id 
                )translation) AS translations, 
            
            (SELECT json_agg(value) FROM (
                SELECT sv.id, sv.absolute_value,
                    (SELECT json_agg(value_translation) FROM 
                        (SELECT svt.language_id, svt.name 
                        FROM specification_value_translations svt 
                        WHERE svt.spec_value_id = sv.id
                    )value_translation) AS value_translations
                FROM specification_values sv WHERE sv.spec_id = spec.id
                )value) AS values 

        FROM specifications spec WHERE spec.id = ${id}`

    try {
        const {rows} = await database.query(query_text, [])
        console.log(rows)
        return res.json(rows)
    } catch (e) {
        
    }

} 

const GetAllSpecifications = async (req, res)=>{
    const {page, limit} = req.query
    let offset = ``
    if (page && limit){
        offset = `OFFSET ${limit*page} LIMIT ${limit}`
    }else{
        offset = ``
    }
    try{
        const query_text = `
            SELECT 
                (SELECT COUNT(*) FROM specifications ) AS count,
                
                (SELECT json_agg(specification) FROM (
                    SELECT id, absolute_name, name 
                    FROM specifications 
                        INNER JOIN specification_translations 
                            ON specifications.id = specification_translations.spec_id 
                    WHERE language_id = 1 ${offset})specification) AS specifications`
        const {rows} = await database.query(query_text, [])
        
        return res.json({"rows":rows})
    }catch(e){
        console.log(e)
        throw e
    }
}

const GetAllTypes = async (req, res) =>{
    try{
        const query_text = `
        SELECT types.id, types.main_type_id, absolute_name, 
            (SELECT json_agg(translation) FROM (
                SELECT language_id, name FROM type_translations tp 
                WHERE tp.type_id = types.id
            )translation) AS translations  
        FROM types; 
        `
        const {rows} = await database.query(query_text, [])
        return res.json({"rows":rows})
    }catch(e){
        console.log(e)
        throw e;
    }
}

const AddType = async (req, res) =>{
    /***********************************
     {
        "absolute_name" : "Kakoy_to",
        "main_type_id" : null,
        "translations" : [{"language_id":1, "name" : "bir zat"}, 
        {"language_id":2, "name" : "cto to"}],
        "categories" : [1, 2]
    }
     *****************************************/
    const body = req.body
    const translations = body.translations
    const categories = body.categories
    try {
        const query_text = `
            WITH inserted AS ( 
                INSERT INTO types(absolute_name, main_type_id) VALUES ($1, $2) RETURNING id
            ), inserte AS (
                INSERT INTO type_translations(name, language_id, type_id) 
                VALUES 
                ${translations.map(item => `('${item.name}', ${item.language_id}, (SELECT id FROM inserted))`).join(',')}
            ) INSERT INTO ctypes(category_id, type_id) 
            VALUES ${categories.map(item => `(${item}, (SELECT id FROM inserted))`)}
            `
        const {rows} = await database.query(query_text, [body.absolute_name, body.main_type_id])
        return res.json({"message":"Added"})
    }catch(e){
        console.log(e)
        return res.json({"message":"Not succesfully"})
    }
}

const GetTypeByID = async (req, res) =>{
    const {id} = req.params
    console.log(id)
    const query_text = `
            SELECT absolute_name, 
                
                (SELECT json_agg(translation) FROM (
                    SELECT name, language_id FROM type_translations
                )translation) AS translations 
            
            FROM types  
        `
    try{
        const {rows} = await database.query(query_text, [])
        return res.json({"rows":rows})
    }catch(e){
        console.log(e)
        throw e
    }
} 

const AddSpecificationToType = async (req, res) =>{

    const {type_id} = req.params
    const {specifications} = req.body
    console.log(specifications)

    try{
        const query_text = `
                INSERT INTO type_specifications (type_id, spec_id) VALUES 
                    ${specifications.map(item => `(${type_id}, ${item})`).join(',')}
            `
        console.log(query_text)
        const {rows} = await database.query(query_text, [])
        return res.json({"message" : "You have succesfully added specificatons"}) 
    }catch(e){
        console.log(e)
        throw e;
    }
}

const AddPaperType = async (req, res) =>{
    /*******************************
    req body hsould be like this  
    {
        "absolute_name" : "articles",
        "translations" : [
            {"lang_id":1, "name":"Makalalar"},
            {"lang_id":2, "name":"Статьи"}
        ]
    }
     ********************************/
    const {absolute_name, translations} = req.body


    const query_text = `
        WITH inserted AS
            (INSERT INTO paper_type(absolute_name) VALUES ('${absolute_name}') RETURNING id
        ) INSERT INTO paper_type_translations(language_id, name, paper_type_id)
            VALUES 
                ${translations.map(item =>`(${item.lang_id}, '${item.name}', (SELECT id FROM inserted))`).join(',')}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.json({"messages":rows})
    } catch (e) {
        console.log(e)
        throw e;        
    }

}

const AddPaper = async (req, res) =>{
    /************
    {
        "paper_type_id":
        "absolute_name":"some name"
        "name_translations":[
            {"lang_id":1, "name":"habaryn yada artiklyn ady"},
            {"lang_id":2, "name":"Имя новости или артикла"}],
        "descriptions" : [
            {"lang_id":1, "name":"habaryn ozi shona degishli tekst ozem caksiz goylan"},
            {"lang_id":2, "name":"Собственно и есть сама новость и что хочешь можно делать"}]
    }
    
    ******************/
    const {paper_type_id, absolute_name, name_translations, descriptions} = req.body
    let imagePart=``
    if (req.file){
        const destination = req.file.path
        imagePart = `
            , insertImage AS(
                INSERT INTO paper_image (paper_name_id, destination) VALUES ((SELECT id FROM inserted), '${destination}'))
        `
    }
    const query_text = `
        WITH inserted AS (
            INSERT INTO paper_name(absolute_name, paper_type_id) VALUES ($1, $2) RETURNING id
        )${imagePart}, 
        insertNameTranslations AS(
            INSERT INTO paper_name_translations(paper_name_id, language_id, name) 
                VALUES
                    ${name_translations.map(item => `((SELECT id FROM inserted), ${item.lang_id}, '${item.name}')`).join(',')}
        ) INSERT INTO paper_descriptions(paper_name_id, language_id, description) 
            VALUES
                ${descriptions.map(item =>`((SELECT id FROM inserted), ${item.lang_id}, '${item.description}')`).join(',')}
    `
    try {
        const {rows} = await database.query(query_text, [absolute_name,paper_type_id])
        return res.json({"message":"You have added succesfully"})
    } catch (e) {
        console.log(e)
        throw e
    }

}

const UpdateRealEstate = async (req, res) =>{
    const {id} = req.params
    const {is_active, status_id} = req.body

    const query_text = `
                UPDATE TABLE real_estates 
                    SET is_active = $1, status_id = $2
                WHERE real_estates.id = $3
        `
    try {
        const {rows} = await database.query(query_text, [is_active, status_id, id])
        return res.json({"message":"Updated"})
    } catch (e) {
        console.log(e)
        return res.json({"message":"Not updated"})
    }
}

const ActivateRealEstateImages = async (req, res) =>{
    const {id, is_active} = req.body

    const  query_text = `
        UPDATE real_estate_images 
            SET is_active = $2
        WHERE id = $1
        `   
    try {
        const {rows} = await database.query(query_text, [id, is_active])
        return res.status(200).json(true)
    } catch (e) {
        console.log(e)
        return res.status(400).json(false)
    }
}

const ActivateRealEstateDescriptions = async (req, res)  =>{
    const {id} = req.params
    const {is_active} = req.body
    
    const query_text = `
            UPDATE real_estate_translations
                SET is_active = $1
            WHERE id = $2
        `
    try {
        const {rows} = await database.query(query_text, [is_active, id])
        return res.status(200).json(true)
    } catch (e) {
        console.log(e)
        return res.status(400).json(false)
    }
}

const AddToVIP = async (req, res) =>{
    const {id} = req.params
    const {vip_id} = req.body
    let days = 0
    try {
        const query_text = `SELECT days FROM vip_types WHERE id = ${vip_id}`
        const {rows} = await database.query(query_text, [])
        days = rows[0].days
    } catch (e) {
        console.log(e)
        return res.json({"message":"Not Succesfully"})        
    }
    const query_text = `
        INSERT INTO vip_real_estates(real_estate_id, vip_dates, vip_type_id) 
        VALUES(
            ${id}, 
                tsrange(
                    localtimestamp,
                    localtimestamp + INTERVAL '${days} DAY',
                    '[]'
                ),
            ${vip_id}
        ) 
    `
    try {
        await database.query(query_text, [])
        return res.json({"message":"Succesfully added"})
    } catch (e) {
        console.log(e)
        return res.json({"message":"Something went wrong"})
    }
}

const AddLocation = async (req, res) =>{
    /************************
     {
         "absolute_name":"11 mikrayon",
         "main_location_id":null or can be welayat or 1 or 2 or 3
         "translations":[
             {"lang_id" : "1", "name" : "11 kici etrapca"},
             {"lang_id" : "2", "name" : "11 микрорайон"},
         ]
     }
     *******************************************/
    const {absolute_name, main_location_id, translations} = req.body
    
    const query_text = `
        WITH inserted AS (
            INSERT INTO locations(absolute_name, main_location_id)
             VALUES ($1, $2) RETURNING id
        ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
            ${translations.map(item => `('${item.name}', ${item.lang_id}, (SELECT id FROM inserted))`)}
    `
    try {
        const {rows} = await database.query(query_text, [absolute_name, main_location_id])
        return res.json({"message":"You have added succesfully"})
    } catch (e) {
        console.log(e)
        return res.json({"message":"wasnt added sorry"})
    }
}

const AddAdvertisement = async (req, res) =>{
    /************
     "absolute_title":"something like this",
     "validity" : {"start_time":"2021-20-11 14:30", "end_time":"something like first" }
     "advertisement_type_id": 1 or 2 or 3 or 3,
     "advertisement_level_id": 1 or 2 or 3 or 4,
     "translations":[
        {"language_id":1, "title_translation":"Titlyn terjimesi", "description":"Shu reklamanyn dushundirisi"},
        {"language_id":2, "title_translation":"Titlyn perewody", "description":"obyasneniye reklamy cto hotite to i delayte"}
     ]
     *************/
    console.log("Hi i am here")
    const {absolute_title, validity, advertisement_type_id, advertisement_level_id, translations} = req.body
    const query_text = `
        WITH inserted AS (
            INSERT INTO advertisements(absolute_title, validity, advertisement_type_id, advertisement_level_id)
                VALUES( $1, '[${validity.start_time}, ${validity.end_time}]', $2, $3) RETURNING id 
        ), insert_translations AS(INSERT INTO advertisement_translations(advertisement_id, language_id, title_translation, description) 
            VALUES ${translations.map(item => `(
                (SELECT id FROM inserted), ${item.language_id}, '${item.title_translation}', '${item.description}'
                )`).join(',')}) SELECT id FROM inserted
    `
    try {
        const {rows} = await database.query(query_text, [absolute_title, advertisement_type_id, advertisement_level_id ]) 
        return res.json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        throw e
    }

}

const AddAdvertisementImage = async (req, res) =>{
    const {id} = req.params
    const files = req.files
    if (req.files.length){
        const query_text = `
            INSERT INTO advertisement_files(file_type_id, advertisement_id, destination)  
                VALUES ${files.map(item => `(1,  ${id}, '${item.path}')`).join(',')}
        `
        try {
            const {rows} = await database.query(query_text,  [])
            return res.status(200).json({"message":"Added succesfully"})
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    return res.json({"message":"no files"})
}

const AddAdvertisementBanner = async (req, res) =>{
    const {id} = req.params
    const file_path = req.file.path 
    const query_text = `
        INSERT INTO advertisement_files(file_type_id, advertisement_id, destination)  
        VALUES (2, ${id}, '${file_path}')
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.json({"message":"Succesfully"})
    } catch (e) {
        
    }
}

const AddPanoramicImages = async (req, res) =>{
    const {id} = req.params
    const files = req.files
    if (files){
        const query_text = `
            INSERT INTO real_estate_images (real_estate_id, is_active, destination, file_type_id)
                VALUES ${files.map(item =>`(${id}, 'true', '${item.path}', 3)`)}
            `
        try {
            console.log(query_text)
            await database.query(query_text, [])
            return res.json({"message":"Succesfully"})
        } catch (e) {
            console.log(e)
            throw e
        }
    }else{
        return res.json({"message":"Something went wrong"})
    }
}

const GetDeactivatedImages = async (req, res) =>{
    const query_text = `
        SELECT rei.id, rei.destination, rei.real_estate_id 
        FROM real_estate_images rei 
            WHERE rei.is_active IS NULL
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(200).json(rows)
    } catch (e) {
        console.log(e)
        return res.status(status.bad).json({"message":"Something went worng"})
    }
}

const GetDeactivatedDescriptions = async (req, res) =>{
    const query_text = `
        SELECT ret.id, ret.description
        FROM real_estate_translations ret 
        WHERE ret.is_active IS NULL
    `
    try{
        const {rows} = await database.query(query_text, []);
        console.log(rows)
        return res.status(200).json(rows)
    }catch (e){
        console.log(e)
        return res.json({"message":"no no no"})
    }
}


module.exports = {
    AddSpecification,
    GetSpecificationByID,
    GetAllSpecifications,
    GetAllTypes,
    AddType,
    GetTypeByID,
    UpdateRealEstate,
    AddSpecificationToType,
    AddPaperType,
    AddPaper,
    ActivateRealEstateImages,
    ActivateRealEstateDescriptions,
    AddToVIP,
    AddLocation,
    AddAdvertisement,
    AddAdvertisementImage,
    AddAdvertisementBanner,
    AddPanoramicImages,
    GetDeactivatedImages,
    GetDeactivatedDescriptions  
    // RealEstates
}