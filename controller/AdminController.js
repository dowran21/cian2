const database = require("../db/index.js");
const {status} = require('../utils/status');
const AdminHelper = require('../utils/index.js');
const fs = require('fs');
const admin = require("firebase-admin");
const serviceAccount = require(process.env.PATH_TO_PUSH_JSON)
const FIREBASE_DATABASE_URL = "https://gamysh-8a004-default-rtdb.europe-west1.firebasedatabase.app"
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: FIREBASE_DATABASE_URL
})

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
            const message = {type:"manual", name:"email", message:"Телефон или пароль неправильный"} 
            return res.status(status.bad).json(message)
        }
        let data = {}
        let access_token = ``;
        let refresh_token = ``;
        if(user.role_id==1){
            data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
            access_token = await AdminHelper.GenerateAdminAccessToken(data)
            refresh_token = await AdminHelper.GenerateAdminRefreshToken(data)
        }
        if(user.role_id == 2){
            data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
            access_token = await AdminHelper.GenerateAdminAccessToken(data)
            refresh_token = await AdminHelper.GenerateAdminRefreshToken(data)
        }
        if(user.role_id == 3){
            return res.status(499).json({"message":"Только для админов и операторов"})
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
            access_token = await AdminHelper.GenerateAdminAccessToken(data);
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
        WherePart += ` AND (u.full_name ~* '${search}' OR u.phone ~* '${search}')`
    }
    // if(phone && phone != 'null' && phone != 'undefined'){
    //     WherePart += ` AND phone = '${phone}'`
    // }

    let order_column = ``
    if(sort_column){
        order_column = sort_column;
    }else{
        order_column = ` u.id`
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
                SELECT u.id, u.full_name, u.email, u.phone, u.deleted,
                (SELECT json_agg(loc) FROM (
                    SELECT l.id, lt.translation
                    FROM operator_locations ol
                        INNER JOIN locations l
                            ON l.id = ol.location_id
                        INNER JOIN location_translations lt
                            ON lt.location_id = l.id AND lt.language_id = 2
                    WHERE ol.user_id = u.id
                )loc) AS locations
                FROM users u 
                    WHERE u.role_id = 2 ${WherePart}
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

const GetOperatorLocations = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        SELECT lt.translation, ol.id AS op_loc_id, ol.location_id AS id
        FROM operator_locations ol
            INNER JOIN location_translations lt
                ON lt.location_id = ol.location_id AND lt.language_id = 2
            
        WHERE ol.user_id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetNotOperatorLocations = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        SELECT l.id, lt.translation
        FROM locations l
            LEFT JOIN operator_locations ol
                ON ol.location_id = l.id AND ol.user_id = ${id  }
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 2 
            WHERE ol.id IS NULL AND l.main_location_id IS NULL
            ORDER BY l.id ASC
    `   
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const RemoveLocationFromOperator = async (req, res) =>{
    console.log("Hello i am in controller")
    const {id} = req.params;
    const query_text = `
        DELETE FROM operator_locations WHERE id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddOperatorLocation = async(req, res) =>{
    const {locations} = req.body
    const {id} = req.params;
    const query_text = `
        INSERT INTO operator_locations (user_id, location_id) VALUES ${locations.map(item => `(${id}, ${item.id})`).join(',')}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
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
                SELECT s.id, s.absolute_name, s.is_multiple, s.is_active, s.is_required,
                st.name AS name_tm, stt.name AS name_ru
                FROM specifications s
                INNER JOIN specification_translations st
                    ON st.spec_id = s.id AND st.language_id = 1
                INNER JOIN specification_translations stt
                    ON stt.spec_id = s.id AND stt.language_id = 2
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

const UpdateSpecification = async (req, res) =>{
    /******
     {
         is_required: true,
        is_multiple: false,
        translation_tm: 'aaaaa',
        translation_ru: 'bbbbb',
     }
     */
    const {id} = req.params;
    const {is_required, is_multiple, translation_ru, translation_tm} = req.body;
    const query_text = `
        WITH updated AS (
            UPDATE specifications SET is_required = ${is_required}, is_multiple = ${is_multiple} WHERE id = ${id}
            ), update_trans_ru AS (
                UPDATE specification_translations SET name = '${translation_ru}' WHERE spec_id = ${id} AND language_id = 2
            ) UPDATE specification_translations SET name = '${translation_tm}' WHERE spec_id = ${id} AND language_id = 1
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
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
                    ON svtt.spec_value_id = sv.id AND svtt.language_id = 2
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

const DeleteSpecification = async (req, res) =>{
    const {id} = req.params;
    const query_text  = `
        DELETE FROM specifications WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteSpecValue = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        DELETE FROM specification_values WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
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
    console.log(req.body)
    let val_part = ``
    for(let i=0; i<value_translations.length; i++){
        val_part += ` inserted${i} AS (
            INSERT INTO specification_values(spec_id, absolute_value) 
                VALUES (${id}, '${value_translations[i].name_ru}') RETURNING id
        ), insert_val_trans${i} AS(
            INSERT INTO specification_value_translations(name, language_id, spec_value_id)
                VALUES ('${value_translations[i].name_ru}', 2, (SELECT id FROM inserted${i})), ('${value_translations[i].name_tm}', 1, (SELECT id FROM inserted${i}))  
        )`
        if(i!=(value_translations.length-1)){
            val_part += `,`
        }
    }
    const query_text = `
        WITH ${val_part} SELECT id FROM inserted0
    `
    try {
        console.log(query_text)
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
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

                
                    SELECT s.id, s.absolute_name, s.is_multiple, s.is_required, is_active, st.name AS name_tm, stt.name AS name_ru

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
        SELECT ct.name, ctp.id, 
            t.absolute_name, cti.destination, tt.name AS name_ru, ttt.name AS name_tm 
            , mtt.name AS main_type_name, t.id AS type_id
        FROM types t
            INNER JOIN type_translations mtt
                ON mtt.type_id = t.main_type_id AND mtt.language_id = 2 
            INNER JOIN types tp
                ON t.main_type_id = tp.id
            INNER JOIN type_translations tt
                ON tt.type_id = t.id AND tt.language_id = 2
            INNER JOIN type_translations ttt
                ON ttt.type_id = t.id AND ttt.language_id = 1
            INNER JOIN ctypes ctp
                ON ctp.type_id = t.id
            INNER JOIN category_translations ct 
                ON ct.category_id = ctp.category_id AND ct.language_id = 2
            LEFT JOIN ctype_image cti
                ON cti.ctype_id = ctp.id
        WHERE t.main_type_id IS NOT NULL AND ctp.deleted = false
        ORDER BY ctp.id ASC
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
        "name_tm":
        "name_ru":
        "categories" : [1, 2]
    }
     *****************************************/
    const {name_tm, name_ru, categories, main_type_id} = req.body
    
    try {
        const query_text = `
            WITH inserted AS ( 
                INSERT INTO types(absolute_name, main_type_id) VALUES ($1, $2) RETURNING id
            ), inserte AS (
                INSERT INTO type_translations(name, language_id, type_id) 
                VALUES ('${name_tm}', 1, (SELECT id FROM inserted)), ('${name_ru}', 2, (SELECT id FROM inserted))
            ), insert_ctype AS 
                (INSERT INTO ctypes(category_id, type_id) 
                VALUES ${categories?.map(item => `(${item}, (SELECT id FROM inserted))`)})
                SELECT id FROM inserted
            `
        const {rows} = await database.query(query_text, [name_ru, main_type_id])
        try {
            const s_query = `
                SELECT ct.name, ctp.id, 
                t.absolute_name, cti.destination, tt.name AS name_ru, ttt.name AS name_tm 
                , mtt.name AS main_type_name
            FROM types t
                INNER JOIN type_translations mtt
                    ON mtt.type_id = t.main_type_id AND mtt.language_id = 2 
                INNER JOIN types tp
                    ON t.main_type_id = tp.id
                INNER JOIN type_translations tt
                    ON tt.type_id = t.id AND tt.language_id = 2
                INNER JOIN type_translations ttt
                    ON ttt.type_id = t.id AND ttt.language_id = 1
                INNER JOIN ctypes ctp
                    ON ctp.type_id = t.id
                INNER JOIN category_translations ct 
                    ON ct.category_id = ctp.category_id AND ct.language_id = 2
                LEFT JOIN ctype_image cti
                    ON cti.ctype_id = ctp.id
            WHERE t.main_type_id IS NOT NULL AND t.id = ${rows[0].id} AND ctp.deleted = false
            `
            const k = await database.query(s_query, [])
            const s = k.rows;
            // console.log(rows)
            return res.status(status.success).json({rows:s})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send("Spmmething went wrong")
        }
    }catch(e){
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }
}

const GetTypeByID = async (req, res) =>{
    const {id} = req.params
    // console.log(id)
    const query_text = `
            SELECT  destination, tt.name AS name_ru, ttt.name AS name_tm,
                
                (SELECT json_agg(spec) FROM(
                    SELECT s.id AS spec_id, ts.id AS type_spec_id, 
                        ts.deleted, ts.queue_position, st.name AS name_ru, stt.name AS name_tm                   
                    
                    FROM specifications s
                        INNER JOIN type_specifications ts
                            ON ts.spec_id = s.id
                        INNER JOIN specification_translations st
                            ON st.spec_id = s.id AND st.language_id = 2
                        INNER JOIN specification_translations stt
                            ON stt.spec_id = s.id AND stt.language_id = 1
                        WHERE ts.ctype_id = $1 
                        ORDER BY ts.queue_position ASC
                )spec) AS active_type_specifications
            
            FROM types t
                LEFT JOIN ctype_image cti
                    ON cti.ctype_id = $1
                INNER JOIN ctypes ctp
                    ON ctp.type_id = t.id
                INNER JOIN type_translations tt
                    ON tt.type_id = t.id AND tt.language_id = 2
                INNER JOIN type_translations ttt
                    ON ttt.type_id = t.id AND ttt.language_id = 1
            WHERE ctp.id = $1 AND ctp.deleted = false
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
        SELECT s.id AS spec_id, s.absolute_name, st.name AS name_ru, stt.name AS name_tm  
            

        FROM specifications s
            LEFT JOIN type_specifications ts
                ON ts.spec_id = s.id AND ts.ctype_id = ${id}
            INNER JOIN specification_translations st
                ON st.spec_id = s.id AND st.language_id = 2
            INNER JOIN specification_translations stt
                ON stt.spec_id = s.id AND stt.language_id = 1
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
     "specifications":[{"spec_id":12, "queue_position":1}, {"spec_id":13, "queue_position":2} ]
     */
    const {ctype_id} = req.params
    const specifications = req.body
    console.log(specifications)
    try{
        const query_text = `
                INSERT INTO type_specifications (ctype_id, spec_id, queue_position) 
                VALUES ${specifications?.map(item => `(${ctype_id}, ${item.spec_id}, ${item.queue_position})`).join(',')}
            `
        // console.log(query_text)
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true) 
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ChangeQueuePosition = async (req, res) =>{
    // {"queue_position":15}
    const {queue_position} = req.body
    const {type_spec_id} = req.params
    const query_text = `
        UPDATE type_specifications SET queue_position = ${queue_position} WHERE id = ${type_spec_id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}

const DeleteCtype = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        UPDATE ctypes SET deleted = true WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const Updatetype = async (req, res) =>{
    const {name_ru, name_tm} = req.body;
    const {id} = req.params;
    const query_text = `
    WITH updated1 AS (
        UPDATE type_translations SET name = '${name_ru}' WHERE language_id = 2 AND type_id = ${id}
    ) UPDATE type_translations SET name = '${name_tm}' WHERE language_id = 1 AND type_id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteTypeSpecification = async (req, res) =>{
    const {type_spec_id} = req.params
    const {deleted} = req.body
    console.log(req.body)
    const query_text = `
        UPDATE type_specifications SET deleted = ${deleted} WHERE id = ${type_spec_id}
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

const AddMainLocation = async (req, res)=>{
    /************************
     {
         "name_ru":"Adding Russian wairnat"
         "name_tm":"Adding turmen wariant"
         "lat":54512.546,
         "lng":6513.3165
     }
     *******************************************/
     const {name_ru, name_tm, lat, lng} = req.body
     console.log(req.body)
     const query_text = `
         WITH inserted AS (
             INSERT INTO locations(absolute_name, position)
              VALUES ('${name_ru}', '(${lat}, ${lng})') RETURNING id
        ), insert_trans AS (
             INSERT INTO location_translations(translation, language_id, location_id) VALUES
             ('${name_ru}', 2, (SELECT id FROM inserted)), ('${name_tm}', 1, (SELECT id FROM inserted)) 
        ) SELECT id FROM inserted
     `
     try {
         const {rows} = await database.query(query_text, [])
         try {
            const qt = `SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled, position[0] AS lat, position[1] AS lng
            FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
            INNER JOIN location_translations ltt
                ON ltt.location_id = l.id AND ltt.language_id = 2
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
         "name_ru":"Adding Russian wairnat"
         "name_tm":"Adding turmen wariant"
     }
     *******************************************/
    const {name_ru, name_tm} = req.body
    const {id} = req.params
    console.log(req.body)

    const query_text = `
        WITH inserted AS (
            INSERT INTO locations(absolute_name, main_location_id)
             VALUES ($1, $2) RETURNING id
        ), insert_trans AS (INSERT INTO location_translations(translation, language_id, location_id) VALUES
            ('${name_ru}', 2, (SELECT id FROM inserted)), ('${name_tm}', 1, (SELECT id FROM inserted))
        ) SELECT id FROM inserted
        
        `
    try {
        const {rows} = await database.query(query_text, [name_ru, id])
        try {
            const qt = `
                SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled
                    FROM locations l
                        INNER JOIN location_translations lt
                            ON lt.location_id = l.id AND lt.language_id = 1
                        INNER JOIN location_translations ltt
                            ON ltt.location_id = l.id AND ltt.language_id = 2
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
        if(e.message.includes("duplicate key value violates unique constraint")){
            let message = {}
            message["phone"] = "Локация с таким назанием уже был создан" 
            return res.status(409).send({error:message})
        }
        return res.status(status.error).json({"message":"Error"})
    }
}

const GetLocations = async (req, res) =>{
    const {lang} = req.params
    // console.log("hello getlocations")
    const query_text = `
        SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled, position[0] AS lat, position[1] AS lng
        FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
            INNER JOIN location_translations ltt
                ON ltt.location_id = l.id AND ltt.language_id = 2        
        WHERE l.main_location_id IS NULL
        ORDER BY l.id ASC

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
    // console.log("hello getregions")
    const {id} = req.params
    const query_text = `
        SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled
        FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
            INNER JOIN location_translations ltt
                ON ltt.location_id = l.id AND ltt.language_id = 2 
        WHERE l.main_location_id = ${id} AND l.enabled = true
        ORDER BY l.id ASC

    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(200).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.json(false)
    }
}

const ActivationOfLocation = async (req, res) =>{
    const {id} = req.params
    const {comment} = req.body
    const query_text = `
        UPDATE locations SET comment = '${comment}', enabled = false WHERE id = ${id}
    `
    try {
        await database.query(query_text)
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetDeletedRegions = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT l.id, lt.translation AS name_tm, lt.translation AS name_ru, l.enabled, l.comment
        FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 1
            INNER JOIN location_translations ltt
                ON ltt.location_id = l.id AND ltt.language_id = 2 
        WHERE l.main_location_id = ${id} AND l.enabled = false
        ORDER BY l.id ASC
    `
    try {
        const {rows} = await database.query(query_text, [])
        // console.log(rows)
        return res.status(200).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.json(false)
    }
}

const ActivateLocation = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        UPDATE locations SET enabled = true WHERE id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UpdateLocation = async (req, res) =>{
    /*
         "name_tm"; "name_ru", enabled, lat, lng
    */ 
    console.log(req.body)

    const {id} = req.params
    const {name_ru, name_tm, enabled, lat, lng} = req.body
    let positionPart = ``
    if(lat && lng){
        positionPart = ` , position = '(${lat}, ${lng})'`
    }
    const query_text = `
        WITH updated1 AS (
            UPDATE location_translations SET translation = '${name_ru}'  WHERE language_id = 2 AND location_id = ${id}
        ), aupdate_it AS (
            UPDATE locations SET enabled = ${enabled} ${positionPart} WHERE id = ${id}
        )
        UPDATE location_translations SET translation = '${name_tm}' WHERE language_id = 1 AND location_id = ${id}
    `
    try {
        const {rows} = await database.query(query_text);
        try {
            const qt = `
                SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled, position[0] AS lat, position[1] AS lng
                    FROM locations l
                        INNER JOIN location_translations lt
                            ON lt.location_id = l.id AND lt.language_id = 1
                        INNER JOIN location_translations ltt
                            ON ltt.location_id = l.id AND ltt.language_id = 2
                    WHERE l.id = ${id}`
            const k = await database.query(qt, [])
            const s = k.rows[0]
            return res.status(status.success).json({"rows":s})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.success).send(false)
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
        SELECT DISTINCT ON (t.id) t.id, tt.name 
        FROM types t
            INNER JOIN type_translations tt
                ON tt.type_id = t.id AND tt.language_id = 2
            INNER JOIN ctypes cp
                ON cp.type_id = t.id 
        WHERE t.main_type_id IS NOT NULL AND cp.deleted = false
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetAllUsers = async (req, res) =>{
    const {page, limit} = req.query
    const {search, sort_direction, sort_column, owner_id, active} = req.query
    let OffSet = ``
    if (page && limit) {
        OffSet = ` OFFSET ${(page)*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }
    let WherePart = ``
    if(search && search != 'null' && search != 'undefined'){
        WherePart += ` AND (u.full_name ~* '${search}' OR u.phone ~* '${search}' OR u.email  ~* '${search}')`
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

    if(owner_id){
        WherePart += ` AND u.owner_id = ${owner_id}`
    }
    if(active){
        WherePart += ` AND u.active = ${active}`
    }
    
    let order_part = `ORDER BY ${order_column} ${order_direction}`

    const query_text = `
        SELECT
            (SELECT COUNT(*) 
                FROM users u
                WHERE u.role_id = 3 ${WherePart}),
            (SELECT json_agg(op) FROM (
                SELECT u.id, u.full_name, u.email, u.phone, u.owner_id, to_char(u.last_logged, 'YYYY.MM.DD') AS created_at,
                up.is_active, lower(validity)::text AS low_val, upper(validity)::text AS upper_val, u.active,
                (SELECT json_agg(com) FROM (
                    SELECT ac.comment FROM 
                    activation_comment ac WHERE ac.user_id = u.id
                    ORDER BY ac.id DESC
                    LIMIT 1
                )com) AS comment
                FROM users u
                    LEFT JOIN user_permissions up  
                        ON up.user_id = u.id AND (lower(validity) <= localtimestamp OR upper(validity) >= localtimestamp) AND is_active = true
                    WHERE u.role_id = 3 AND u.deleted = false ${WherePart}
                ${order_part}
                ${OffSet}
            )op) AS users
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteUser = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        DELETE FROM users WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ChangePermission = async (req, res) =>{
    const {id} = req.params;
    const {is_active} = req.body;
    // console.log(is_active)
    const query_text = `
        UPDATE user_permissions SET is_active = ${is_active} WHERE user_id = ${id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GivePermission = async (req, res) =>{
    // console.log("Hello i am in controller")
    const {id} = req.params;
    const {start_date, end_date} = req.body;
    // console.log(start_date, end_date)

    const query_text = `
        INSERT INTO user_permissions(user_id, validity) VALUES (${id}, '[${start_date}, ${end_date}]' ) RETURNING user_id
    `
    try {
        const {rows} = await database.query(query_text, [])
        const s_query = `
            SELECT u.id, u.full_name, u.email, u.phone, up.is_active, lower(validity)::text AS low_val, upper(validity)::text AS upper_val
            FROM users u
                LEFT JOIN user_permissions up  
                    ON up.user_id = u.id AND (lower(validity) <= localtimestamp OR upper(validity) >= localtimestamp)
                WHERE u.role_id = 3 AND u.id = ${rows[0].user_id}
        `
        console.log("Error after first query")
        try {
            const k = await database.query(s_query, [])
            return res.status(status.success).json({"rows":k.rows[0]})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}

const ChangeUserType = async (req, res) =>{
    const {id} = req.params;
    const {owner_id} = req.body;
    const query_text = `
        UPDATE users SET owner_id = ${owner_id} WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
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
                WHERE re.status_id = st.id AND cp.deleted = false ${where_part} ${spec_part}
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
    SELECT  
        to_char(date_trunc('DAY', re.created_at), 'DD.MM') AS created_at, AVG(rep.price) AS "Продажа", AVG(repp.price) AS "Аренда"
        FROM real_estates re
            INNER JOIN ctypes ctp 
                ON ctp.id = re.ctype_id
            INNER JOIN categories c
                ON c.id = ctp.category_id
            LEFT JOIN real_estate_prices rep
                ON rep.real_estate_id = re.id AND rep.is_active = true AND ctp.category_id = 1
            LEFT JOIN real_estate_prices repp
                ON repp.real_estate_id = re.id AND repp.is_active = true AND ctp.category_id = 2
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            INNER JOIN locations lc 
                    ON lc.id = re.location_id
            INNER JOIN real_estate_specification_values resv
                    ON resv.real_estate_id = re.id
        WHERE re.id > 0  AND ctp.deleted = false ${where_part} ${spec_part}
        GROUP BY date_trunc('DAY', re.created_at) 
        ORDER BY date_trunc('DAY', re.created_at)::date ASC
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetVipStatistics = async (req, res) =>{
    const {start_date, end_date} = req.query;
    let where_part = ``
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
        SELECT to_char(date_trunc('DAY', vre.created_at), 'DD.MM') AS created_at,
            COUNT(*) AS "Количество VIP"
            FROM vip_real_estates vre
            WHERE vre.id > 0 ${where_part}
            GROUP BY date_trunc('DAY', vre.created_at)
            ORDER BY date_trunc('DAY', vre.created_at)::date ASC
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        
    }
}

const GetUsersStatistics = async (req, res)=>{
    const query_text = `
        SELECT o.id,
            (SELECT COUNT(*) FROM users u WHERE u.owner_id = o.id ) AS count
        FROM owners o
    `
    try {
        const {rows} = await database.query(query_text,[])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetUserChart = async (req, res) =>{
    const {date_part, start_date, end_date} = req.query;
    let where_part = `` 

    if(start_date && end_date){
        where_part += ` AND u.created_at >= '${start_date}'::date AND u.created_at <= '${end_date}'::date`
    }else if(start_date && !end_date){
        where_part += ` AND u.created_at >= '${start_date}'::date`
    }else if(!start_date && end_date){
        where_part += ` AND u.created_at <= '${end_date}'::date`
    }else{
        where_part += ``
    }
    
    let inter = ``
    if(date_part){
        inter = `${date_part}`
    }else{
        inter = `DAY`
    }
    const query_text = `
        SELECT to_char(date_trunc('DAY', u.created_at), 'DD.MM') AS created_at, COUNT(o.id) AS "Собственники", COUNT(oo.id) AS "Риелторы"
            FROM users u
            LEFT JOIN owners o 
                ON o.id = u.owner_id AND o.id = 1
            LEFT JOIN owners oo 
                ON oo.id = u.owner_id AND oo.id = 2
            WHERE u.role_id = 3 ${where_part} 
            GROUP BY date_trunc('${inter}', u.created_at) 
            ORDER BY date_trunc('${inter}', u.created_at)::date ASC
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetActiveStatistics = async (req, res) =>{
    const query_text = `
        SELECT 
            (SELECT COUNT(re.id) FROM real_estates re WHERE re.status_id IN (1, 3)) AS active,
            (SELECT COUNT(re.id) FROM real_estates re WHERE re.status_id IN (2, 4 )) AS deactive
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetUserForActivation = async (req, res) =>{
    const {page, limit, search} = req.query;
    let offSet = ``
    if(page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    let where_part = ``
    if(search){
        where_part = ` AND (u.full_name ~* '${search}' OR u.phone ~* '${search}')`
    }
    const query_text = `
        WITH selected AS (
            SELECT ai.ip_address, ai.id AS access_ip, u.id AS user_id, ai.activated, u.full_name, u.phone, ai.code
            FROM users u
                INNER JOIN access_ip ai
                    ON ai.user_id = u.id AND ai.activated = false
                WHERE ai.id > 0 ${where_part}
            ${offSet}
        ) SELECT 
            (SELECT COUNT(*) FROM users u
            INNER JOIN access_ip ai
                ON ai.user_id = u.id AND ai.activated = false), 
            (SELECT json_agg(us) FROM (SELECT * FROM selected)us) AS act_users
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ActivateIP = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        UPDATE access_ip SET activated = true WHERE id = ${id}
    `
    try {
        const {rows} = await database.query(query_text,[])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetConfirmRealEstates = async (req, res) =>{
    const {page, limit, search, is_active, status_id, location_id, type_id, category_id, vip} = req.query
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }
    
    let op_join = ``
    let op_where = ``
    let user = req.user
    if(user.role_id === 2){
        op_join = `INNER JOIN operator_locations ol
            ON ol.location_id = lc.main_location_id AND ol.user_id = ${user.id}`
    }
    console.log(is_active)
    let active_part = ``
    if(is_active=="false" || is_active == "true"){
        active_part = ` AND re.is_active = ${is_active}`
    }else{
        active_part = ` AND re.is_active IS NULL `
    }
    /****
     AND (selected = 'false'
            OR (selected_time::tsrange @> localtimestamp IS NULL OR (NOT (selected_time::tsrange @> localtimestamp))))
     */

    let status_part = ``;
    if(status_id){
        status_part = ` AND re.status_id = ${status_id}`
    }
    if(is_active =="all"){
        active_part = ``
    }
    let where_part = ``
    let ids = 0
    if(search){
        ids = parseInt(search)
        if(ids){
            where_part += ` AND (re.id = ${ids} OR u.phone ~* '${search}')`
        }else{
            where_part += ` AND (u.phone ~* '${search}' OR u.full_name ~* '${search}')`
        }
    }
    
    if(type_id){
        where_part += ` AND cp.type_id = ${type_id}`
    }
    if(category_id){
        where_part += ` AND cp.category_id = ${category_id}`
    }
    if(location_id) {
        where_part +=  ` AND (lc.main_location_id  = ${location_id} OR lc.id = ${location_id})`
    }
    if(vip == 'false' || vip == "true"){
        if(vip == "false"){
            where_part += ` AND vre.id IS NULL `
        }else{
            where_part += ` AND vre.id IS NOT NULL `
        }
    }
    try {
        const query_text = `
        WITH selected AS ( 
    
            SELECT DISTINCT ON (re.id) re.id, rep.price, u.phone, re.is_active, u.full_name, ott.translation AS type_of_owner, 
                to_char(re.created_at, 'YYYY/MM/DD HH24:MI') AS created_at, to_char(lg.log_time, 'YYYY/MM/DD HH24:MI') AS logged_time,
                concat(
                    CASE 
                        WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                            END 
                        || lt.translation) AS location,
                (SELECT real_estate_name(re.id, l.id, tt.name, area)), vre.vip_type_id, to_char(lower(vre.vip_dates), 'DD.MM.YYYY') AS vip_lower_date,
                to_char(upper(vre.vip_dates), 'DD.MM.YYYY') AS vip_upper_date, vre.id AS vip_id
    
     
                FROM real_estates re  
                    INNER JOIN users u
                        ON u.id = re.user_id
                    INNER JOIN owner_type_translations ott
                        ON ott.owner_id = u.owner_id AND ott.language_id = 2
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
                    LEFT JOIN vip_real_estates vre
                        ON vre.real_estate_id = re.id AND (lower(vre.vip_dates) >= localtimestamp OR upper(vre.vip_dates) >= localtimestamp)  
                    LEFT JOIN location_translations ltt
                        ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
                    LEFT JOIN logs lg
                        ON re.id = (lg.data ->>'id')::bigint AND lg.event_type_id =1
                        ${op_join}
                WHERE re.id > 0 AND cp.deleted = false ${active_part} ${status_part} ${where_part} 
                    AND re.status_id <> 2 AND re.status_id <> 4
                ORDER BY  re.id DESC
                
            ), updated AS (
                UPDATE real_estates SET selected = true, 
                    selected_time = tsrange (
                        localtimestamp,
                        localtimestamp + INTERVAL '1 SECOND'
                        '[]'
                    ) WHERE id IN (SELECT id FROM selected)
            ) 
                SELECT (SELECT COUNT(*) 
                    FROM real_estates re
                    LEFT JOIN locations lc 
                        ON lc.id = re.location_id
                    INNER JOIN users u
                        ON u.id = re.user_id
                    INNER JOIN ctypes cp 
                        ON cp.id = re.ctype_id
                    LEFT JOIN vip_real_estates vre
                        ON vre.real_estate_id = re.id AND (lower(vre.vip_dates) >= localtimestamp OR upper(vre.vip_dates) >= localtimestamp)
                        ${op_join}
                    WHERE re.id >0 ${active_part} ${status_part} ${where_part} 
                        AND re.status_id <> 2 AND re.status_id <> 4
                    ), (SELECT json_agg(re) FROM(
                        SELECT * FROM selected
                        ORDER BY vip_type_id ASC NULLS LAST, vip_id ASC NULLS LAST, created_at DESC
                        ${offSet}
                    )re) AS real_estates   
            `
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ActivateRealEstate = async (req, res) =>{
    const {id} = req.params
    const {is_active, comment, description_tm, description_ru} = req.body
    console.log(req.body)
    let comment_part = ``
    if(is_active){
        comment_part = ``
    }
    if(is_active == false){
        comment_part = `, insert_comment AS (
            INSERT INTO real_estate_comments(real_estate_id, comment)
            VALUES (${id}, '${comment}'))`
    }
    const user_id = req.user.id
    const query_text = `
        WITH updated AS (
            UPDATE real_estates SET is_active = ${is_active} WHERE id = ${id} RETURNING *
        ), updated_trans_tm AS(
            UPDATE real_estate_translations
                SET description = '${description_tm}' WHERE language_id = 1 AND real_estate_id = ${id}
        ), updated_trans_ru AS(
            UPDATE real_estate_translations
                SET description = '${description_ru}' WHERE language_id = 2 AND real_estate_id = ${id}
        ) ${comment_part} INSERT INTO logs (user_id, event_type_id, table_id, data) 
            VALUES (${user_id}, 1, 1, 
                (SELECT json_build_object('id', id, 'is_active', is_active, ${!is_active ? ` 'comment', '${comment}',`: ''} 
                'description_tm', '${description_tm}', 'description_ru', '${description_ru}') 
                 FROM updated)
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

const DeleteImage = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        DELETE FROM real_estate_images WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const RealestateByID = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT re.id, re.area, rep.price, vre.id AS VIP, u.phone, u.full_name, ott.translation,
            re.created_at,
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location,
            real_estate_name($1, l.id, tt.name, area), u.phone, ott.translation AS owner_type,

            (SELECT json_agg(image) FROM (
                SELECT id, destination FROM real_estate_images rei
                WHERE rei.real_estate_id = $1 AND rei.is_active = 'true'
            )image) AS images, 

            (SELECT json_agg(rejection) FROM(
                SELECT rec.id, rec.comment
                FROM real_estate_comments rec
                WHERE rec.real_estate_id = re.id
            )rejection) AS rejections,

            (SELECT json_agg(specification) FROM(
                SELECT DISTINCT ON (resvv.spec_id) st.name, 
                   
                    (SELECT json_agg(value) FROM(
                        SELECT sv.absolute_value, svt.name FROM specification_values sv
                            LEFT JOIN specification_value_translations svt
                                ON svt.spec_value_id = sv.id AND svt.language_id = 2
                            INNER JOIN real_estate_specification_values resv 
                                ON resv.spec_value_id = sv.id
                        WHERE resv.real_estate_id = re.id AND sv.spec_id = st.spec_id
                    )value) AS values
                    
                FROM specification_translations st
                    INNER JOIN real_estate_specification_values resvv
                        ON resvv.spec_id = st.spec_id 
                WHERE st.language_id = 2 AND resvv.real_estate_id = $1 

            )specification) AS specifications, ret.description AS description_tm, rett.description AS description_ru

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
            ON ret.real_estate_id = re.id AND ret.language_id = 1
        LEFT JOIN real_estate_translations rett 
            ON rett.real_estate_id = re.id AND rett.language_id = 2
        INNER JOIN real_estate_prices rep 
            ON rep.real_estate_id = re.id AND rep.is_active = true 
        LEFT JOIN location_translations lt
            ON lt.location_id = re.location_id AND lt.language_id = l.id
        LEFT JOIN locations lc 
            ON lc.id = re.location_id
        LEFT JOIN location_translations ltt
            ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
    WHERE re.id = $1 AND re.status_id <> 2 AND re.status_id <> 4 AND ctp.deleted = false
    `
    try {
        const {rows} = await database.query(query_text, [id])
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const RemoveRealEstate = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        UPDATE real_estates SET status_id = real_estates.status_id+1 WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddToVIP = async (req, res) =>{
    const {id, re_id} = req.params;
    const {start_date, rate} = req.body;
    console.log(start_date)
    // let days = 0
    const query_text = `
        INSERT INTO vip_real_estates(real_estate_id, vip_dates, vip_type_id) 
        VALUES(
            ${re_id}, 
                tsrange(
                    '${start_date}'::date,
                    '${start_date}'::date + INTERVAL '${rate} DAY',
                    '[]'
                ),
            ${id}
        ) RETURNING vip_type_id, to_char(lower(vip_dates), 'DD.MM.YYYY') AS vip_lower_date,
        to_char(upper(vip_dates), 'DD.MM.YYYY') AS vip_upper_date, id, real_estate_id`
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetRealEstateStatistics = async (req, res) =>{
    const {date_part, start_date, end_date, type_id} = req.query;
    let where_part = `` 
    
    if(type_id){
        where_part += ` AND ctp.type_id = ${type_id}`
    }

    if(start_date && end_date){
        where_part += ` AND re.created_at >= '${start_date}'::date AND re.created_at <= '${end_date}'::date`
    }else if(start_date && !end_date){
        where_part += ` AND re.created_at >= '${start_date}'::date`
    }else if(!start_date && end_date){
        where_part += ` AND re.created_at <= '${end_date}'::date`
    }else{
        where_part += ``
    }
    
    let inter = ``
    if(date_part){
        inter = `${date_part}`
    }else{
        inter = `day`
    }
    const query_text = `
        SELECT to_char(date_trunc('DAY', re.created_at), 'DD.MM') AS created_at, COUNT(s.id) AS "На продаже",
        COUNT(ss.id) AS "Проданные", COUNT(sss.id) AS "Сдается в аренду", COUNT(ssss.id) AS "Сдано в аренду"
        FROM real_estates re
            LEFT JOIN statuses s
                ON s.id = re.status_id AND s.id = 1
            LEFT JOIN statuses ss
                ON ss.id = re.status_id AND ss.id = 2
            LEFT JOIN statuses sss
                ON sss.id = re.status_id AND sss.id = 3 
            LEFT JOIN statuses ssss
                ON ssss.id = re.status_id AND ssss.id = 4
            INNER JOIN ctypes ctp 
                ON ctp.id = re.ctype_id
            WHERE re.id > 0 AND ctp.deleted = false ${where_part}    
        GROUP BY date_trunc('DAY', re.created_at) 
        ORDER BY date_trunc('DAY', re.created_at)::date ASC
        
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows:rows})
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
                    AND re.status_id <> 2 AND re.status_id <> 4 AND cp.deleted = false
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

const GetLogs = async (req, res) =>{
    const {page, limit, search, start_date, end_date} = req.query

    let offSet = ``

    if(page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }
    let where_part = ``
    if(search){
        where_part += ` AND (u.full_name ~* '${search}' OR u.phone ~* '${search}') `
    }
    console.log(offSet)
    if(start_date && end_date){
        where_part += ` AND l.log_time >= '${start_date}'::date AND l.log_time <= '${end_date}'::date`
    }else if(start_date && !end_date){
        where_part += ` AND l.log_time >= '${start_date}'::date`
    }else if(!start_date && end_date){
        where_part += ` AND l.log_time <= '${end_date}'::date`
    }else{
        where_part += ``
    }
    const query_text = `
    SELECT (SELECT COUNT(l.id) 
            FROM logs l
                INNER JOIN users u
                    ON u.id = l.user_id 
            WHERE l.id > 0 ${where_part}     
        ) AS count,
    (SELECT json_agg(lo) FROM (
        SELECT to_char(l.log_time, 'DD/MM/YYYY') AS time, l.user_id, l.id AS log_id,
            u.full_name, u.phone, l.data ->> 'id' AS real_estate_id, l.data -> 'is_active' AS activation, l.data -> 'comment' AS comment
        FROM logs l
            INNER JOIN users u
                ON u.id = l.user_id 
            WHERE l.id > 0 ${where_part}
            ${offSet}
    )lo) AS logs
    `
    try {
        const {rows} = await database.query(query_text, []);
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false);
    }
}

const GetComplaints = async (req, res) =>{
    const {page, limit, accepted} = req.query;
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }
    const query_text = `
    SELECT (
         SELECT 
            COUNT(*)  FROM complaints c WHERE c.accepted = false
        ) AS count,
        (SELECT json_agg(com) FROM (
            SELECT c.id, c.message, c.accepted, 
                u.phone AS sender_phone, u.full_name AS sender_name,
                us.phone AS address_phone, us.full_name AS address_name, real_estate_id 
            FROM complaints c
            INNER JOIN users u
                ON u.id = c.user_id
            INNER JOIN real_estates re
                ON re.id = c.real_estate_id
            INNER JOIN users us
                ON us.id = re.user_id
            WHERE c.accepted = ${accepted}
            ${offSet}
        )com) AS complaints
   `
    try {
    const {rows} = await database.query(query_text, [])
    return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AcceptComplaint = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        UPDATE complaints SET accepted = true WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddNotify = async (req, res) => {
    const {min_price, max_price, min_area, max_area, type_id, category_id, message_tm, message_ru} = req.body;
    let where_part = ``;

    if (min_area && max_area){
        where_part += ` AND re.area > ${min_area}  AND re.area < ${max_area}`
    }else if(min_area && !max_area){
        where_part += ` AND re.area > ${min_area}`
    }else if(!min_area && max_area){
        where_part += ` AND re.area < ${max_area}`
    }else{
        where_part +=``
    }

    if (min_price && max_price){
        where_part += ` AND (rep.price > ${min_price} AND rep.price < ${max_price})`
    }else if(min_price && !max_price){
        where_part += ` AND rep.price > ${min_price}`
    }else if(!min_price && max_price){
        where_part += ` AND rep.price < ${max_price}`
    }else{
        where_part +=``
    }

    if (category_id ){
        where_part += ` AND cp.category_id = ${category_id}` 
    }

    if (type_id ){
        where_part += ` AND cp.type_id = ${type_id}` 
    }
    const query_text = `
        WITH inserted AS (
            INSERT INTO pushes (min_price, max_price, min_area, max_area, type_id, category_id, message_tm, message_ru,) 
            VALUES (${min_price ? `${min_price}`: `null`}, ${max_price ? `${max_price}`: `null`},
                 ${min_area ? `${min_area}`: `null`}, ${max_area ? `${max_area}`: `null`}, 
                 ${type_id ? `${type_id}`: `null` }, ${category_id ? `${category_id}`: `null` }, '${message_tm}', '${message_ru}',)
            RETURNING *
        ), selected AS (
            SELECT u.id
            FROM users u
                LEFT JOIN real_estates re
                    ON re.user_id = u.id
                INNER JOIN ctypes cp
                    ON cp.id = re.ctype_id
                INNER JOIN real_estate_prices rep
                    ON rep.real_estate_id = re.id AND rep.is_active = true
            WHERE re.id > 0 AND cp.deleted = false ${where_part}
        ) INSERT INTO push_messages (user_id, push_id) SELECT id ,  (SELECT id FROM inserted) FROM selected        
    `   
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddNotifyEstate = async (req, res) =>{
    const {id} = req.params;
    // const query_text = `
    //     INSERT INTO real_estate_notifies (real_estate_id) VALUES (${id})
    // `
    const query_text = `
        SELECT re.id, re.area, rep.price, vre.id AS VIP, u.phone, u.full_name, ott.translation,
            re.created_at,
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location,
            real_estate_name($1, l.id, tt.name, area), u.phone, ott.translation AS owner_type,

            (SELECT json_agg(image) FROM (
                SELECT id, destination FROM real_estate_images rei
                WHERE rei.real_estate_id = $1 AND rei.is_active = 'true'
            )image) AS images, 

            (SELECT json_agg(rejection) FROM(
                SELECT rec.id, rec.comment
                FROM real_estate_comments rec
                WHERE rec.real_estate_id = re.id
            )rejection) AS rejections,

            (SELECT json_agg(specification) FROM(
                SELECT DISTINCT ON (resvv.spec_id) st.name, 
                   
                    (SELECT json_agg(value) FROM(
                        SELECT sv.absolute_value, svt.name FROM specification_values sv
                            LEFT JOIN specification_value_translations svt
                                ON svt.spec_value_id = sv.id AND svt.language_id = 2
                            INNER JOIN real_estate_specification_values resv 
                                ON resv.spec_value_id = sv.id
                        WHERE resv.real_estate_id = re.id AND sv.spec_id = st.spec_id
                    )value) AS values
                    
                FROM specification_translations st
                    INNER JOIN real_estate_specification_values resvv
                        ON resvv.spec_id = st.spec_id 
                WHERE st.language_id = 2 AND resvv.real_estate_id = $1 

            )specification) AS specifications, ret.description AS description_tm, rett.description AS description_ru

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
            ON ret.real_estate_id = re.id AND ret.language_id = 1
        LEFT JOIN real_estate_translations rett 
            ON rett.real_estate_id = re.id AND rett.language_id = 2
        INNER JOIN real_estate_prices rep 
            ON rep.real_estate_id = re.id AND rep.is_active = true 
        LEFT JOIN location_translations lt
            ON lt.location_id = re.location_id AND lt.language_id = l.id
        LEFT JOIN locations lc 
            ON lc.id = re.location_id
        LEFT JOIN location_translations ltt
            ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
    WHERE re.id = $1 AND re.status_id <> 2 AND re.status_id <> 4 AND ctp.deleted = false
    `
    try {
        const {rows} = await database.query(query_text, [id])
        let message = {
            data: {title:`${rows[0].real_estate_name}`, body:`${rows[0].description_ru}`, item_id:`${id}`}
            // token
        }
        await admin.messaging().sendToTopic('Events',message)
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ChangeActivation = async (req, res) =>{
    const {id} = req.params;
    const {is_active, comment} = req.body
    const query_text = `
       WITH updated AS (UPDATE users SET active = ${is_active} WHERE id = ${id}) 
        INSERT INTO activation_comment (user_id, comment) VALUES(${id}, '${comment}') 
    `
    
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e);
        return res.status(status.error).send(false)
    }
}

const GetInjections = async (req, res) =>{
    const {page, limit} = req.query;
    let offSet = ``
    if(page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    const query_text = `
        SELECT (
            SELECT COUNT(*) FROM sql_injections si WHERE si.deleted = false
        ), (SELECT json_agg(inj) FROM (
            SELECT * FROM sql_injections si
            WHERE si.deleted = false
            ORDER BY si.id DESC
            ${offSet}
        )inj) AS injections
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DeleteInjection = async (req, res) =>{
    const {id} = req.params;
    const query_text = `UPDATE sql_injections SET deleted = true WHERE id = ${id}`
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetLocationsForSelect = async (req, res) =>{
    const query_text = `
        SELECT l.id AS value, lt.translation AS label 
            FROM locations l
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = 2
            WHERE l.main_location_id IS NULL
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetTypesForSelect = async (req, res) =>{
    const query_text = `
        SELECT t.id AS value, tt.name AS label
        FROM types t
        INNER JOIN type_translations tt
            ON tt.type_id = t.id AND tt.language_id = 2
        WHERE t.main_type_id IS NOT NULL
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetLocationStatistics = async (req, res) =>{
    const {main_location_id} = req.query;
    let wherePart = ``
    if(main_location_id){
        wherePart = `WHERE l.main_location_id = ${main_location_id}`
    }else{
        wherePart = `WHERE l.main_location_id IS NULL`
    }
    const query_text = `
        SELECT l.id, lt.translation, (
            SELECT COUNT(re.id) 
                FROM real_estates re
            INNER JOIN locations lo
                ON lo.id = re.location_id
            INNER JOIN locations loc
                ON loc.id = lo.main_location_id 
            Where re.location_id = l.id OR lo.main_location_id = l.id
            ) AS "Количество" 
            FROM locations l
                INNER JOIN location_translations lt
                    ON lt.location_id = l.id AND lt.language_id = 2
                ${wherePart}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetDeleteAllUsers = async (req, res) =>{
    const {page, limit} = req.query
    const {search, sort_direction, sort_column, owner_id, active} = req.query
    let OffSet = ``
    if (page && limit) {
        OffSet = ` OFFSET ${(page)*limit} LIMIT ${limit}`
    }else{
        OffSet = ``
    }
    let WherePart = ``
    if(search && search != 'null' && search != 'undefined'){
        WherePart += ` AND (u.full_name ~* '${search}' OR u.phone ~* '${search}' OR u.email  ~* '${search}')`
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

    if(owner_id){
        WherePart += ` AND u.owner_id = ${owner_id}`
    }
    if(active){
        WherePart += ` AND u.active = ${active}`
    }
    
    let order_part = `ORDER BY ${order_column} ${order_direction}`

    const query_text = `
        SELECT
            (SELECT COUNT(*) 
                FROM users u
                WHERE u.role_id = 3 ${WherePart}),
            (SELECT json_agg(op) FROM (
                SELECT u.id, u.full_name, u.email, u.phone, u.owner_id, to_char(u.last_logged, 'YYYY.MM.DD') AS created_at,
                up.is_active, lower(validity)::text AS low_val, upper(validity)::text AS upper_val, u.active,
                (SELECT json_agg(com) FROM (
                    SELECT ac.comment FROM 
                    activation_comment ac WHERE ac.user_id = u.id
                    ORDER BY ac.id DESC
                    LIMIT 1
                )com) AS comment
                FROM users u
                    LEFT JOIN user_permissions up  
                        ON up.user_id = u.id AND (lower(validity) <= localtimestamp OR upper(validity) >= localtimestamp) AND is_active = true
                    WHERE u.role_id = 3 AND u.deleted = true ${WherePart}
                ${order_part}
                ${OffSet}
            )op) AS users
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AbsoluteDeleteUser = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        DELETE FROM users WHERE id = ${id}
    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetSelectSubLocaitons = async (req, res) =>{
    const {id} = req.params;
    const query_text = `
        SELECT l.id AS value, lt.translation AS label 
        FROM locations l
        INNER JOIN location_translations lt
            ON lt.location_id = l.id AND lt.language_id = 2
        WHERE l.main_location_id = ${id} 
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
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
    GetOperatorLocations,
    GetNotOperatorLocations,
    RemoveLocationFromOperator,
    AddOperatorLocation,

    AddSpecification,
    UpdateSpecification,
    GetSpecificationByID,
    DeleteSpecification,
    DeleteSpecValue,
    GetAllSpecifications,
    SpecificationActivation,
    GetNotContainedSpec,
    DeleteUser,

    GetAllTypes,
    AddType,
    GetTypeByID,
    UpdateRealEstate,
    AddSpecificationToType,
    DeleteTypeSpecification,
    ChangeQueuePosition,
    DeleteCtype,
    Updatetype,

    AddToVIP,
    AddMainLocation,
    AddLocation,
    AddMaintype,
    ActivationOfLocation,
    UpdateLocation,
    GetOperators,
    DisableEnableValue,
    AddSpecVal,
    GetLocations,
    GetRegions,
    GetDeletedRegions,

    UploadPageImages,
    GetImagePlaces,
    GetPageImages,
    DeleteImagePlace,

    AddTypeImage,
    ActivateLocation,

    GetStatistics,
    GetTypes,
    GetPriceStatistics,
    GetUsersStatistics,
    GetActiveStatistics,
    GetUserChart,
    GetRealEstateStatistics,

    GetAllUsers,
    ChangePermission,
    GivePermission,
    ChangeUserType,

    GetUserForActivation,
    ActivateIP,

    GetConfirmRealEstates,
    NotActivatedEstates,
    RealestateByID,
    ActivateRealEstate,
    DeleteImage,
    RemoveRealEstate,

    GetLogs,
    GetComplaints,
    AcceptComplaint,

    AddNotify,
    AddNotifyEstate,

    ChangeActivation,
    GetInjections,
    DeleteInjection,
    GetLocationsForSelect,
    GetTypesForSelect,
    GetLocationStatistics,
    GetDeleteAllUsers,
    
    AbsoluteDeleteUser,
    GetSelectSubLocaitons,
    GetVipStatistics
}