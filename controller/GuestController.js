const database = require('../db/index.js')
const {status} = require('../utils/status')

const GetSpecificationsForType = async (req, res) =>{
    const {type_id, category_id, lang} = req.params
    try {
        const query_text = `
            SELECT s.id AS specification_id, s.is_multiple, s.is_required, st.name,

                (SELECT json_agg(value) FROM (
                    SELECT sv.id AS value_id, sv.absolute_value, svt.name 
                        FROM specification_values sv
                            LEFT JOIN specification_value_translations svt 
                                ON svt.spec_value_id = sv.id AND svt.language_id = l.id
                        WHERE sv.spec_id = s.id AND sv.enable = true
                        ORDER BY CASE WHEN sv.absolute_value ~ '\\d+' THEN cast(sv.absolute_value as 
                            integer) ELSE null END ASC, sv.absolute_value ASC
                )value) AS values
                
            FROM specifications s
                    INNER JOIN languages l 
                        ON l.language_code = $1
                    LEFT JOIN specification_translations st 
                        ON st.spec_id = s.id AND st.language_id = l.id
                    INNER JOIN ctypes ctp
                        ON ctp.type_id = $2 AND ctp.category_id = $3
                    INNER JOIN type_specifications ts 
                        ON ts.spec_id = s.id 
            WHERE ts.ctype_id = ctp.id AND ts.deleted = false AND s.is_active = true
            ORDER BY ts.queue_position ASC
    ` 
        const {rows} = await database.query(query_text, [lang, type_id, category_id])
        // console.log(rows)
        res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(e)
    }
}

const GetSpecForTypeSearch = async (req, res) =>{
    const {type_id, lang} = req.params
    try {
        const query_text = `
            SELECT s.id AS specification_id, st.name,

                (SELECT json_agg(value) FROM (
                    SELECT sv.id AS value_id, sv.absolute_value, svt.name 
                        FROM specification_values sv
                            LEFT JOIN specification_value_translations svt 
                                ON svt.spec_value_id = sv.id AND svt.language_id = l.id
                        WHERE sv.spec_id = s.id AND sv.enabled = true
                        ORDER BY CASE WHEN sv.absolute_value ~ '\\d+' THEN cast(sv.absolute_value as 
                            integer) ELSE null END ASC, sv.absolute_value ASC
                )value) AS values
                
            FROM specifications s
                    INNER JOIN languages l 
                        ON l.language_code = $1
                    LEFT JOIN specification_translations st 
                        ON st.spec_id = s.id AND st.language_id = l.id
                    INNER JOIN type_specifications ts 
                        ON ts.spec_id = s.id
            WHERE ts.type_id = $2 AND ts.deleted = false AND s.is_active = false
            ORDER BY ts.queue_position ASC
    ` 
        const {rows} = await database.query(query_text, [lang, type_id])

        res.status(status.success).json({"rows":rows})
    } catch (e) {
        res.json({"message":"something went wrog"})
        throw e
    }
}

const GetNotRequiredSpecificationsForType = async (req, res) =>{
    const {type_id, lang} = req.params
    try {
        const query_text = `
                    SELECT s.id AS specification_id, s.is_multiple, s.is_required, st.name,

                        (SELECT json_agg(value) FROM (
                            SELECT sv.id AS value_id, sv.absolute_value, svt.name 
                                FROM specification_values sv
                                    LEFT JOIN specification_value_translations svt 
                                        ON svt.spec_value_id = sv.id AND svt.language_id = l.id
                                WHERE sv.spec_id = s.id
                        )value) AS values
                        
                    FROM specifications s
                            INNER JOIN languages l ON l.language_code = $1
                            LEFT JOIN specification_translations st ON st.spec_id = s.id AND st.language_id = l.id
                            INNER JOIN type_specifications ts ON ts.spec_id = s.id
                    WHERE ts.type_id = $2 AND s.is_required = 'false'               
                
        ` 
        console.log(query_text)
        const {rows} = await database.query(query_text, [lang, type_id])

        res.json({"rows":rows})
    } catch (e) {
        res.json({"message":"something went wrog"})
        throw e
    }

}

const Languages = async (req, res) =>{

    const query_text = `
        SELECT language, language_code FROM languages
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.json({"rows":rows})
    } catch (e) {
        console.log(e)
        throw e
    }
}

const AllRealEstate = async (req, res) =>{
    const {spec_values, location_id, type_id, main_type_id, category_id, price, area, images, position, page, limit} = req.query
    const {lang} = req.params
    let offSet = ``
    let ctype_part =``
    let spec_part = ``
    let where_part = ``
    let image_part =``
    let order_part = `ORDER BY re.id DESC`
    
    //--------------------Pagination part ---------------------//
    if (page !== 'null' && limit !== 'null' && page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    
    ///------------------------main_type_id ------------------//
    if(main_type_id){
        where_part += ` AND t.main_type_id = ${main_type_id}`
    }
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
    if (spec_values?.length){
        spec_part += ` AND (${spec_values?.map(item =>` resv.spec_value_id = ${item}`).join('OR')})`      
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
    
    //----------about to have an image---------// 
    if (images && images !== null && images !== 'undefined'){
        image_part = `INNER JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }else{
        image_part = `LEFT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    let vip_limit = ``
    if (limit){
        // console.log("i am in limit if")
        vip_limit = limit/2;
    }else{
        vip_limit = 5;
    }
    if (page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }    
    
    const query_text =`
    WITH selected AS 
        (SELECT DISTINCT ON (re.id) re.id, rep.price, u.phone::text, re.created_at::text, u.full_name,
        concat(
            CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' END || lt.translation) AS location,
        (SELECT real_estate_name(re.id, l.id, tt.name, area)),
        
        (SELECT json_agg(dest) FROM (
            SELECT rei.destination FROM real_estate_images rei
            WHERE rei.real_estate_id = re.id AND rei.is_active = true
        )dest) AS images

        FROM real_estates re 
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            LEFT JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = 'true'
            LEFT JOIN languages l 
                ON l.language_code = $2
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
            LEFT JOIN real_estate_specification_values resv
                ON resv.real_estate_id = re.id
            LEFT JOIN users u
                ON u.id = re.user_id
            INNER JOIN types t
                ON t.id = cp.type_id
            INNER JOIN categories c 
                ON c.id = cp.category_id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 ${where_part} ${spec_part}
        ORDER BY  re.id DESC  ${offSet}), 

                    
    inserted AS (INSERT INTO view_address 
        SELECT $1,  id, 1 FROM selected 
        ON CONFLICT (ip_address, real_estate_id, view_type_id) DO NOTHING)
    
    SELECT
         (SELECT COUNT (count.id) FROM (SELECT  DISTINCT ON (re.id) re.id FROM real_estates re  
            LEFT JOIN vip_real_estates vre 
                ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            INNER JOIN real_estate_specification_values resv
                ON resv.real_estate_id = re.id
            INNER JOIN types t
                ON t.id = cp.type_id
            INNER JOIN categories c 
                ON c.id = cp.category_id
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4  ${where_part} ${spec_part}   
        ) AS count),

        (SELECT json_agg(res) FROM 
            selected 
        res) AS real_estates_all
        `
    try {
        // console.log(query_text)
        const {rows} = await database.query(query_text, [ip, lang])
        let i = 0;
        let j = 0;
        let k = 0;
        let real_estates_all = []
        if (rows[0].vip_real_estates){
            for ( k; k<(rows[0].real_estates_all.length+rows[0].vip_real_estates.length); k++){
                if (k%3 == 2 && rows[0].vip_real_estates[i]){
                    real_estates_all[k] = rows[0].vip_real_estates[i];
                    i++;
                }else{
                    if(rows[0].real_estates_all[k]){
                        real_estates_all[k] = rows[0].real_estates_all[j]
                        j++
                    }
                }
            }
        }else{
            real_estates_all = rows[0].real_estates_all
        }
        // console.log(rows);
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }

}

const RealEstatePositions = async (req, res) =>{
    const {spec_values, location_id, type_id, main_type_id, category_id, price, area, images, position, page, limit} = req.query
    const {lang} = req.params
    let offSet = ``
    let ctype_part =``
    let spec_part = ``
    let where_part = ``
    let image_part =``
    let order_part = `ORDER BY re.id DESC`
    
    //--------------------Pagination part ---------------------//
    if (page !== 'null' && limit !== 'null' && page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    
    ///------------------------main_type_id ------------------//
    if(main_type_id){
        where_part += ` AND t.main_type_id = ${main_type_id}`
    }
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
    if (spec_values?.length){
        spec_part += ` AND (${spec_values?.map(item =>`resv.spec_value_id = ${item}`).join('OR')})`      
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
    
    //----------about to have an image---------// 
    if (images && images !== null && images !== 'undefined'){
        image_part = `INNER JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }else{
        image_part = `LEFT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    let vip_limit = ``
    if (limit){
        // console.log("i am in limit if")
        vip_limit = limit/2;
    }else{
        vip_limit = 5;
    }
    if (page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }    
    const position_part = `
    (SELECT json_agg(pos) FROM(
        SELECT position[0] AS x, position[1] AS y
            FROM real_estates 
            WHERE real_estates.id = $1                 
    )pos) AS position,`
    
    const query_text =`
    WITH selected AS 
        (SELECT DISTINCT ON (re.id) re.id, ${position_part}

        FROM real_estates re 
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            INNER JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = 'true'
            INNER JOIN languages l 
                ON l.language_code = $2
            INNER JOIN type_translations tt 
                ON tt.type_id = cp.type_id AND tt.language_id = l.id
            LEFT JOIN vip_real_estates vre 
                ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
            LEFT JOIN location_translations lt
                ON lt.location_id = re.location_id AND lt.language_id = l.id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            LEFT JOIN location_translations ltt
                ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
            INNER JOIN real_estate_specification_values resv
                ON resv.real_estate_id = re.id
            INNER JOIN users u
                ON u.id = re.user_id
            INNER JOIN types t
                ON t.id = cp.type_id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 AND vre.id IS NULL ${where_part} ${spec_part}
        ORDER BY  re.id DESC  ), 

                    
    inserted AS (INSERT INTO view_address 
        SELECT $1,  id, 1 FROM selected 
        ON CONFLICT (ip_address, real_estate_id, view_type_id) DO NOTHING)
    
    SELECT
         (SELECT COUNT (count.id) FROM (SELECT  DISTINCT ON (re.id) re.id FROM real_estates re  
            LEFT JOIN vip_real_estates vre 
                ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            INNER JOIN real_estate_specification_values resv
                ON resv.real_estate_id = re.id
            INNER JOIN types t
                ON t.id = cp.type_id
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 ${where_part} ${spec_part}   
        ) AS count),

        (SELECT json_agg(res) FROM 
            selected 
        res) AS real_estates_all
        `
    try {
        const {rows} = await database.query(query_text, [ip, lang])
        let i = 0;
        let j = 0;
        let k = 0;
        let real_estates_all = []
        if (rows[0].vip_real_estates){
            for ( k; k<(rows[0].real_estates_all.length+rows[0].vip_real_estates.length); k++){
                if (k%3 == 2 && rows[0].vip_real_estates[i]){
                    real_estates_all[k] = rows[0].vip_real_estates[i];
                    i++;
                }else{
                    if(rows[0].real_estates_all[k]){
                        real_estates_all[k] = rows[0].real_estates_all[j]
                        j++
                    }
                }
            }
        }else{
            real_estates_all = rows[0].real_estates_all
        }
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }

}

const CountForFilter = async (req, res) =>{
    const {specifications, type_id, category_id, price, area, images, position, page, limit} = req.query
    const {lang} = req.params
    let spec_part = ``
    let where_part = ``
    let image_part =``
    let order_part = `ORDER BY re.id DESC`
    
    //--------------------Pagination part ---------------------//
    if (page !== 'null' && limit !== 'null' && page && limit){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    
    //---------------------ctype part -----------------------//
    if (type_id !== 'null' && type_id){
        where_part = ` AND cp.type_id = ${type_id}` 
    }

    if (category_id && category_id !== 'null'){
        where_part = ` AND cp.category_id = ${category_id}` 
    }
    
    //-------------------specification part-----------------//
    if (specifications?.length){
        for (let i=0; i<specifications.length; i++){
            values = specifications[i].values
            spec_part += ` AND (${values?.map(item =>`resv.spec_value_id = ${item}`).join('OR')})`
        }        
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
    
    //----------about to have an image---------// 
    if (images && images !== null && images !== 'undefined'){
        image_part = `RIGHT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }else{
        image_part = `LEFT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }
    const query_text =`
        SELECT COUNT (id) FROM (
            SELECT DISTINCT ON (re.id) re.id
            FROM real_estates re  
                INNER JOIN ctypes cp 
                    ON cp.id = re.ctype_id
                INNER JOIN types t
                    ON t.id = cp.type_id
                INNER JOIN categories c 
                    ON c.id = cp.category_id
                INNER JOIN real_estate_specification_values resv
                    ON resv.real_estate_id = re.id
                LEFT JOIN locations lc 
                    ON lc.id = re.location_id
                WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 
                    ${where_part} ${spec_part}) AS real_estaates
    `
    try {
        // console.log(query_text)
        const {rows} = await database.query(query_text, [])        
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }

}

const FlatFilter = async (req, res) =>{

    const query_text = `
        SELECT 
            (SELECT json_agg(flat) FROM(

            
                (SELECT c.id AS category_id, 
                    
                    (SELECT json_agg(co) FROM (
                        SELECT sv.absolute_value, sv.id AS spec_id, 
                            
                            (SELECT json_agg(cou) FROM (
                                
                                SELECT COUNT(*) 
                                FROM real_estates re
                                INNER JOIN ctypes cp
                                    ON cp.category_id = c.id AND cp.type_id = 3
                                INNER JOIN real_estate_specification_values resv
                                    ON resv.real_estate_id = re.id AND resv.spec_value_id = sv.id
                            )cou) AS estate_count
                        
                        FROM specification_values sv 
                        WHERE sv.spec_id = 1
                            ORDER BY CASE WHEN sv.absolute_value ~ '\\d+' THEN cast(sv.absolute_value as 
                                integer) ELSE null END ASC, sv.absolute_value ASC
                    )co) AS ready_search)

            )flat) AS flat_ready_filter
        FROM categories c 
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const TypeCategoryController = async (req, res) =>{
    const {lang} = req.params
    const query_text = `
        SELECT c.id, ct.name, 
            (SELECT json_agg(mai) FROM (
                SELECT ttt.name, ty.id,     
                
                    (SELECT json_agg(type) FROM 
                        (SELECT t.id, tt.name   
                        FROM types t
                            INNER JOIN ctypes 
                                ON ctypes.type_id = t.id 
                            INNER JOIN type_translations tt 
                                ON tt.type_id = t.id 
                        WHERE ctypes.category_id = c.id AND tt.language_id = l.id AND t.main_type_id = ty.id AND t.main_type_id IS NOT NULL

                    )type) AS sub_types
            
                FROM types ty
                    INNER JOIN type_translations ttt
                        ON ttt.type_id = ty.id AND ttt.language_id = l.id
                WHERE ty.main_type_id IS NULL

            )mai) AS main_types

            FROM categories c
                INNER JOIN languages l 
                    ON l.language_code = $1
                INNER JOIN category_translations ct 
                    ON ct.category_id = c.id AND ct.language_id = l.id
    `
    try {
        const {rows} = await database.query(query_text, [lang])
        // console.log(rows)
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetRealEstateByID = async (req, res) => {
    const {lang, id} = req.params
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)

    const position_part = `
    (SELECT json_agg(pos) FROM(
        SELECT position[0] AS x, position[1] AS y
            FROM real_estates 
            WHERE real_estates.id = $1                 
    )pos) AS position,`

    const query_text = `
        WITH inserted AS (
            INSERT INTO view_address VALUES ($3, $1, 2)
            ON CONFLICT DO NOTHING)

        SELECT DISTINCT ON (re.id) re.area::text, rep.price::text, ret.description, 
            re.created_at::text, ${position_part}
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location,
            real_estate_name($1, l.id, tt.name, area), u.phone::text, ott.translation AS owner_type,
            
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
                ON l.language_code = $2
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
        WHERE re.id = $1 AND re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4
    `
    try {
        const {rows} = await database.query(query_text, [id, lang, ip])
        // console.log(rows)
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetTypesCategory = async (req, res) => {
    const {lang} = req.params
    const {cat_id, main_id} = req.params
    const query_text = `
        SELECT tt.name, t.id 
        FROM ctypes ctp 
            INNER JOIN languages l 
                ON l.language_code = $1
            INNER JOIN types t 
                ON t.id = ctp.type_id AND t.main_type_id = $3
            INNER JOIN type_translations tt 
                ON tt.type_id = t.id AND tt.language_id = l.id
        WHERE ctp.category_id = $2
    `
    try {
        const {rows} = await database.query(query_text, [lang, cat_id, main_id])
        // console.log(rows)
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(e)
    }
}

const GetLocations = async (req, res) =>{
    const {lang} = req.params
    const query_text = `
        SELECT l.id, lt.translation AS name
        FROM locations l
            INNER JOIN languages lg 
                ON lg.language_code = '${lang}'
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = lg.id
        WHERE l.main_location_id IS NULL
    `
    try {
        const {rows} = await database.query(query_text, [])
        // console.log(rows)
        return res.status(200).json({"rows":rows})
    } catch (e) {
        console.log(e)
        throw e
    }
}

const GetRegions = async (req, res) =>{
    const {id, lang} = req.params
    const query_text = `
        SELECT l.id, lt.translation AS name
        FROM locations l
            INNER JOIN languages lg 
                ON lg.language_code = '${lang}'
            INNER JOIN location_translations lt
                ON lt.location_id = l.id AND lt.language_id = lg.id
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

const GetWishList = async (req, res) =>{
    const {lang} = req.params
    const {real_estates} = req.body
    console.log(req.body)
    // console.log(real_estates)
   
    try {
        const query_text = `
        SELECT 
         (SELECT json_agg(res) FROM ( 
            SELECT DISTINCT ON (re.id) re.id, rep.price::text, vre.id AS VIP, u.phone,
             concat(
                 CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' END || lt.translation) AS location,
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
                 INNER JOIN languages l ON l.language_code = $1
                 INNER JOIN type_translations tt 
                     ON tt.type_id = cp.type_id AND tt.language_id = l.id
                 LEFT JOIN vip_real_estates vre 
                     ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
                 LEFT JOIN location_translations lt
                     ON lt.location_id = re.location_id AND lt.language_id = l.id
                 LEFT JOIN locations lc 
                     ON lc.id = re.location_id
                 LEFT JOIN location_translations ltt
                     ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
                 INNER JOIN real_estate_specification_values resv
                     ON resv.real_estate_id = re.id
                 INNER JOIN users u
                     ON u.id = re.user_id
             WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 AND re.id IN (${real_estates?.map(item => `${item}`).join(',')})
         ) res) AS real_estates_all
     `
        const {rows} = await database.query(query_text, [lang])
        console.log(rows)
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.success).send(false)
    }
}

const TypeImages = async (req, res) =>{
    const {main_type_id, lang} = req.params
    const query_text = `
        SELECT t.id, tt.name, ti.destination 
        FROM types t.id
            INNER JOIN type_translations 
                ON tt.type_id = t.id
            LEFT JOIN type_image ti
                ON ti.type_id = t.id
            INNER JOIN languages l 
                ON l.language_code = '${lang}' AND tt.language_id = l.id 
            WHERE t.main_type_id = ${main_type_id}
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(e)
    }
}

const RoomSpecController = async (req, res) =>{
    const query_text = `
        SELECT id, absolute_value 
        FROM specification_values
        WHERE spec_id = 1
        ORDER BY CASE WHEN absolute_value ~ '\\d+' THEN cast(absolute_value as 
            integer) ELSE null END ASC, absolute_value ASC
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
    GetSpecificationsForType,
    GetSpecForTypeSearch,
    GetNotRequiredSpecificationsForType,
    Languages,
    AllRealEstate,
    TypeCategoryController,
    GetRealEstateByID,
    GetTypesCategory,
    GetLocations,
    GetRegions,
    CountForFilter,
    FlatFilter,
    TypeImages,
    GetWishList,
    RoomSpecController,
    RealEstatePositions
}   