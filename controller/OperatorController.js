require('dotenv').config()
const database = require('../db/index.js');
const {status} = require('../utils/status.js')
const AdminHelper = require('../utils/index.js')

const OperatorLogin = async (req, res) =>{
    /********************
     {
         "phone":"61123141"
         "password":"61123141"
     }
     ************/
    const {phone, password} = req.body
    const query_text = `
        SELECT * FROM users u WHERE u.phone = $1 AND role_id = 2
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            const message = {type:"manual", name:"telefon", message:"'Telefon ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.notfound).json(message)
        }
        const is_password_same = await AdminHelper.ComparePassword(password, user.password)
        if (!is_password_same){
            const message = {type:"manual", name:"telefon", message:"'Telefon ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.bad).json(message)
        }
        const data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        const access_token = await AdminHelper.GenerateOperatorAccessToken(data)
        const refresh_token = await AdminHelper.GenerateOperatorRefreshToken(data)
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Operation wasn't succesfully"})
    }

}

const LoadOperator = async (req, res) =>{
    const user_id = req.user.id
    try {
        const {rows} = await database.query(`SELECT * FROM users WHERE id = ${user_id} AND role_id = 2`, [])
        const user = rows[0]
        const data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        const access_token = await AdminHelper.GenerateOperatorAccessToken(data)
        const refresh_token = await AdminHelper.GenerateOperatorRefreshToken(data)
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
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
            WHERE re.is_active IS NULL 
                AND re.status_id <> 2 AND re.status_id <> 4 
                AND selected = 'false' AND (selected_time::tsrange @> localtimestamp IS NULL) OR (NOT (selected_time::tsrange @> localtimestamp))
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

            (SELECT COUNT(count) 
                FROM view_count WHERE real_estate_id = re.id AND view_type_id = 2 AND is_active=true) AS view_count,
            
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
                    AND selected = 'false' AND (selected_time::tsrange @> localtimestamp IS NULL) OR (NOT (selected_time::tsrange @> localtimestamp))
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

const ConfirmVIP = async (req, res) =>{
    
}

module.exports = {
    OperatorLogin,
    ActivateRealEstate,
    NotActivatedEstates,
    ConfirmVIP,
    GetConfirmRealEstates,
    LoadOperator,
    RealestateByID
}