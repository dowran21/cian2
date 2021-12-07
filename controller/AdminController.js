const database = require("../db/index.js");
const {status} = require('../utils/status');
const AdminHelper = require('../utils/index.js');
const fs = require('fs');
const { off } = require("process");

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
            access_token = await AdminHelper.GenerateAdminAccessToken(data)
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
        WHERE t.main_type_id IS NOT NULL
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
            WHERE t.main_type_id IS NOT NULL AND t.id = ${rows[0].id}
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
         "name_ru":"Adding Russian wairnat"
         "name_tm":"Adding turmen wariant"
     }
     *******************************************/
     const {name_ru, name_tm} = req.body
     console.log(req.body)
     const query_text = `
         WITH inserted AS (
             INSERT INTO locations(absolute_name)
              VALUES ('${name_ru}') RETURNING id
        ), insert_trans AS (
             INSERT INTO location_translations(translation, language_id, location_id) VALUES
             ('${name_ru}', 2, (SELECT id FROM inserted)), ('${name_tm}', 1, (SELECT id FROM inserted)) 
        ) SELECT id FROM inserted
     `
     try {
         const {rows} = await database.query(query_text, [])
         try {
            const qt = `SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled
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
            message["phone"] = "Оператор с таким телефон уже был создан" 
            return res.status(409).send({error:message})
        }
        return res.status(status.error).json({"message":"Error"})
    }
}

const GetLocations = async (req, res) =>{
    const {lang} = req.params
    // console.log("hello getlocations")
    const query_text = `
        SELECT l.id, lt.translation AS name_tm, lt.translation AS name_ru, l.enabled
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
        SELECT l.id, lt.translation AS name_tm, lt.translation AS name_ru, l.enabled
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
    // {
// "name_tm"; "name_ru", enabled 
    // }
    console.log(req.body)

    const {id} = req.params
    const {name_ru, name_tm, enabled} = req.body
    const query_text = `
        WITH updated1 AS (
            UPDATE location_translations SET translation = '${name_ru}' WHERE language_id = 2 AND location_id = ${id}
        ), aupdate_it AS (
            UPDATE locations SET enabled = ${enabled} WHERE id = ${id}
        )
        UPDATE location_translations SET translation = '${name_tm}' WHERE language_id = 1 AND location_id = ${id}
    `
    try {
        const {rows} = await database.query(query_text);
        try {
            const qt = `
                SELECT l.id, lt.translation AS name_tm, ltt.translation AS name_ru, l.enabled
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

const GetAllUsers = async (req, res) =>{
    const {page, limit} = req.query
    const {search, sort_direction, sort_column} = req.query
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
                WHERE role_id = 3 ${WherePart}),
            (SELECT json_agg(op) FROM (
                SELECT u.id, u.full_name, u.email, u.phone, u.owner_id,  
                up.is_active, lower(validity)::text AS low_val, upper(validity)::text AS upper_val
                FROM users u
                    LEFT JOIN user_permissions up  
                        ON up.user_id = u.id AND (lower(validity) <= localtimestamp OR upper(validity) >= localtimestamp) AND is_active = true
                    WHERE u.role_id = 3 ${WherePart}
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
    const {page, limit, search, is_active, status_id} = req.query
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }

    let active_part = ``
    if(is_active){
        active_part = ` AND re.is_active = ${is_active}`
    }else{
        active_part = ` AND re.is_active IS NULL`
    }

    let status_part = ``;
    if(status_id){
        status_part = ` AND re.status_id = ${status_id}`
    }

    let where_part = ``
    if(search){
        where_part += ` AND (u.phone ~* '${search}' OR u.full_name ~* '${search}')`
    }else{
        where_part = ``
    }

    
    try {
        const query_text = `
        WITH selected AS ( 
    
            SELECT re.id, rep.price, u.phone, re.is_active, u.full_name, ott.translation AS type_of_owner,
                concat(
                    CASE 
                        WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                            END 
                        || lt.translation) AS location,
                (SELECT real_estate_name(re.id, l.id, tt.name, area))
    
     
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
                    LEFT JOIN location_translations ltt
                        ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
                WHERE re.id > 0 ${active_part} ${status_part} ${where_part} AND (selected = 'false'
                    OR (selected_time::tsrange @> localtimestamp IS NULL OR (NOT (selected_time::tsrange @> localtimestamp))))
                ORDER BY  re.id DESC  
                LIMIT 15
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
                    WHERE re.id >0 ${active_part} ${status_part} ${where_part} AND (selected = 'false'
                        OR (selected_time::tsrange @> localtimestamp IS NULL OR (NOT (selected_time::tsrange @> localtimestamp))))
                    ), (SELECT json_agg(re) FROM(
                        SELECT * FROM selected 
                    )re) AS real_estates   
            `
        const {rows} = await database.query(query_text, [])
        // console.log(rows) 
        return res.status(status.success).json(rows[0])
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ActivateRealEstate = async (req, res) =>{
    const {id} = req.params
    const {is_active, comment} = req.body
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
        ) ${comment_part} INSERT INTO logs (user_id, event_type_id, table_id, data) 
            VALUES (${user_id}, 1, 1, 
                (SELECT json_build_object('id', id, 'is_active', is_active ${!is_active ? `, 'comment', '${comment}'`: ''}) FROM updated)
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
                SELECT destination FROM real_estate_images rei
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
    WHERE re.id = $1 AND re.is_active IS NULL AND re.status_id <> 2 AND re.status_id <> 4
    `
    try {
        const {rows} = await database.query(query_text, [id])
        // console.log(rows[0].specifications)
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
    ChangeQueuePosition,

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

    GetAllUsers,
    ChangePermission,
    GivePermission,

    GetConfirmRealEstates,
    NotActivatedEstates,
    RealestateByID,
    ActivateRealEstate,

    GetLogs,

}