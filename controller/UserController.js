const { relativeTimeRounding } = require('moment');
const database = require('../db/index.js')
const {lang_id} = require('../utils/helpFunctions.js');
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

    let max_count = 0;
    if (owner_id == 1){
        max_count = 3
    }
    if(owner_id == 2){
        max_count = 20000
    }
    try {
        const s = await database.query(`SELECT * FROM users WHERE phone = '${phone}'`, [])
        if (s.rows[0]){
            const error = {type:"manual", name:"phone", message:"User with this phone has already exist"}
            return res.status(409).send(false)
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
        const mess = `Code: ${code}`
        SendSMS({phone, mess})
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
            console.log("I am in if")
            return res.status(status.notfound).send(false)
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
    console.log(phone, password)
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
        WHERE u.phone = '${phone}' 
        `
    try {
        const {rows} = await database.query(query_text, [])
        const user = rows[0];
        console.log(user)
        if(!user){
            return res.status(status.bad).json({"message":"Phone or password incorrect"})
        }

        if (!user.bann){
            let compare = await UserHelper.ComparePassword(password, user.password)
            
            if(!user.ip_address || !user.activated){
                console.log("I am i first if")
                let count = 0;
                const ip_query = `
                    INSERT INTO access_ip (ip_address, user_id, code, denied_count) 
                    VALUES('${ip}', ${user.id}, ${code}, $1) 
                    ON CONFLICT(ip_address, user_id) DO UPDATE SET denied_count = access_ip.denied_count + EXCLUDED.denied_count, code = EXCLUDED.code`;
                
                if(!compare){
                    const error = {type:"manual", name:"phone", message:"'Phone ' ýada 'Açar söz' ýalňyş"}
                    count = 1;
                    try {
                        await database.query(ip_query, [count])
                        return res.status(405).send(error)        
                    } catch (e) {
                        console.log(e)
                        return res.status(status.error).send("ERROR")
                    }
                }                  
                try {
                    await database.query(ip_query, [count])
                    data = {"id":user.id, "code":code}
                    const mess = `Code: ${code}`
                    SendSMS({phone:user.phone, mess})
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
                        const error = {type:"manual", name:"phone", message:"'Phone ' ýada 'Açar söz' ýalňyş"}
                        const count_query = `UPDATE access_ip 
                            SET denied_count = ${user.denied_count+1}
                            WHERE ip_address = '${ip}' AND user_id = ${user.id}`
                        await database.query(count_query, [])
                        return res.status(405).send(error)
                    } catch (e) {
                        console.log(e)
                        return res.status(status.error).send(false)   
                    }
                }

            }
                        
        }else{
            const error = {type:"manual", name:"", message:"you are in bann for one hour"}
            return res.status(status.bad).send(error)
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
            return res.status(status.notfound).send(false)
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
            const mess = `Code: ${code}`
            SendSMS({phone, mess})
            const access_token = await UserHelper.GenerateCodeAccessToken(data);
            return res.status(status.success).json({"access_token":access_token, code})
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
    const hashed_password = UserHelper.HashPassword(password)
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
            return res.status(status.bad).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
    
}

////////User real estates///////////
const UserRealEstates = async (req, res) =>{
    const {lang} = req.params
    const user_id = req.user.id
    try {
        const query_text = `
            SELECT re.id, re.area, rep.price, 
                real_estate_name(re.id, l.id, tt.name, re.area)
                
                (SELECT json_agg(image) FROM (
                    SELECT rei.destination FROM real_estate_images rei
                    WHERE rei.real_estate_id = re.id
                )image) AS images, ret.description
            
                FROM real_estate re

            INNER JOIN languages l 
                ON l.language_code = ${lang}
            INNER JOIN ctypes cp
                    ON cp.id = re.ctype_id
            INNER JOIN type_translations tt
                    ON tt.type_id = cp.type_id AND tt.language_id = l.id 
            INNER JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = false
            WHERE re.user_id = ${user_id}
        `
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json(rows)

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

    const {type_id, category_id, phone, area, position, price, descriptions, owner_id, specifications, location_id } = req.body
    const user_id = req.user.id
    try {
        const user_query = `
            SELECT u.id, u.max_count, u.owner_id, 
                
                (SELECT COUNT(*) 
                    FROM real_estates
                WHERE user_id = ${user_id}) AS count

            FROM users u WHERE u.id = ${user_id}
            `
        const {rows} = await database.query(user_query, [])
        console.log(rows[0])
        if (rows[0].owner_id == 1 && rows[0].count >= rows[0].max_count){
            return res.status(422).send(false)
        }
    } catch (e) {
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
    let spec_value_part = `INSERT INTO real_estate_specification_values(real_estate_id, spec_id, spec_value_id)
                            VALUES`
    for (i=0; i<specifications?.length; i++){
        let specification = specifications[i]
        if (specification.values){
            const values = specification.values
            for (j=0; j<values?.length; j++){
                spec_value_part += ` ((SELECT id FROM inserted), ${specification.id}, ${values[j]})`
                if (j!=(values?.length-1)){
                    spec_value_part += `,`;
                }
            }
        if (i!=(specifications?.length-1)){
            spec_value_part += `,`
        }
        }
    }


    try {
        const query_text = `
            WITH selected AS (
                SELECT id FROM ctypes WHERE type_id = ${type_id} AND category_id = ${category_id}

            ),inserted AS (
                INSERT INTO real_estates(user_id, ctype_id, area, position, status_id, location_id)
                VALUES($1, (SELECT id FROM selected), $3, '(${position.lng}, ${position.lat})', $4, $5) RETURNING id

            ),ins AS (
                INSERT INTO real_estate_prices (real_estate_id, price)
                VALUES ((SELECT id FROM inserted), $2)

            ),insert2 AS(
                INSERT INTO real_estate_translations(description, real_estate_id, language_id)
                VALUES ${descriptions?.map(item => `('${item.description}', (SELECT id FROM inserted), ${item.language_id})`).join(',')}

            ), insert_spec AS (${spec_value_part}) SELECT id FROM inserted
        `
        const {rows} = await database.query(query_text, [user_id, price, area, status_id, location_id])
        return res.status(status.success).json(rows[0])

    } catch(e) {
        console.log(e)
        return res.status(status.error).send(false)

    }
}

const AddImage = async (req, res) =>{
    const files = req.files
    // console.log(req)
    console.log("-------------------------------------------------------------------")
    console.log(req.files)
    const {id} = req.params
    if (files?.length){
        // console.log(files)
        const query_text = `
            INSERT INTO real_estate_images (real_estate_id, destination)
                VALUES ${files?.map(item => `(${id}, '${item.path}')`).join(',')}
        `
        try {
            const {rows} = await database.query(query_text, [])
            return res.status(200).json(true)
        } catch (e) {
            console.log(e)
            return res.status(400).json(false)
        }
    }
    return res.json({"message":"there is no file"})
}

const GetUserRealEstateByID = async (req, res) =>{
    const {id} = req.body
    const {uuid} = req.params
    try {
        const query_text = `
        SELECT re.id, re.created_at, re.area, re.position, rep.price,

            (SELECT json_agg(description) FROM (
                SELECT ret.language_id, ret.description FROM real_estate_translations ret
                    WHERE ret.real_estate_id = re.id
            )description) AS descriptions,

            (SELECT json_agg(image) FROM (
                SELECT ret.destination FROM real_estate_images ret WHERE ret.real_estate_id = re.id
            )image) AS images,

            (SELECT json_agg(specification) FROM (
                SELECT st.name,

                    (SELECT json_agg(value) FROM
                            (SELECT sv.absolute_value, svt.name FROM specification_values sv
                                LEFT JOIN specification_value_translations svt
                                    ON sv.id = svt.spec_value_id AND svt.language_id = $1
                                INNER JOIN real_estate_specification_values resv
                                    ON resv.spec_value_id = sv.id
                            WHERE resv.real_estate_id = re.id AND sv.spec_id = st.spec_id
                    )value) AS values

            FROM specification_translations st
            INNER JOIN real_estate_specification_values resv ON resv.spec_id = st.spec_id
            WHERE resv.real_estate_id = re.id AND st.language_id = $1
        )specification) AS specifications

        FROM real_estates re
        INNER JOIN real_estate_prices rep
        ON rep.real_estate_id = re.id AND rep.is_active = TRUE
        WHERE user_id = $2 AND re.id = $3 AND re.status_id <> 2
    `
        const {rows} = await database(query_text, [id, ]);
        return res.json(rows)
    } catch (e) {
        console.log(e)
        throw e;
    }
}

const AddWishList = async (req, res) =>{
    const {id} = req.params
    const uuid = req.user.id

    const query_text = `
        INSERT INTO user_wish_list(user_id, real_estate_id) VALUES ($1, $2)
        `
    try {
        const {rows} = await database.query(query_text, [uuid, id])
        return res.json(true)
    } catch (e) {
        console.log(e)
        return res.json(false)
    }
}

const GetWishList = async (req, res) =>{
    const {uuid, lang} = req.params
    const {page, limit} = req.query
    let offSet = ``
    if (page && limit){
        offSet = `OFFSET ${(page-1)*limit} LIMIT ${limit}`
    }

    const query_text = `
        SELECT

            (SELECT COUNT(id) FROM user_wish_list
                WHERE user_id = $1
            ) AS count,

            (SELECT json_agg(res) FROM (
                SELECT re.id, re.area, rep.price, ret.description, re.position, re.created_at,
                    (SELECT destination FROM real_estate_images rei WHERE rei.real_estate_id = re.id LIMIT 1)
                FROM real_estates re
                LEFT JOIN real_estate_prices rep ON rep.real_estate_id = re.id
                INNER JOIN languages l ON l.language_code = $2
                LEFT JOIN real_estate_translations ret ON ret.real_estate_id = re.id AND ret.language_id = l.id
                INNER JOIN user_wish_list uwl ON uwl.real_estate_id = re.id
                WHERE uwl.user_id = $1
                ORDER BY uwl.added_time DESC ${offSet}
            )res) AS real_estates_all
            `
    try {
        const {rows} = await database.query(query_text, [uuid, lang])
        return res.specification("Hi my friend")
    } catch (e) {
        console.log(e)
        throw e
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
    const {status_id} = req.body
    const {id} = req.params
    try {
        const query_text = `
        UPDATE real_estates SET status_id = ${status_id} WHERE id = ${id}
        `
        await database.query(query_text, [])
        return res.status(200).json(true)
    } catch (e) {
        console.log(e)
        return res.status(400).json(false)
    }
}

module.exports = {
    UserRegistration,
    UserLogin,
    VerifyUserCode,
    UserRealEstates,
    AddRealEstate,
    GetUserRealEstateByID,
    ForgotPassword,
    AddWishList,
    GetWishList,
    AddImage,
    AddToVIP,
    UpateRealEstate,
    ChangePassword,
    SendCodeAgain
}
