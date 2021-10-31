const database = require("../db/index.js");
const {status} = require('../utils/status');
const AdminHelper = require('../utils/index.js');

const AdminLogin = async (req, res) =>{
    /******
     {
         "password":"61123141"
         "phone":61123141
     }
     *********/
    // console.log("I am in admin login controller")
    const {password, phone} = req.body
    const query_text = `
        SELECT * FROM users u WHERE u.phone = $1 AND role_id = 1
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.notfound).json(message)
        }
        const is_password_same = await AdminHelper.ComparePassword(password, user.password)
        if (!is_password_same){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.bad).json(message)
        }
        const data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        const access_token = await AdminHelper.GenerateAdminAccessToken(data)
        const refresh_token = await AdminHelper.GenerateAdminRefreshToken(data)
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Operation wasn't succesfully"})
    }
}

const AddOperator = async (req, res) =>{
    /*******
     {
         "full_name": "SOme full name of moderator",
         "email" : "ddowran2106@gmail.com",
         "phone":"61123141",
         "password":"somepasswordexample"
     }
     **********/
    const {full_name, email, phone, password} = req.body
    const hashed_password = await AdminHelper.HashPassword(password)
    const query_text = `
        INSERT INTO users(role_id, full_name, email, phone, password)
        VALUES ($1, $2, $3, $4, $5)
        `
    try{
        await database.query(query_text, [2, full_name, email, phone, hashed_password]);
        return res.status(status.success).send(true);
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
}

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
            )${spec_values} 
                SELECT id FROM inserted
        `
    try {
        const {rows} = await database.query(query_text, [absolute_name, is_required, is_multiple ])
        try{
            const qt = `
                SELECT id, absolute_name, name 
                FROM specifications 
                    INNER JOIN specification_translations 
                        ON specifications.id = specification_translations.spec_id 
                WHERE language_id = 1 AND id = ${rows[0].id}`
            const so = await database.query(qt, [])
            return res.status(status.success).json({"rows":so.rows[0]})
        }catch(e){
            console.log(e)
            return res.status(status.error).json({"Message":"Added but coudlnt show you"})
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
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

const AddMaintype = async (req, res) =>{
    /******
    {
        "absolute_name" : "Kakoy_to",
        "translations" : [{"language_id":1, "name" : "bir zat"}, 
        {"language_id":2, "name" : "cto to"}],
    }
    ***********************/
    const body = req.body
    const translations = body.translations
    try {
        const query_text = `
            WITH inserted AS ( 
                INSERT INTO types(absolute_name) VALUES ($1) RETURNING id
            ), inserte AS (
                INSERT INTO type_translations(name, language_id, type_id) 
                VALUES 
                ${translations.map(item => `('${item.name}', ${item.language_id}, (SELECT id FROM inserted))`).join(',')}
            ) SELECT id FROM inserted
            `
        const {rows} = await database.query(query_text, [body.absolute_name])
        return res.status(status.success).json({"id":rows[0].id})
    }catch(e){
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }


}

const AddType = async (req, res) =>{
    /***********************************
     {
        "absolute_name" : "Kakoy_to",
        "main_type_id" : 1,
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
            ), insert_ctype AS 
                (INSERT INTO ctypes(category_id, type_id) 
                VALUES ${categories.map(item => `(${item}, (SELECT id FROM inserted))`)})
                SELECT id FROM inserted
            `
        const {rows} = await database.query(query_text, [body.absolute_name, body.main_type_id])
        return res.status(status.success).json({"id":rows[0].id})
    }catch(e){
        console.log(e)
        return res.status(status.error).json({"message":e.message})
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
        return res.status(status.success).send(true) 
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
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

const AddMainLocation = async (req, res)=>{
    /************************
     {
         "absolute_name":"Ashgabat city",
         "translations":[
             {"lang_id" : "1", "name" : "Aşgabat"},
             {"lang_id" : "2", "name" : "Ашгабат"},
         ]
     }
     *******************************************/
     const {absolute_name, translations} = req.body
    
     const query_text = `
         WITH inserted AS (
             INSERT INTO locations(absolute_name)
              VALUES ($1) RETURNING id
         ) INSERT INTO location_translations(translation, language_id, location_id) VALUES
             ${translations.map(item => `('${item.name}', ${item.lang_id}, (SELECT id FROM inserted))`)}
     `
     try {
         const {rows} = await database.query(query_text, [absolute_name])
         return res.status(status.success).send(true)
     } catch (e) {
         console.log(e)
         return res.status(status.error).json({"message":"Error"})
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
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Error"})
    }
}



module.exports = {
    AddOperator,
    AdminLogin,
    AddSpecification,
    GetSpecificationByID,
    GetAllSpecifications,
    GetAllTypes,
    AddType,
    GetTypeByID,
    UpdateRealEstate,
    AddSpecificationToType,
    AddToVIP,
    AddMainLocation,
    AddLocation,
    AddMaintype,
}