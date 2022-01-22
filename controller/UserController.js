const { ParameterStatusMessage } = require('pg-protocol/dist/messages');
const database = require('../db/index.js')
const UserHelper = require('../utils/index.js');
const { SendSMS } = require('../utils/sms.js');
const {status} = require('../utils/status.js')


/////////Registration and login//////////////////
const UserRegistration = async (req, res) =>{
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
   /********************
        {
            "full_name": "SOme full name of moderator",
            "email" : "ddowran2106@gmail.com",
            "phone":"61123141",
            "password":"somepasswordexample",
            "owner_id": 1
        }
    ************************/
    const code = Math.floor(Math.random()*(999999-100000) + 100000)
    console.log(code)
    const {full_name, email, phone, password, owner_id} = req.body
    console.log(owner_id);
    let to_lower = full_name.toLowerCase();
    if(to_lower.includes("select") || to_lower.includes("delete") || to_lower.includes("upadte") || to_lower.includes("delete") || to_lower.includes("insert") || to_lower.includes("where")){
        const injec_query = `
            INSERT INTO sql_injections (ip_address, text, phone, password)
            VALUES ('${ip}', '${full_name}', '${phone}', '${password}') 
        `
        try {
            await database.query(injec_query, [])
            let message = {}
            message["full_name"] = "SQL injection was detekted. You are in bann"
            message["phone"] = "SQL injection was detekted. You are in bann"
            return res.status(409).send({error:message})
        } catch (e) {
            console.log(e)
            let message = {}
            message["full_name"] = "SQL injection was detekted. You are in bann"
            message["phone"] = "SQL injection was detekted. You are in bann"
            return res.status(409).send({error:message})
        }
    }
    let max_count = 0;
    if (owner_id == 1){
        max_count = 3
    }
    if(owner_id == 2){
        max_count = 20000
    }
    try {
        const s = await database.query(`SELECT * FROM users WHERE phone = '${phone}' AND deleted = false`, [])
        if (s.rows[0]){
            let message = {}
            message["phone"] = "User with this phone has already exists"
            return res.status(409).send({error:message})
        }
    } catch (e) {
        return res.status(status.error).json({"message":e.message})
    }
    const hashed_password = await UserHelper.HashPassword(password)
    const query_text = `
        WITH inserted AS(
            INSERT INTO users(role_id, full_name, email, phone, password, owner_id, max_count)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
        ), inserted_code AS (
            INSERT INTO access_ip(ip_address, user_id, code)
            VALUES ($8,(SELECT id FROM inserted), $9)
        ) SELECT id FROM inserted

        `
    try{
        const {rows} = await database.query(query_text, [3, full_name, email, phone, hashed_password, owner_id, max_count, ip, code]);
        data = {"id":rows[0].id, "code":code}
        const message = `Code: ${code}`
        SendSMS({phone, message})
        const access_token = await UserHelper.GenerateCodeAccessToken(data);
        return res.status(status.success).json({"access_token":access_token, code})
    }catch(e){
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }
    
}

const VerifyUserCode = async (req, res) =>{
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    const {code} = req.body
    const user_id = req.user.id
    console.log(user_id, ip, code)
    const query_text = `
        SELECT u.id, u.full_name, u.email, u.phone, u.owner_id
            FROM users u
            INNER JOIN access_ip ai
                ON u.id = ai.user_id 
        WHERE u.id = ${user_id} AND ai.code = ${code} AND ai.ip_address = '${ip}' AND u.role_id = 3`

    try {
        const {rows} = await database.query(query_text, [])
        if (!rows[0]){
            // console.log("I am in if")
            let message = {}
            message["code"] = "Code is not correct"
            return res.status(status.notfound).send({error:message})
        }else{ 
            try {
                const update_query = `
                    WITH updated AS (
                            UPDATE access_ip SET activated = true 
                            WHERE user_id = ${user_id} AND ip_address = '${ip}' RETURNING *
                        ) SELECT id FROM updated
                    `
                await database.query(update_query, [])
                data = {"id":rows[0].id, "full_name":rows[0].full_name, "email":rows[0].email, "phone":rows[0].phone, "owner_id":rows[0].owner_id}
                const access_token = await UserHelper.GenerateUserAccessToken(data);
                const refresh_token = await UserHelper.GenerateUserRefreshToken(data);
                return res.status(status.success).json({data, "token":access_token, refresh_token})
            } catch (e) {
                console.log(e)
                return res.status(status.error).send(false)
            }
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const SendCodeAgain = async (req, res) =>{
    const user_id = req.user.id
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    const code = Math.floor(Math.random()*(999999-100000) + 100000)
    const query_text = `
        WITH updated AS(
            UPDATE access_ip SET code = ${code} 
            WHERE user_id = ${user_id} AND ip_address = '${ip}'
        ) SELECT * FROM users WHERE id = ${user_id}
        `
    try {
        const {rows} = await database.query(query_text, [])
        const mess = `Code: ${code}`
        SendSMS({phone:rows[0].phone, mess})
        const access_token = await UserHelper.GenerateCodeAccessToken(data);
        return res.status(status.success).json({"access_token":access_token})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const SendCode = async (req, res) =>{
    const user_id = req.user.id
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    const code = Math.floor(Math.random()*(999999-100000) + 100000)
    const query_text = `
           WITH inserted AS(
                INSERT INTO access_ip (user_id, ip_address, code) 
                VALUES (${user_id}, ${ip}, ${code}) 
                ON CONFLICT (user_id, ip_address) DO UPDATE SET code =${code}
            ) SELECT * FROM users WHERE id = ${user_id}
        `
    try {
        const {rows} = await database.query(query_text, [])
        const mess = `Code: ${code}`
        SendSMS({phone:rows[0].phone, mess})
        const access_token = await UserHelper.GenerateCodeAccessToken(data);
        return res.status(status.success).json({"access_token":access_token})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UserLogin = async (req, res) =>{
    /*******************
     {
         "phone":"61123141",
         "password":"somepassword"
     }
     *****************/
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    const {phone, password} = req.body
    // console.log(req.body)
    const code = Math.floor(Math.random()*(999999-100000) + 100000)
    console.log(code)
    const query_text = `
        SELECT u.id, u.phone, u.full_name, u.password, u.role_id, ai.ip_address, ai.denied_count, ai.activated,
            (CASE 
                WHEN ai.validity IS NULL THEN false
                ELSE ai.validity:: tsrange @> localtimestamp
            END) AS bann
        FROM users u
            LEFT JOIN access_ip ai
                ON u.id = ai.user_id
        WHERE u.phone = '${phone}' AND deleted = false
        `
    try {
        const {rows} = await database.query(query_text, [])
        const user = rows[0];
        // console.log(user)
        if(!user){
            let message = {}
            message["phone"] = "Telefon yada acar soz yalnysh"
            return res.status(status.bad).json({error:message})
        }
        if(user.id == 2){
            let compare = await UserHelper.ComparePassword(password, user.password)
            if(!compare){
                message["phone"] = "Telefon yada acar soz yalnysh"
                return res.status(405).send({error:message})        
            }else{
                let data = {"id":user.id, "full_name":user.full_name, "email":user.email, "phone":user.phone, "role_id":user.role_id}
                const access_token = await UserHelper.GenerateUserAccessToken(data);
                const refresh_token = await UserHelper.GenerateUserRefreshToken(data);
                return res.status(status.success).json({"token":access_token, "refresh_token":refresh_token, "data":data})
            }
        }

        if (!user.bann){
            let compare = await UserHelper.ComparePassword(password, user.password)
            // console.log(compare)
            if(!user.ip_address || !user.activated){
                console.log("I am i first if")
                let count = 0;
                const ip_query = `
                    INSERT INTO access_ip (ip_address, user_id, code, denied_count) 
                    VALUES('${ip}', ${user.id}, ${code}, $1) 
                    ON CONFLICT(ip_address, user_id) DO UPDATE SET denied_count = access_ip.denied_count + EXCLUDED.denied_count, code = EXCLUDED.code`;
                
                if(!compare){
                    let message = {}
                    message["phone"] = "Telefon yada acar soz yalnysh"
                    count = 1;
                    try {
                        await database.query(ip_query, [count])
                        return res.status(405).send({error:message})        
                    } catch (e) {
                        console.log(e)
                        return res.status(status.error).send("ERROR")
                    }
                }                  
                try {
                    await database.query(ip_query, [count])
                    data = {"id":user.id, "code":code}
                    const message = `Code: ${code}`
                    SendSMS({phone, message})
                    const access_token = await UserHelper.GenerateCodeAccessToken(data);
                    return res.status(status.success).json({"access_token":access_token, code})    
                } catch (e) {
                    console.log(e)
                    return res.status(status.error).send("ERROR")
                }
                
            }else{
                if(compare){
                    try{
                        data = {"id":user.id, "full_name":user.full_name, "email":user.email, "phone":user.phone, "role_id":user.role_id}
                        const access_token = await UserHelper.GenerateUserAccessToken(data);
                        const refresh_token = await UserHelper.GenerateUserRefreshToken(data);
                        return res.status(status.success).json({"token":access_token, "refresh_token":refresh_token, "data":data})
                    }catch(e){
                        console.log(e)
                        return res.status(status.error).send("ERROR")
                    }
                }else{
                    try {
                        let message = {}
                        message["phone"] = "Telefon yada acar soz yalnysh"
                        const count_query = `UPDATE access_ip 
                            SET denied_count = ${user.denied_count+1}
                            WHERE ip_address = '${ip}' AND user_id = ${user.id}`
                        await database.query(count_query, [])
                        return res.status(405).send({error:message})
                    } catch (e) {
                        console.log(e)
                        return res.status(status.error).send(false)   
                    }
                }

            }
                        
        }else{
            let message = {}
            message["phone"] = "You are in bann please login later"
            return res.status(432).send({error:message})
        }

    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Error"})
    }

}

const ForgotPassword = async (req, res) =>{
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    const {phone} = req.body
    const code = Math.floor(Math.random()*(999999-100000) + 100000)
    console.log(code)
    let user = {}
    const user_query = `
        SELECT * FROM users WHERE phone = '${phone}'
        `
    try {
        const {rows} = await database.query(user_query, [])
        user = rows[0]
        if(!user){
            return res.status(status.notfound).send({error:{"phone":"User with this phone doesn't exist"}})
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send("Error")
    }
    const query_text = `
        INSERT INTO access_ip (ip_address, user_id, code)
        VALUES('${ip}', ${user.id}, ${code})
        ON CONFLICT (ip_address, user_id) DO UPDATE SET code = EXCLUDED.code
        `
    try {
        const {rows} = await database.query(query_text, [])
        if (rows){
            data = {"id":user.id}
            const message = `Code: ${code}`
            SendSMS({phone, message})
            const access_token = await UserHelper.GenerateCodeAccessToken(data);
            return res.status(status.success).json({"token":access_token, code})
        }else{
            return res.status(status.notfound).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const ChangePassword = async (req, res) =>{
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    const {password, code} = req.body
    const user_id = req.user.id
    const hashed_password = await UserHelper.HashPassword(password)
    let ipr = {}
    const ip_query = `
        SELECT * FROM access_ip WHERE user_id = ${user_id} AND ip_address = '${ip}' AND code = ${code}
        `
    try {
        const k = await database.query(ip_query, [])
        ipr = k.rows[0]
        if(ipr){
                    const query_text = `
                UPDATE users SET password = '${hashed_password}' WHERE id = ${user_id}
                `
            try {
                await database.query(query_text, [])
                return res.status(status.success).send(true)
            } catch (e) {
                console.log(e)
                return res.status(status.error).send(false)
            }
        }else{
            return res.status(status.bad).send({error:{"code":"Code is not correct"}})
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
    
}

const LoadUser = async (req, res) =>{
    const user_id = req.user.id
    // console.log(req.user)
    try {
        const {rows} = await database.query(`SELECT * FROM users WHERE id = ${user_id} AND role_id = 3`, [])
        const user = rows[0]
        const data = {"id":user.id, "full_name":user.full_name, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        const access_token = await UserHelper.GenerateUserAccessToken(data)
        // const refresh_token = await AdminHelper.GenerateOperatorRefreshToken(data)
        return res.status(status.success).json({"token":access_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UpdateUser = async (req, res) =>{
    const {full_name, phone, email} = req.body;
    console.log(req.body);
    const user_id = req.user.id;
    const query_text = `
        UPDATE users SET full_name = '${full_name}', phone = '${phone}', email = '${email}' WHERE id = ${user_id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

////////User real estates///////////
const UserRealEstates = async (req, res) =>{
    const {lang, page, limit} = req.params
    const user_id = req.user.id
    let offSet = ``
    if(page && limit) {
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }
    // console.log(user_id)
    try {
        const query_text = `
            WITH selected AS (SELECT re.id, rep.price::text, re.is_active, re.status_id, to_char(re.created_at, 'YYYY-MM-DD') AS created_at,
                concat(CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' END || lt.translation) AS location,
                
                (SELECT real_estate_name(re.id, l.id, tt.name, area)),
                
                (SELECT json_agg(image) FROM (
                    SELECT rei.destination FROM real_estate_images rei
                    WHERE rei.real_estate_id = re.id
                )image) AS images,

                (SELECT json_agg(rejection) FROM(
                    SELECT rec.id, rec.comment
                    FROM real_estate_comments rec
                    WHERE rec.real_estate_id = re.id
                    ORDER BY rec.id DESC LIMIT 1
                )rejection) AS rejections
            
                FROM real_estates re

            LEFT JOIN languages l 
                ON l.language_code = '${lang}'
            LEFT JOIN ctypes cp
                ON cp.id = re.ctype_id
            LEFT JOIN type_translations tt
                ON tt.type_id = cp.type_id AND tt.language_id = l.id 
            LEFT JOIN location_translations lt
                ON lt.location_id = re.location_id AND lt.language_id = l.id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            LEFT JOIN location_translations ltt
                ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
            LEFT JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = true
            WHERE re.user_id = ${user_id} AND re.status_id <> 2 AND re.status_id <> 4
            ORDER BY re.created_at DESC
            ${offSet}
            )
            SELECT (
                SELECT COUNT(*) FROM real_estates re
                WHERE re.user_id = ${user_id} AND re.status_id <> 2 AND re.status_id <> 4
            ), (SELECT json_agg(re) FROM (SELECT * FROM selected)re) AS real_estates
        `
        const {rows} = await database.query(query_text, [])
        // console.log(rows)
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddRealEstate = async (req, res) =>{
/***********************
req.body should be like this;
    {
            "type_id":3,
            "category_id":1,
            "area":"5412",
            "position":{"lng":51.251, "lat":152.625},
            "price":45624862,
            "location_id":9б
            "descriptions" : [{"language_id":1, "description":"something about this home what you need to know"},
                            {"language_id":2, "description":"something about this home what you need to know, "}],
            "specifications":[{"id":1, "is_required":"TRUE", "is_multiple":"FALSE", "values":[8]},
                {"id":2, "is_required":"TRUE", "is_multiple":"FALSE", "values":[15]},
                {"id":3, "is_required":"TRUE", "is_multiple":"FALSE", "values":[33]}
                ],
    } 
*****************************/

    const {type_id, category_id, area, position, price, description_ru, description_tm, specifications, location_id } = req.body
    const user_id = req.user.id
    console.log(req.body)
    let user = {}
    try {
        const user_query = `
            SELECT u.id, u.max_count, u.owner_id, up.id AS user_permission, u.active
                
                (SELECT COUNT(*) 
                    FROM real_estates
                WHERE user_id = ${user_id}) AS count

            FROM users u 
            LEFT JOIN user_permissions up
                ON up.user_id = u.id AND is_active = true AND up.validity::tsrange @> localtimestamp
            WHERE u.id = ${user_id}
            `
        const {rows} = await database.query(user_query, [])
        // console.log(rows)
        user = rows[0]
        if (rows[0].owner_id == 1 && rows[0].count >= rows[0].max_count){
            return res.status(444).send(false)
        }
        if(!rows[0]?.active){
            return res.status(444).send({message:"You can't add you are in bann"})
        }
    } catch (e) {
        console.log("I am in user select error")
        console.log(e)
        return res.status(status.error).send(false)
    }
    let status_id = 0
    if (category_id== 1){
        status_id = 1
    }
    if (category_id == 2){
        status_id = 3
    }
    let i = 0;
    let j=0;
    console.log(specifications)
    let spec_value_part = ``
    if (specifications && specifications.length){

    
        spec_value_part = `, insert_spec AS (INSERT INTO real_estate_specification_values(real_estate_id, spec_id, spec_value_id)
                                VALUES`
        for (i=0; i<specifications?.length; i++){
            let specification = specifications[i]
            if (specification.values.length){
                console.log(specification.values, "spec values themelves")
                console.log(specification.values.length, "spec values length")
                const values = specification.values
                if (i!=0){
                    spec_value_part += `,`
                } 
                for (j=0; j<values?.length; j++){
                    
                    spec_value_part += ` ((SELECT id FROM inserted), ${specification.id}, ${values[j]})`
                    if (j!=(values?.length-1)){
                        spec_value_part += `,`;
                    }
                }
            
            }
        }
        spec_value_part += ` ) `
    }
    try {
        const query_text = `
            WITH selected AS (
                SELECT id FROM ctypes WHERE type_id = ${type_id} AND category_id = ${category_id}

            ),inserted AS (
                INSERT INTO real_estates(user_id, ctype_id, area, position, status_id, location_id)
                VALUES($1, (SELECT id FROM selected), $3, '(${position.lat}, ${position.lng})', $4, $5) RETURNING id

            ),ins AS (
                INSERT INTO real_estate_prices (real_estate_id, price)
                VALUES ((SELECT id FROM inserted), $2)

            ),insert2 AS(
                INSERT INTO real_estate_translations(description, real_estate_id, language_id)
                VALUES ('${description_tm}', (SELECT id FROM inserted), 1), ('${description_ru}', (SELECT id FROM inserted), 2)

            )${spec_value_part} SELECT id FROM inserted
        `
        // console.log(query_text)
        const {rows} = await database.query(query_text, [user_id, price, area, status_id, location_id])
        // console.log("Hello it is me")
        // console.log(rows)
        if(user?.user_permission){
            try {
                await database.query(`UPDATE real_estates SET is_active = true WHERE id = ${rows[0].id}`)
            } catch (e) {
                console.log("I am in user update estate error")

                console.log(e)
                return res.status(status.error).send("Something went wrong")
            }
        }
        return res.status(status.success).json({"rows":rows[0]})

    } catch(e) {
        console.log("I am in user add error")
        console.log(e)
        return res.status(status.error).send(false)

    }
}

const AddImage = async (req, res) =>{
    console.log("hello i am in controller")
    const files = req.files
    const {id} = req.params
    console.log(req.files);
    // console.log(req)
    if (files?.length){
        // console.log(files)
        const query_text = `
            INSERT INTO real_estate_images (real_estate_id, destination)
                VALUES ${files?.map(item => `(${id}, '${item.path}')`).join(',')}
        `
        try {
            console.log("i am in try")
            const {rows} = await database.query(query_text, [])
            console.log("i am after try")
            return res.status(status.success).json(true)
        } catch (e) {
            console.log(e)
            return res.status(status.error).json(false)
        }
    }
    // try { /usr/lib/x86_64-linux-gnu/libjemalloc.so
    //     if (global.gc) {global.gc();}
    //   } catch (e) {
    //     console.log("`node --expose-gc index.js`");
    //     process.exit(); 
    //   }
    return res.status(status.bad).json({"messageage":"there is no file"})
}

const GetUserRealEstateByID = async (req, res) =>{
    const {lang, id} = req.params
    const query_text = `
        SELECT DISTINCT ON (re.id) re.id AS real_estate_id, re.area::text, rep.price::text, re.location_id, 
            ret.description AS description_tm, rett.description AS description_ru, position[0] AS lat, position[1] AS lng,
            re.created_at::text, re.is_active, t.id AS type_id, c.id AS category_id,
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location,
            real_estate_name($1, l.id, tt.name, area), 
           
            
            (SELECT json_agg(image) FROM (
                SELECT id, destination FROM real_estate_images rei
                WHERE rei.real_estate_id = $1 AND rei.is_active = 'true'
            )image) AS images, 

            (SELECT json_agg(rejection) FROM(
                SELECT rec.id, rec.comment
                FROM real_estate_comments rec
                WHERE rec.real_estate_id = $1
                ORDER BY rec.id DESC LIMIT 1
            )rejection) AS rejections,

            (SELECT json_agg(specification) FROM(
                SELECT DISTINCT ON (resvv.spec_id) st.name, s.is_multiple, s.is_required, s.id,
                    
                    (SELECT json_agg(value) FROM(
                        SELECT sv.id AS value_id, sv.absolute_value, svt.name FROM specification_values sv
                            LEFT JOIN specification_value_translations svt
                                ON svt.spec_value_id = sv.id AND svt.language_id = l.id
                            INNER JOIN real_estate_specification_values resv 
                                ON resv.spec_value_id = sv.id
                        WHERE resv.real_estate_id = re.id AND sv.spec_id = st.spec_id
                    )value) AS values
                
            FROM specification_translations st
                INNER JOIN real_estate_specification_values resvv
                    ON resvv.spec_id = st.spec_id 
                INNER JOIN specifications s
                    ON s.id = st.spec_id
            WHERE st.language_id = l.id AND resvv.real_estate_id = $1 

        )specification) AS specifications

        FROM real_estates re
        INNER JOIN users u
            ON u.id = re.user_id
        INNER JOIN languages l 
            ON l.language_code = $2
        INNER JOIN owner_type_translations ott
            ON ott.owner_id = u.owner_id AND ott.language_id = l.id
        INNER JOIN ctypes ctp 
            ON ctp.id = re.ctype_id 
        INNER JOIN types t
            ON t.id = ctp.type_id
        INNER JOIN categories c
            ON c.id = ctp.category_id
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
        WHERE re.id = $1 
   `
   try {
       const {rows} = await database.query(query_text, [id, lang]);
       return res.status(status.success).json({"rows":rows[0]})
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

const AddWishList = async (req, res) =>{
    const {id} = req.params
    // const uuid = req.user.id
    const user_id = req.user.id

    const query_text = `
        INSERT INTO user_wish_list(user_id, real_estate_id) VALUES ($1, $2) ON CONFLICT (user_id, real_estate_id) DO NOTHING
        `
    try {
        const {rows} = await database.query(query_text, [user_id, id])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.json(false)
    }
}

const AddToWishListMobile = async (req, res) =>{
    const user_id = req.user.id
    const {real_estates} = req.body;
    try {
        const query_text = `
            INSERT INTO user_wish_list(user_id, real_estate_id) VALUES ${real_estates.map(item => `(${user_id}, ${item})`).join(',')} 
                ON CONFLICT (user_id, real_estate_id) DO NOTHING 
        `
        const {rows} = await database.query(query_text,[])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetWishList = async (req, res) =>{
    const user_id = req.user.id
    const {lang} = req.params
    const {page, limit} = req.query
    let offSet = ``
    if (page && limit){
        offSet = `OFFSET ${(page-1)*limit} LIMIT ${limit}`
    }

    const query_text = `
    SELECT
    (SELECT COUNT (count.id) FROM (
        SELECT  DISTINCT ON (re.id) re.id FROM real_estates re  
        INNER JOIN ctypes cp 
            ON cp.id = re.ctype_id
        LEFT JOIN real_estate_prices rep 
            ON rep.real_estate_id = re.id AND rep.is_active = 'true'
        LEFT JOIN languages l 
            ON l.language_code = $2
        INNER JOIN real_estate_translations ret
            ON ret.real_estate_id = re.id AND ret.language_id = l.id
        LEFT JOIN type_translations tt 
            ON tt.type_id = cp.type_id AND tt.language_id = l.id
        LEFT JOIN vip_real_estates vre 
            ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
        LEFT JOIN location_translations lt
            ON lt.location_id = re.location_id AND lt.language_id = l.id
        LEFT JOIN locations lc 
            ON lc.id = re.location_id
        LEFT JOIN location_translations ltt
            ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
        INNER JOIN types t
            ON t.id = cp.type_id
        INNER JOIN categories c 
            ON c.id = cp.category_id
        INNER JOIN user_wish_list uwl
            ON uwl.user_id = $1 AND uwl.real_estate_id = re.id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4     
    ) AS count) AS count,

        (SELECT json_agg(all1) FROM(
            SELECT DISTINCT ON (re.id) re.id, rep.price::text, u.phone::text, to_char(re.created_at, 'YYYY-MM-DD') AS created_at, u.full_name,
            concat(
                CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' END || lt.translation) AS location,
            (SELECT real_estate_name(re.id, l.id, tt.name, area)),
            
            (SELECT json_agg(dest) FROM (
                SELECT rei.destination FROM real_estate_images rei
                WHERE rei.real_estate_id = re.id AND rei.is_active = true
            )dest) AS images, 
            ret.description

            FROM real_estates re 
                INNER JOIN ctypes cp 
                    ON cp.id = re.ctype_id
                LEFT JOIN real_estate_prices rep 
                    ON rep.real_estate_id = re.id AND rep.is_active = 'true'
                LEFT JOIN languages l 
                    ON l.language_code = $2
                INNER JOIN real_estate_translations ret
                    ON ret.real_estate_id = re.id AND ret.language_id = l.id
                LEFT JOIN type_translations tt 
                    ON tt.type_id = cp.type_id AND tt.language_id = l.id
                LEFT JOIN vip_real_estates vre 
                    ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
                LEFT JOIN location_translations lt
                    ON lt.location_id = re.location_id AND lt.language_id = l.id
                LEFT JOIN locations lc 
                    ON lc.id = re.location_id
                LEFT JOIN location_translations ltt
                    ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
                LEFT JOIN users u
                    ON u.id = re.user_id
                LEFT JOIN types t
                    ON t.id = cp.type_id
                LEFT JOIN categories c 
                    ON c.id = cp.category_id
                INNER JOIN user_wish_list uwl
                    ON uwl.user_id = $1 AND uwl.real_estate_id = re.id
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4  
            ORDER BY  re.id DESC  
        )all1) AS real_estates_all
            `
    try {
        const {rows} = await database.query(query_text, [ user_id, lang])
        // console.log(rows)
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const DropWishList = async (req, res) =>{
    const user_id = req.user.id
    const query_text = `
        DELETE FROM user_wish_list WHERE user_id = ${user_id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const RemoveFromWishList = async (req, res) =>{
    const user_id = req.user.id;
    const {id} = req.params;
    const query_text = `
        DELETE FROM user_wish_list WHERE user_id = ${user_id} AND real_estate_id = ${id}
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
    const {uuid, id} = req.params;
    console.log(uuid, id)
    let max_count = 0;
    let count = 0;
    try {
        const query_text =  `
        SELECT
            (SELECT COUNT(*)
                FROM vip_real_estates vre
                    INNER JOIN real_estates re ON vre.real_estate_id = re.id
                WHERE re.user_id = $1 AND vip_dates:: tsrange @> localtimestamp) AS count,
            (SELECT uvc.max_count FROM user_vip_counts uvc
                WHERE uvc.user_id = $1 )
        `
        const {rows} = await database.query(query_text, [uuid])
        max_count = rows[0].max_count;
        count = rows[0].count;
    } catch (e) {
        console.log(e)
        throw e;
    }
    if ((max_count > count) || (!max_count)){
        console.log("IT is in if")
        try {
            const query_text = `
                WITH inserted AS(
                    INSERT INTO user_vip_counts (user_id, vip_type_id, max_count)
                        VALUES ('${uuid}', 1, 1)
                            ON CONFLICT (vip_type_id, user_id)
                            DO NOTHING
                    ) INSERT INTO vip_real_estates (vip_dates, real_estate_id, vip_type_id)
                         VALUES (
                        tsrange(
                            localtimestamp,
                            localtimestamp + INTERVAL '1 DAYS',
                        '[]'
                        ),
                        ${id}, 1
                    )
                `
            await database.query(query_text, [])
            return res.json({"message":"SUCCESFULLY"})
        } catch (e) {
            console.log(e)
            return res.json({"message":"it is already added"})
        }
    }
    else{
        res.json({"message":"max count has already used"})
    }

}

const UpateRealEstate = async (req, res) =>{
    const {id} = req.params;
    console.log(req.body);
    const { area, position, price, description_ru, description_tm, specifications, location_id } = req.body
    console.log(specifications)
    let i = 0;
    let j=0;

    let spec_value_part = ``
    if (specifications && specifications.length){
        spec_value_part = `, insert_spec AS (INSERT INTO real_estate_specification_values(real_estate_id, spec_id, spec_value_id)
                                VALUES`
        for (i=0; i<specifications?.length; i++){
            let specification = specifications[i]
            if (specification.values.length){
                const values = specification.values
                if (i!=0){
                    spec_value_part += `,`
                } 
                for (j=0; j<values?.length; j++){
                    
                    spec_value_part += ` (${id}, ${specification.id}, ${values[j]})`
                    if (j!=(values?.length-1)){
                        spec_value_part += `,`;
                    }
                }
            
            }
        }
        spec_value_part += ` ) `
    }
    await database.query(`DELETE FROM real_estate_specification_values WHERE real_estate_id = ${id}`, [])
    const query_text = `
        WITH updated AS (
            UPDATE real_estates SET area = ${area}, location_id = ${location_id}, position = '(${position.lat}, ${position.lng})', is_active = null WHERE id = ${id}
        ), updated_price AS (
            UPDATE real_estate_prices SET price = ${price} WHERE real_estate_id = ${id}
        ), update_trans_tm AS (
            UPDATE real_estate_translations SET description = '${description_tm}' WHERE language_id = 1 AND real_estate_id = ${id}
        ), update_trans_ru AS (
            UPDATE real_estate_translations SET description = '${description_ru}' WHERE language_id = 2 AND real_estate_id = ${id}
        ) ${spec_value_part} SELECT ${id}
    `
    try {
        const {rows} = await database.query(query_text,[])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
    return res.status(status.success).send(true)
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

const MakeComplaint = async (req, res) =>{
    const {id} = req.params;
    const user_id = req.user.id;
    const {message} = req.body;
    const query_text = `
        INSERT INTO complaints(real_estate_id, user_id, message) VALUES (${id}, ${user_id}, '${message}')
    `
    try{
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    }catch(e){
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetNotifications = async (req, res) =>{
    const user_id = req.user.id;
    const {lang} = req.params
    const query_text = `
        SELECT pm.id, pm.message_${lang} AS message, pm.push_id 
        FROM push_messages pm
            INNER JOIN pushes p
                ON p.id = pm.push_id
        WHERE pm.user_id = ${user_id} AND pm.is_sent = false
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const UpdateNotification = async (req, res) =>{
    const user_id = req.user.id;
    const {id} = req.params;
    const query_text = `
        UPDATE push_messages SET is_sent = true WHERE id = ${id}
        `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(false)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

module.exports = {
    UserRegistration,
    UserLogin,
    VerifyUserCode,
    UserRealEstates,
    LoadUser,
    UpdateUser,

    AddRealEstate,
    GetUserRealEstateByID,
    DeleteImage,
    
    ForgotPassword,
    AddWishList,
    GetWishList,
    DropWishList,
    SendCode,

    AddImage,
    AddToVIP,
    UpateRealEstate,
    RemoveRealEstate,
    ChangePassword,
    SendCodeAgain,
    AddToWishListMobile,
    RemoveFromWishList,
    MakeComplaint,

    GetNotifications,
    UpdateNotification
}

