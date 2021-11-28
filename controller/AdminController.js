const database = require("../db/index.js");
const {status} = require('../utils/status');
const AdminHelper = require('../utils/index.js');
const fs = require('fs');
// const { compareSync } = require("bcrypt");

const AdminLogin = async (req, res) =>{
    /******
     {
         "password":"61123141"
         "phone":61123141
     }
     *********/
    console.log("I am in admin login controller")
    const {password, phone} = req.body
    const query_text = `
        SELECT * FROM users u WHERE u.phone = $1
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            const message = {type:"manual", name:"phone", message:"Телефон или пароль неправильный"} 
            return res.status(status.notfound).json(message)
        }
        const is_password_same = await AdminHelper.ComparePassword(password, user.password)
        if (!is_password_same){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.bad).json(message)
        }
        let data = {}
        let access_token = ``;
        let refresh_token = ``
        if(user.role_id==1){
            data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
            access_token = await AdminHelper.GenerateAdminAccessToken(data)
            refresh_token = await AdminHelper.GenerateAdminRefreshToken(data)
        }
        if(user.role_id == 2){
            data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
            access_token = await AdminHelper.GenerateOperatorAccessToken(data)
            refresh_token = await AdminHelper.GenerateAdminRefreshToken(data)
        }
        if(user.role_id == 3){
            return res.status(499).json({"message":"Idi otsuda eto ne twoye mesto"})
        }
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Operation wasn't succesfully"})
    }
}

const LoadAdmin = async (req, res) =>{
    const user_id = req.user.id
    try {
        const {rows} = await database.query(`SELECT * FROM users WHERE id = ${user_id}`, [])
        const user = rows[0]
        const data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        let access_token = ``
        if(user.role_id == 1){
            access_token = await AdminHelper.GenerateAdminAccessToken(data);
        }
        if(user.role_id ==2){
            access_token = await AdminHelper.GenerateOperatorAccessToken(data);
        }
        // const refresh_token = await AdminHelper.GenerateAdminRefreshToken(data)
        return res.status(status.success).json({"access_token":access_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetOperators = async (req, res) =>{
    const {page, limit} = req.query
    const {search, phone, sort_direction, sort_column} = req.query
    let OffSet = ``
    if (page && limit) {
        OffSet = ` OFFSET ${(page)*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }
    let WherePart = ``
    if(search && search != 'null' && search != 'undefined'){
        WherePart += ` AND (full_name ~* '${search}' OR phone ~* '${search}')`
    }
    // if(phone && phone != 'null' && phone != 'undefined'){
    //     WherePart += ` AND phone = '${phone}'`
    // }

    let order_column = ``
    if(sort_column){
        order_column = sort_column;
    }else{
        order_column = ` id`
    }

    let order_direction = ``
    if(sort_direction){
        order_direction = sort_direction
    }else{
        order_direction = ` DESC`
    }

    
    let order_part = `ORDER BY ${order_column} ${order_direction}`

    const query_text = `
        SELECT
            (SELECT COUNT(*) 
                FROM users 
                WHERE role_id = 2 ${WherePart}),
            (SELECT json_agg(op) FROM (
                SELECT id, full_name, email, phone, deleted
                FROM users 
                    WHERE role_id = 2 ${WherePart}
                ${order_part}
                ${OffSet}
            )op) AS operators
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
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
        VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, phone, deleted
        `
    try{
        const {rows} = await database.query(query_text, [2, full_name, email, phone, hashed_password]);
        return res.status(status.success).json({"rows":rows[0]});
    }catch(e){
        console.log(e)
        if(e.message = 'duplicate key value violates unique constraint "users_phone_key"'){
            let message = {}
            message["phone"] = "Оператор с таким телефон уже был создан" 
            return res.status(409).send({error: message})
        }
        return res.status(status.error).send(false)
    }
}

const DeleteOperator = async (req, res) =>{
    const {id} = req.params
    const {deleted} = req.body
    const query_text = `UPDATE users SET deleted = ${deleted} WHERE id = ${id}`
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UpdateOperator = async (req, res) =>{
    /********
     {
         "full_name" = "something",
         "phone" = 61123141
         "email"="some@gmail.com"
     }
     ********/
    
    const {id} = req.params
    const {full_name, phone, email} = req.body
    const query_text = `
        UPDATE users SET full_name = $1, phone = $2, email= $3 WHERE id = $4 
            RETURNING id, full_name, email, phone, deleted
        `
    try {
        const {rows} = await database.query(query_text, [full_name, phone, email, id])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}

const ChangeOperatorPassword = async (req, res) =>{
    const {password} = req.body
    const {id} = req.params;
    const hashed_password = await AdminHelper.HashPassword(password)
    const query_text = `
        UPDATE users SET password = '${hashed_password}' WHERE users.id = ${id} 
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetDeletedOperators = async (req, res) =>{
    // const {id} = req.params
    const query_text = `
        SELECT id, full_name, email, phone FROM users WHERE role_id = 2 AND deleted = true
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const RecoveryOperator = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        UPDATE users SET deleted = false WHERE id = ${id}
    `
    try {
        const {rows} = await database
    } catch (e) {
        
    }
}

const AddSpecification = async (req, res) =>{
    /*************************************** 
{
        is_required: true,
        is_multiple: false,
        translation_tm: 'aaaaa',
        translation_ru: 'bbbbb',
        value_translations: [
            { name_ru: 'sdfsdafsd', name_tm: 'kerpic' },
            { name_ru: 'sdafaf', name_tm: 'sadfsadf' },
            { name_ru: 'sdfasfdf', name_tm: 'afasdfdsf' }
        ]

    }
      *********************************************************/
    const {translation_tm, translation_ru, is_required, is_multiple, value_translations} = req.body 

    console.log(req.body)
    let val_part = ``
    for(let i=0; i<value_translations.length; i++){
        val_part += `, inserted_val${i} AS(
            INSERT INTO specification_values (spec_id, absolute_value)
            VALUES ((SELECT id FROM inserted), '${value_translations[i].name_ru}') RETURNING id
        ), inseert_val_trans${i} AS (
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
            VALUES ('${value_translations[i].name_ru}', 2, (SELECT id FROM inserted_val${i})),
                ('${value_translations[i].name_tm}', 1, (SELECT id FROM inserted_val${i}))
            )`
    }

    const query_text = `
        WITH inserted AS (
            INSERT INTO specifications(absolute_name, is_required, is_multiple)
            VALUES ('${translation_ru}', ${is_required}, ${is_multiple}) RETURNING id
            ), insert_translations AS (
                INSERT INTO specification_translations(name, language_id, spec_id)
                    VALUES ('${translation_ru}', 2, (SELECT id FROM inserted)),('${translation_tm}', 1, (SELECT id FROM inserted))
               )${val_part}
                SELECT id FROM inserted
            `
    try {
        console.log(query_text)
        const {rows} = await database.query(query_text, [])
        try{
            const qt = `
                SELECT id, absolute_name, is_multiple, is_active, is_required,
                    (SELECT json_agg(tr) FROM(
                        SELECT language_id, name 
                        FROM specification_translations
                        WHERE spec_id = id 
                    )tr) AS translations   
                FROM specifications 
                WHERE  id = ${rows[0].id}`
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
            SELECT sv.id, sv.enable, svt.name AS name_tm, svtt.name AS name_ru
            FROM specification_values sv
                INNER JOIN specification_value_translations svt
                    ON svt.spec_value_id = sv.id AND svt.language_id = 1
                INNER JOIN specification_value_translations svtt
                    ON svtt.spec_value_id = sv.id AND svtt.language_id = 1
            WHERE sv.spec_id = ${id}
            ORDER BY sv.enable DESC

    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

} 

const SpecificationActivation = async (req, res) =>{
    const {id} = req.params
    const {is_active} = req.body
    const query_text = `
        UPDATE specifications SET is_active = ${is_active} WHERE id = ${id}
        `
    try {
        const {rows}= await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DisableEnableValue = async (req, res) =>{
    const {id} = req.params
    const {enable} = req.body
    const query_text = ` 
        UPDATE specification_values SET enable = ${enable} WHERE id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddSpecVal = async (req, res) =>{
    /*********************************
    
     value_translations: [
            { name_ru: 'sdfsdafsd', name_tm: 'kerpic' },
            { name_ru: 'sdafaf', name_tm: 'sadfsadf' },
            { name_ru: 'sdfasfdf', name_tm: 'afasdfdsf' }
        ]
    *****************************/
    const {id} = req.params
    const {value_translations} = req.body
    let val_trans_part = ``
    if (value_translations){
        val_trans_part = `, insert_val_trans(
            INSERT INTO specification_value_translations(name, language_id, spec_id)
            VALUES ${value_translations?.map(item =>`('${item.name}', ${item.lang_id}, SELECT id FROM inserted)`).join(',')}
        )`
    }
    for(let i=0; i<value_translations.length; i++){
        val_part = ` inserted${i} AS (
            INSERT INTO specification_values(spec_id, absolute_value) 
                VALUES (${id}, ${value_translations[i].name_ru})
        ), insert_val_trans${i} (
            INSERT INTO specification_value_translations(name, language_id, spec_id)
                VALUES ('${name}') 
        )`
    }
    const query_text = `
        WITH inserted AS (
            INSERT INTO specification_values(spec_id, absolute_value) 
            VALUES(${id}, ${absolute_value})
        ) ${val_trans_part} SELECT id FROM inserted
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(rows[0].id)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetAllSpecifications = async (req, res)=>{
    const {page, limit, sort_direction, sort_column} = req.query
    let offset = ``
    if (page && limit){
        offset = `OFFSET ${limit*page} LIMIT ${limit}`
    }else{
        offset = ``
    }
    const {search} = req.query
    let WherePart = ``
    if(search && search != null && search != undefined){
        WherePart += ` AND (stt.name ~* '${search}' OR st.name ~* '${search}')`

    }
    let direction = ``
    if(sort_direction){
        direction = `${sort_direction}`
    }else{
        direction = `ASC`
    }
    let column = ``
    if(sort_column){
        column = `${sort_column}`
    }else{
        column = `s.id`
    }
    let orderBy = `ORDER BY ${column} ${direction}`;
    console.log(WherePart)
    try{
        const query_text = `
            SELECT 
                (SELECT COUNT(*) FROM specifications ) AS count,
                
                (SELECT json_agg(specification) FROM (

                
                    SELECT s.id, s.absolute_name, s.is_multiple, s.is_required, is_active,
                    
                    (SELECT json_agg(tr) FROM(
                        SELECT language_id, name 
                        FROM specification_translations
                        WHERE spec_id = s.id 
                    )tr) AS translations  

                    FROM specifications s
                        INNER JOIN specification_translations st
                            ON st.spec_id = s.id AND st.language_id = 1
                        INNER JOIN specification_translations stt
                            ON stt.spec_id = s.id AND stt.language_id = 2
                    WHERE s.id>0 ${WherePart}  
                    ${orderBy}
                    ${offset})specification) AS specifications`
        const {rows} = await database.query(query_text, [])
        
        return res.status(status.success).json(rows[0])
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetAllTypes = async (req, res) =>{
    try{
        const query_text = `
        SELECT ct.name, ctp.id, tt.name AS main_type, t.absolute_name, cti.destination, 

            (SELECT json_agg(translation) FROM (
                SELECT language_id, name FROM type_translations tp 
                WHERE tp.type_id = t.id
            )translation) AS translations  
        
        FROM types t
            INNER JOIN types tp
                ON t.main_type_id = tp.id
            INNER JOIN type_translations tt
                ON tt.type_id = tp.id AND tt.language_id = 2
            INNER JOIN ctypes ctp
                ON ctp.type_id = t.id
            INNER JOIN category_translations ct 
                ON ct.category_id = ctp.category_id AND ct.language_id = 2
            LEFT JOIN ctype_image cti
                ON cti.ctype_id = ctp.id
        WHERE t.main_type_id IS NOT NULL
        ORDER BY t.id ASC
        `
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows})
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
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
                ${translations?.map(item => `('${item.name}', ${item.language_id}, (SELECT id FROM inserted))`).join(',')}
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
                VALUES ${translations?.map(item => `('${item.name}', ${item.language_id}, (SELECT id FROM inserted))`).join(',')}
            ), insert_ctype AS 
                (INSERT INTO ctypes(category_id, type_id) 
                VALUES ${categories?.map(item => `(${item}, (SELECT id FROM inserted))`)})
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
    // console.log(id)
    const query_text = `
            SELECT absolute_name, destination,
                
                (SELECT json_agg(translation) FROM (
                    SELECT name, language_id FROM type_translations
                )translation) AS translations,
                
                (SELECT json_agg(spec) FROM(
                    SELECT s.id AS spec_id, s.absolute_name, ts.id AS type_spec_id, ts.deleted, ts.queue_position,
                        (SELECT json_agg(tr) FROM (
                            SELECT st.name, st.language_id 
                            FROM specification_translations st
                            WHERE st.spec_id = s.id
                        )tr) AS spec_translations
                    
                    FROM specifications s
                        INNER JOIN type_specifications ts
                            ON ts.spec_id = s.id
                        WHERE ts.ctype_id = $1 AND ts.deleted = false 
                        ORDER BY ts.queue_position ASC
                )spec) AS active_type_specifications,
                
                (SELECT json_agg(spec) FROM(
                    SELECT s.id AS spec_id, s.absolute_name, ts.id AS type_spec_id, ts.deleted,
                        (SELECT json_agg(tr) FROM (
                            SELECT st.name, st.language_id 
                            FROM specification_translations st
                            WHERE st.spec_id = s.id
                        )tr) AS spec_translations
                    
                    FROM specifications s
                        INNER JOIN type_specifications ts
                            ON ts.spec_id = s.id
                        WHERE ts.ctype_id = $1 AND ts.deleted = true 
                )spec) AS deleted_type_specifications
            
            FROM types
                LEFT JOIN ctype_image cti
                    ON cti.ctype_id = $1
                INNER JOIN ctypes ctp
                    ON ctp.type_id = types.id
            WHERE ctp.id = $1
        `
    try{
        const {rows} = await database.query(query_text, [id])
        return res.status(status.success).json(rows[0])
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
} 

const GetNotContainedSpec = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT s.id AS spec_id, s.absolute_name,
            (SELECT json_agg(tr) FROM (
                SELECT st.name, st.language_id 
                FROM specification_translations st
                WHERE st.spec_id = s.id
            )tr) AS spec_translations

        FROM specifications s
            LEFT JOIN type_specifications ts
                ON ts.spec_id = s.id AND ts.ctype_id = ${id}
        WHERE ts.id IS NULL
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddSpecificationToType = async (req, res) =>{
    /**********
     "specifications":[{"spec_id":12, "position":1}, {"spec_id":13, "position":2} ]
     */
    const {ctype_id} = req.params
    const {specifications} = req.body

    try{
        const query_text = `
                INSERT INTO type_specifications (ctype_id, spec_id, queue_position) 
                VALUES ${specifications?.map(item => `(${ctype_id}, ${item.id}, ${item.position})`).join(',')}
            `
        // console.log(query_text)
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true) 
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteTypeSpecification = async (req, res) =>{
    const {ts_id} = req.params
    const {bool} = req.body
    const query_text = `
        UPDATE type_specifications SET deleted = ${bool} WHERE id = ${ts_id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
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
              VALUES ('${absolute_name}') RETURNING id
        ), insert_trans AS (
             INSERT INTO location_translations(translation, language_id, location_id) VALUES
             ${translations?.map(item => `('${item.name}', ${item.lang_id}, (SELECT id FROM inserted))`)}
        ) SELECT id FROM inserted
     `
     try {
         const {rows} = await database.query(query_text, [])
         try {
            const qt = `SELECT l.id, lt.translation AS name
            FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
            WHERE l.id = ${rows[0].id}`
            const k = await database.query(qt, [])
            const s = k.rows[0]
            return res.status(status.success).json({"rows":s})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
     } catch (e) {
         console.log(e)
         return res.status(status.error).json({"message":"Error"})
     }
}

const AddLocation = async (req, res) =>{ 
    /************************
     {
         "absolute_name":"11 mikrayon",
         "main_location_id": 3
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
        ), insert_trans AS (INSERT INTO location_translations(translation, language_id, location_id) VALUES
            ${translations?.map(item => `('${item.name}', ${item.lang_id}, (SELECT id FROM inserted))`)}
        ) SELECT id FROM inserted
        
        `
    try {
        const {rows} = await database.query(query_text, [absolute_name, main_location_id])
        try {
            const qt = `SELECT l.id, lt.translation AS name
            FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
            WHERE l.id = ${rows[0].id}`
            const k = await database.query(qt, [])
            const s = k.rows[0]
            return res.status(status.success).json({"rows":s})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Error"})
    }
}

const GetLocations = async (req, res) =>{
    const {lang} = req.params
    console.log("hello getlocations")
    const query_text = `
        SELECT l.id, lt.translation AS name
        FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
        WHERE l.main_location_id IS NULL
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(200).json({"rows":rows})
    } catch (e) {
        console.log(e)
        throw e
    }
}

const GetRegions = async (req, res) =>{
    console.log("hello getregions")
    const {id} = req.params
    const query_text = `
        SELECT l.id, lt.translation AS name
        FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1 
        WHERE l.main_location_id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(200).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.json(false)
    }
}

const UploadPageImages = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        INSERT INTO place_images(image_place_id, destination) VALUES($1, $2) RETURNING *
    `

    try {
        const {rows} = await database.query(query_text, [id, req.file.path])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetPageImages = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        SELECT id, destination FROM place_images WHERE image_place_id = ${id} 
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e);
        return res.status(status.error).send(false)
    }
}

const GetImagePlaces = async (req, res) =>{
    const query_text = `
        SELECT * FROM image_places
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteImagePlace = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        DELETE FROM place_images WHERE id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddTypeImage = async (req, res)=>{
    const {id} = req.params
    const query_text = `
        INSERT INTO ctype_image(ctype_id, destination) 
            VALUES($1, $2)
            ON CONFLICT (ctype_id) DO UPDATE SET destination = EXCLUDED.destination
    `
    try {
        await database.query(query_text, [id, req.file.path])
        const {rows} = await database.query(`SELECT destination FROM ctype_image WHERE ctype_id = ${id}`, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetTypes = async (req, res) =>{
    const query_text = `
        SELECT t.id, tt.name 
        FROM types t
            INNER JOIN type_translations tt
                ON tt.type_id = t.id
        WHERE t.main_type_id IS NULL
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetStatistics = async (req, res) =>{
    const {specification_values, location_id, type_id, category_id, price, area, start_date, end_date} = req.query
    let spec_part = ``
    let where_part = ``
    
    //--------------location part -----------------------//
    if (location_id && location_id !== 'null'){
        where_part += ` AND (lc.id = ${location_id} OR lc.main_location_id = ${location_id})`
    }

    //---------------------ctype part -----------------------//
    if (type_id !== 'null' && type_id){
        where_part += ` AND cp.type_id = ${type_id}` 
    }

    if (category_id && category_id !== 'null'){
        where_part += ` AND cp.category_id = ${category_id}` 
    }
    
    //-------------------specification part-----------------//
    if (specification_values?.length){
        spec_part += ` AND (${specification_values?.map(item =>`resv.spec_value_id = ${item}`).join('OR')})`      
    }
    
    //----------------area part--------------------//
    if (area?.min && area?.max){
        where_part += ` AND re.area > ${area.min}  AND re.are < ${area.max}`
    }else if(area?.min && !area?.max){
        where_part += ` AND re.area > ${area?.min}`
    }else if(!area?.min && area?.max){
        where_part += ` AND re.area < ${area.max}`
    }else{
        where_part +=``
    }
    
    //---------------price-----------------------//
    if (price?.min && price?.max){
        where_part += ` AND (rep.price > ${price.min} AND rep.are < ${price.max})`
    }else if(price?.min && !price?.max){
        where_part += ` AND rep.price > ${price.min}`
    }else if(!price?.min && price?.max){
        where_part += ` AND rep.price < ${price.max}`
    }else{
        where_part +=``
    }

    //---------------------dates-------------//
    if(start_date && end_date){
        where_part += ` AND re.created_at >= '${start_date}'::date AND re.created_at <= '${end_date}'::date`
    }else if(start_date && !end_date){
        where_part += ` AND re.created_at >= '${start_date}'::date`
    }else if(!start_date && end_date){
        where_part += ` AND re.created_at <= '${end_date}'::date`
    }else{
        where_part += ``
    }

    const query_text = `
        SELECT st.id, st.absolute_name,
        (SELECT COUNT(r.id) FROM
            (SELECT DISTINCT ON (re.id) re.id
                FROM real_estates re
                    INNER JOIN ctypes cp 
                            ON cp.id = re.ctype_id
                    INNER JOIN real_estate_prices rep 
                            ON rep.real_estate_id = re.id AND rep.is_active = 'true'
                    INNER JOIN locations lc 
                            ON lc.id = re.location_id
                    INNER JOIN real_estate_specification_values resv
                            ON resv.real_estate_id = re.id
                WHERE re.status_id = st.id ${where_part} ${spec_part}
            ) AS r
        )
        FROM statuses st

    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetPriceStatistics = async (req, res) =>{
    const {specification_values, location_id, type_id, category_id, price, area, start_date, end_date} = req.query
    let spec_part = ``
    let where_part = ``
    
    //--------------location part -----------------------//
    if (location_id && location_id !== 'null'){
        where_part += ` AND (lc.id = ${location_id} OR lc.main_location_id = ${location_id})`
    }

    //---------------------ctype part -----------------------//
    if (type_id !== 'null' && type_id){
        where_part += ` AND cp.type_id = ${type_id}` 
    }

    if (category_id && category_id !== 'null'){
        where_part += ` AND cp.category_id = ${category_id}` 
    }
    
    //-------------------specification part-----------------//
    if (specification_values?.length){
        spec_part += ` AND (${specification_values?.map(item =>`resv.spec_value_id = ${item}`).join('OR')})`      
    }
    
    //----------------area part--------------------//
    if (area?.min && area?.max){
        where_part += ` AND re.area > ${area.min}  AND re.are < ${area.max}`
    }else if(area?.min && !area?.max){
        where_part += ` AND re.area > ${area?.min}`
    }else if(!area?.min && area?.max){
        where_part += ` AND re.area < ${area.max}`
    }else{
        where_part +=``
    }
    
    //---------------price-----------------------//
    if (price?.min && price?.max){
        where_part += ` AND (rep.price > ${price.min} AND rep.are < ${price.max})`
    }else if(price?.min && !price?.max){
        where_part += ` AND rep.price > ${price.min}`
    }else if(!price?.min && price?.max){
        where_part += ` AND rep.price < ${price.max}`
    }else{
        where_part +=``
    }

    //---------------------dates-------------//
    // if(start_date && end_date){
    //     where_part += ` AND re.created_at >= '${start_date}'::date AND re.created_at <= '${end_date}'::date`
    // }else if(start_date && !end_date){
    //     where_part += ` AND re.created_at >= '${start_date}'::date`
    // }else if(!start_date && end_date){
    //     where_part += ` AND re.created_at <= '${end_date}'::date`
    // }else{
    //     where_part += ``
    // }

    const query_text = `
    SELECT  
        date_trunc('day', re.created_at), AVG(rep.price)
        FROM real_estates re
            INNER JOIN real_estate_prices rep
                ON rep.real_estate_id = re.id AND rep.is_active = true
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            INNER JOIN locations lc 
                    ON lc.id = re.location_id
            INNER JOIN real_estate_specification_values resv
                    ON resv.real_estate_id = re.id
        WHERE re.id > 0 AND re.created_at >= '${start_date}'::date AND re.created_at <= '${end_date}'::date  ${where_part} ${spec_part}
        GROUP BY date_trunc('day', re.created_at)
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetConfirmRealEstates = async (req, res) =>{
    const {page, limit} = req.query
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }

    const query_text = `
    WITH selected AS ( 

        SELECT re.id, rep.price, 
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                        END 
                    || lt.translation) AS location,
            (SELECT real_estate_name(re.id, l.id, tt.name, area)),
            
            (SELECT json_agg(dest) FROM (
                SELECT rei.destination FROM real_estate_images rei
                WHERE rei.real_estate_id = re.id AND rei.is_active = true
            )dest) AS images

            FROM real_estates re 
                INNER JOIN ctypes cp 
                    ON cp.id = re.ctype_id
                INNER JOIN real_estate_prices rep 
                    ON rep.real_estate_id = re.id AND rep.is_active = 'true'
                INNER JOIN languages l 
                    ON l.id = 2
                INNER JOIN type_translations tt 
                    ON tt.type_id = cp.type_id AND tt.language_id = l.id
                LEFT JOIN location_translations lt
                    ON lt.location_id = re.location_id AND lt.language_id = l.id
                LEFT JOIN locations lc 
                    ON lc.id = re.location_id
                LEFT JOIN location_translations ltt
                    ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
            WHERE re.is_active IS NULL AND re.status_id <> 2 AND re.status_id <> 4 AND (selected = 'false'
                OR (selected_time::tsrange @> localtimestamp IS NULL OR (NOT (selected_time::tsrange @> localtimestamp))))
            ORDER BY  re.updated_at DESC  
            LIMIT 15
        ), updated AS (
            UPDATE real_estates SET selected = true, 
                selected_time = tsrange (
                    localtimestamp,
                    localtimestamp + INTERVAL '1 SECOND'
                    '[]'
                ) WHERE id IN (SELECT id FROM selected)
        ) SELECT * FROM selected;   
        `
    try {
        const {rows} = await database.query(query_text, [])
        // console.log(rows)
        return res.status(status.success).json(rows)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ActivateRealEstate = async (req, res) =>{
    const {id} = req.params
    const {bool} = req.body
    const user_id = req.user.id
    const query_text = `
        WITH updated AS (
            UPDATE real_estates SET is_active = ${bool} WHERE id = ${id} RETURNING *
        ) INSERT INTO logs (user_id, event_type_id, table_id, data) 
            VALUES (${user_id}, 1, 1, 
                (SELECT json_build_object('id', id, 'is_active', is_active) FROM updated)
                )
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const RealestateByID = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT re.area, rep.price, re.area, vre.id AS VIP,
            re.created_at,
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location,
            real_estate_name($1, l.id, tt.name, area), u.phone, ott.translation AS owner_type,

            (SELECT json_agg(image) FROM (
                SELECT destination FROM real_estate_images rei
                WHERE rei.real_estate_id = $1 AND rei.is_active = 'true'
            )image) AS images, 

            (SELECT json_agg(specification) FROM(
                SELECT DISTINCT ON (resvv.spec_id) st.name, 
                
                    (SELECT json_agg(value) FROM(
                        SELECT sv.absolute_value, svt.name FROM specification_values sv
                            LEFT JOIN specification_value_translations svt
                                ON svt.spec_value_id = sv.id AND svt.language_id = l.id
                            INNER JOIN real_estate_specification_values resv 
                                ON resv.spec_value_id = sv.id
                        WHERE resv.real_estate_id = re.id AND sv.spec_id = st.spec_id
                    )value) AS values
                    
                FROM specification_translations st
                    INNER JOIN real_estate_specification_values resvv
                        ON resvv.spec_id = st.spec_id 
                WHERE st.language_id = l.id AND resvv.real_estate_id = $1 

            )specification) AS specifications

    FROM real_estates re
        INNER JOIN users u
            ON u.id = re.user_id
        INNER JOIN languages l 
            ON l.id = 2
        INNER JOIN owner_type_translations ott
            ON ott.owner_id = u.owner_id AND ott.language_id = l.id
        INNER JOIN ctypes ctp 
            ON ctp.id = re.ctype_id 
        LEFT JOIN vip_real_estates vre 
            ON vre.real_estate_id = re.id AND vip_dates:: tsrange @> localtimestamp
        INNER JOIN type_translations tt 
            ON tt.type_id = ctp.type_id AND tt.language_id = l.id
        LEFT JOIN real_estate_translations ret 
            ON ret.real_estate_id = re.id AND ret.language_id = l.id AND ret.is_active = true
        INNER JOIN real_estate_prices rep 
            ON rep.real_estate_id = re.id AND rep.is_active = true 
        LEFT JOIN location_translations lt
            ON lt.location_id = re.location_id AND lt.language_id = l.id
        LEFT JOIN locations lc 
            ON lc.id = re.location_id
        LEFT JOIN location_translations ltt
            ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
    WHERE re.id = $1 AND re.is_active IS NULL AND re.status_id <> 2 AND re.status_id <> 4
    `
    try {
        const {rows} = await database.query(query_text, [id])
        // console.log(rows)
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const NotActivatedEstates = async (req, res) =>{
    const query_text = `
        WITH selected AS ( 

            SELECT re.id, rep.price, 
                concat(
                    CASE 
                        WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                            END 
                        || lt.translation) AS location,
                (SELECT real_estate_name(re.id, l.id, tt.name, area)),
                
                (SELECT json_agg(dest) FROM (
                    SELECT rei.destination FROM real_estate_images rei
                    WHERE rei.real_estate_id = re.id AND rei.is_active = true
                )dest) AS images

                FROM real_estates re 
                    INNER JOIN ctypes cp 
                        ON cp.id = re.ctype_id
                    INNER JOIN real_estate_prices rep 
                        ON rep.real_estate_id = re.id AND rep.is_active = 'true'
                    INNER JOIN languages l 
                        ON l.id = 2
                    INNER JOIN type_translations tt 
                        ON tt.type_id = cp.type_id AND tt.language_id = l.id
                    LEFT JOIN location_translations lt
                        ON lt.location_id = re.location_id AND lt.language_id = l.id
                    LEFT JOIN locations lc 
                        ON lc.id = re.location_id
                    LEFT JOIN location_translations ltt
                        ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
                WHERE re.is_active = 'false' 
                    AND re.status_id <> 2 AND re.status_id <> 4 
                ORDER BY  re.updated_at DESC  
                LIMIT 15
            ) SELECT * FROM selected;   
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}


module.exports = {
    AdminLogin,
    LoadAdmin,
    AddOperator,
    DeleteOperator,
    UpdateOperator,
    GetDeletedOperators,
    RecoveryOperator,
    ChangeOperatorPassword,

    AddSpecification,
    GetSpecificationByID,
    GetAllSpecifications,
    SpecificationActivation,
    GetNotContainedSpec,

    GetAllTypes,
    AddType,
    GetTypeByID,
    UpdateRealEstate,
    AddSpecificationToType,
    DeleteTypeSpecification,

    AddToVIP,
    AddMainLocation,
    AddLocation,
    AddMaintype,
    GetOperators,
    DisableEnableValue,
    AddSpecVal,
    GetLocations,
    GetRegions,

    UploadPageImages,
    GetImagePlaces,
    GetPageImages,
    DeleteImagePlace,

    AddTypeImage,

    GetStatistics,
    GetTypes,
    GetPriceStatistics,

    GetConfirmRealEstates,
    NotActivatedEstates,
    RealestateByID,
    ActivateRealEstate

}