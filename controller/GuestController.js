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

const GetSpecificationsForTypes = async (req, res) =>{
    const {category_id, lang} = req.params
    const {type_id} = req.query;
    let types = []
    if(type_id){
        try {
            types = JSON.parse(type_id);
        } catch (e) {
            throw e
            types = ``
        }
    }
    let join_part = ``
    if (types && types.length > 0){
        for(let i=0; i<types.length; i++){
            join_part += `
                INNER JOIN ctypes ctp${i}
                    ON ctp${i}.type_id = ${types[i]} AND ctp${i}.category_id = $2
                INNER JOIN type_specifications ts${i} 
                    ON ts${i}.spec_id = s.id AND ts${i}.ctype_id = ctp${i}.id AND ts${i}.deleted = false`
        }
    }else{
        return res.status(status.success).send(true)
    }
    console.log(types)
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
                     ${join_part}
            WHERE s.is_active = true
            ORDER BY ts0.queue_position ASC
    ` 
        const {rows} = await database.query(query_text, [lang, category_id])
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
    const {spec_values, user_id, location_id, type_id, main_type_id, category_id, price, area, images, position, page, limit, owner_id} = req.query
    const {lang} = req.params
    // console.log(req.query)
    console.log(type_id)
    let user_wish = ``
    let wish_list_join = ``
    if(user_id){
        user_wish = ` uwl.id AS wish_list, `
        wish_list_join = ` LEFT JOIN user_wish_list uwl
            ON uwl.user_id = ${user_id} AND uwl.real_estate_id = re.id`
    }else{
        user_wish = ` 0 AS wish_list, `
    }
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
    //-------------only from excepted owner-----------/
    if(owner_id){
        where_part += ` AND u.owner_id = ${owner_id} `
    }
    ///------------------------main_type_id ------------------//
    let types = []
    if(type_id){
        try {
            types = JSON.parse(type_id);
        } catch (e) {
            throw e
            types = ``
        }
    }

    if (types && types.length > 0){
        where_part += ` AND cp.type_id IN (${types.map(item => `${item}`).join(',')})` 
    }
    console.log(types)
    if(main_type_id){
        where_part += ` AND t.main_type_id = ${main_type_id}`
    }
    //--------------location part -----------------------//
    if (location_id && location_id !== 'null'){
        where_part += ` AND (lc.id = ${location_id} OR lc.main_location_id = ${location_id})`
    }

    //---------------------ctype part -----------------------//
    

    if (category_id ){
        where_part += ` AND cp.category_id = ${category_id}` 
    }

    //---------price part-------//
    let price1 = {}
    if(price){
        try {
            price1 = JSON.parse(price);
        } catch (e) {
            price1 = {};
        }
    }
    if (price1?.min && price1?.max){
        where_part += ` AND (rep.price > ${price1.min} AND rep.price < ${price1.max})`
    }else if(price1?.min && !price1?.max){
        where_part += ` AND rep.price > ${price1.min}`
    }else if(!price1?.min && price1?.max){
        where_part += ` AND rep.price < ${price1.max}`
    }else{
        where_part +=``
    }

    //---------------area part------//
    let area1 = {}
    if(area){
        try {
            area1 = JSON.parse(area);
        } catch (e) {
            area1 = {};
        }
    }

    if (area1?.min && area1?.max){
        where_part += ` AND re.area > ${area1.min}  AND re.area < ${area1.max}`
    }else if(area1?.min && !area1?.max){
        where_part += ` AND re.area > ${area1?.min}`
    }else if(!area1?.min && area1?.max){
        where_part += ` AND re.area < ${area1.max}`
    }else{
        where_part +=``
    }
   
    //-------------specificatoin values search------------//
    let specifications = ``
    if(spec_values){
        try {
            specifications = JSON.parse(spec_values)
            console.log(specifications)
            if(specifications.length){
                for(let i=0; i<specifications.length; i++){
                    if(specifications[i]?.values.length){
                        spec_part += `
                            INNER JOIN real_estate_specification_values resv${i}
                                ON resv${i}.real_estate_id = re.id AND resv${i}.spec_id = ${specifications[i]?.id} AND (${specifications[i].values.map(item => `resv${i}.spec_value_id = ${item}`).join('OR ')})    
                        `
                    }
                    
                }
            }
        } catch (e) {
            console.log(e)
        }   
    }
    
    //----------about to have an image---------// 
    if (images && images !== null && images !== 'undefined'){
        image_part = `INNER JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }else{
        image_part = `LEFT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }
    console.log(spec_values)
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
        (SELECT DISTINCT ON (re.id) re.id, rep.price::text, u.phone::text, to_char(re.created_at, 'YYYY-MM-DD') AS created_at, u.full_name, ${user_wish} u.owner_id,
        concat(lt.translation || ', ' || CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation  END ) AS location,
        (SELECT real_estate_name(re.id, l.id, tt.name, area)), vre.vip_type_id,
        
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
            LEFT JOIN location_translations lt
                ON lt.location_id = re.location_id AND lt.language_id = l.id
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
            LEFT JOIN location_translations ltt
                ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
            LEFT JOIN vip_real_estates vre
                ON vre.real_estate_id = re.id AND vre.vip_dates::tsrange @> localtimestamp
                ${spec_part}
                ${wish_list_join}
            INNER JOIN users u
                ON u.id = re.user_id
            LEFT JOIN types t
                ON t.id = cp.type_id
            LEFT JOIN categories c 
                ON c.id = cp.category_id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 ${where_part} 
        ORDER BY  re.id DESC  ${offSet}), 

                    
    inserted AS (INSERT INTO view_address 
        SELECT $1,  id, 1 FROM selected 
        ON CONFLICT (ip_address, real_estate_id, view_type_id) DO NOTHING)
    
    SELECT
         (SELECT COUNT (count.id) FROM (SELECT  DISTINCT ON (re.id) re.id FROM real_estates re  
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
                ${spec_part} 
            INNER JOIN types t
                ON t.id = cp.type_id
            INNER JOIN users u
                ON u.id = re.user_id
            INNER JOIN categories c 
                ON c.id = cp.category_id
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4  ${where_part}
            ORDER BY vre.vip_type_id ASC NULLS LAST, vre.id ASC NULLS LAST, vre.created_at
        ) AS count),

        (SELECT json_agg(res) FROM 
            selected 
        res) AS real_estates_all
        `
    try {
        const {rows} = await database.query(query_text, [ip, lang])
        // console.log(rows);
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }

}

const RealEstatePositions = async (req, res) =>{
    const {spec_values, location_id, type_id, main_type_id, category_id, price, area, images, position, page, limit, owner_id} = req.query
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
    let types = []
    if(type_id){
        try {
            types = JSON.parse(type_id);
        } catch (e) {
            throw e
            types = ``
        }
    }

    if (types && types.length > 0){
        where_part += ` AND cp.type_id IN (${types.map(item => `${item}`).join(',')})` 
    }
    if (category_id && category_id !== 'null'){
        where_part += ` AND cp.category_id = ${category_id}` 
    }

    //---------price part-------//
    let price1 = {}
    if(price){
        try {
            price1 = JSON.parse(price);
        } catch (e) {
            price1 = {};
        }
    }
    
    // console.log(price1, "hello parsed price")
    // console.log(price)
    //-------------only from excepted owner-----------/
    if(owner_id){
        where_part += ` AND u.owner_id = ${owner_id} `
    }
    if (price1?.min && price1?.max){
        where_part += ` AND (rep.price > ${price1.min} AND rep.price < ${price1.max})`
    }else if(price1?.min && !price1?.max){
        where_part += ` AND rep.price > ${price1.min}`
    }else if(!price1?.min && price1?.max){
        where_part += ` AND rep.price < ${price1.max}`
    }else{
        where_part +=``
    }

    //---------------area part------//
    let area1 = {}
    if(area){
        try {
            area1 = JSON.parse(area);
        } catch (e) {
            area1 = {};
        }
    }

    if (area1?.min && area1?.max){
        where_part += ` AND re.area > ${area1.min}  AND re.area < ${area1.max}`
    }else if(area1?.min && !area1?.max){
        where_part += ` AND re.area > ${area1?.min}`
    }else if(!area1?.min && area1?.max){
        where_part += ` AND re.area < ${area1.max}`
    }else{
        where_part +=``
    }
   
    //-------------specificatoin values search------------//
    let specifications = ``
    if(spec_values){
        try {
            specifications = JSON.parse(spec_values)
            if(specifications.length){
                for(let i=0; i<specifications.length; i++){
                    if(specifications[i]?.values.length){
                        spec_part += `
                            INNER JOIN real_estate_specification_values resv${i}
                                ON resv${i}.real_estate_id = re.id AND resv${i}.spec_id = ${specifications[i]?.id} AND (${specifications[i].values.map(item => `resv${i}.spec_value_id = ${item}`).join('OR ')})    
                        `
                    }
                    
                }
            }
        } catch (e) {
            console.log(e)
        }   
    }
    
    //----------about to have an image---------// 
    if (images && images !== null && images !== 'undefined'){
        image_part = `INNER JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }else{
        image_part = `LEFT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }
    // console.log(spec_values)
    
    const query_text =`
    SELECT DISTINCT ON (re.id) re.id, position[0] AS lat, position[1] AS lng, rep.price

        FROM real_estates re 
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            INNER JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = 'true'
            LEFT JOIN locations lc 
                ON lc.id = re.location_id
                ${spec_part} 
            INNER JOIN users u
                ON u.id = re.user_id
            INNER JOIN types t
                ON t.id = cp.type_id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 ${where_part} ${spec_part}
        `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }

}

const CountForFilter = async (req, res) =>{
    const {spec_values, location_id, type_id, main_type_id, category_id, price, area, images, position, page, limit, owner_id} = req.query
    const {lang} = req.params
    let where_part = ``
    let spec_part = ``
    
    ///------------------------main_type_id ------------------//
    if(main_type_id){
        where_part += ` AND t.main_type_id = ${main_type_id}`
    }
    //--------------location part -----------------------//
    if (location_id && location_id !== 'null'){
        where_part += ` AND (lc.id = ${location_id} OR lc.main_location_id = ${location_id})`
    }
    //-------------only from excepted owner-----------/
    if(owner_id){
        where_part += ` AND u.owner_id = ${owner_id} `
    }
    //---------------------ctype part -----------------------//
    let types = []
    if(type_id){
        try {
            types = JSON.parse(type_id);
        } catch (e) {
            throw e
            types = ``
        }
    }

    if (types && types.length > 0){
        where_part += ` AND cp.type_id IN (${types.map(item => `${item}`).join(',')})` 
    }

    if (category_id && category_id !== 'null'){
        where_part += ` AND cp.category_id = ${category_id}` 
    }

    //---------price part-------//
    let price1 = {}
    if(price){
        try {
            price1 = JSON.parse(price);
        } catch (e) {
            price1 = {};
        }
    }

    if (price1?.min && price1?.max){
        where_part += ` AND (rep.price > ${price1.min} AND rep.price < ${price1.max})`
    }else if(price1?.min && !price1?.max){
        where_part += ` AND rep.price > ${price1.min}`
    }else if(!price1?.min && price1?.max){
        where_part += ` AND rep.price < ${price1.max}`
    }else{
        where_part +=``
    }

    //---------------area part------//
    let area1 = {}
    if(area){
        try {
            area1 = JSON.parse(area);
        } catch (e) {
            area1 = {};
        }
    }

    if (area1?.min && area1?.max){
        where_part += ` AND re.area > ${area1.min}  AND re.area < ${area1.max}`
    }else if(area1?.min && !area1?.max){
        where_part += ` AND re.area > ${area1?.min}`
    }else if(!area1?.min && area1?.max){
        where_part += ` AND re.area < ${area1.max}`
    }else{
        where_part +=``
    }

    let specifications = ``
    if(spec_values){
        try {
            specifications = JSON.parse(spec_values)
            console.log(specifications)
            if(specifications.length){
                for(let i=0; i<specifications.length; i++){
                    if(specifications[i]?.values.length){
                        spec_part += `
                            INNER JOIN real_estate_specification_values resv${i}
                                ON resv${i}.real_estate_id = re.id AND resv${i}.spec_id = ${specifications[i]?.id} AND (${specifications[i].values.map(item => `resv${i}.spec_value_id = ${item}`).join('OR ')})    
                        `
                    }
                    
                }
            }
        } catch (e) {
            console.log(e)
        }   
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
                INNER JOIN real_estate_prices rep 
                    ON rep.real_estate_id = re.id AND rep.is_active = 'true'
                ${spec_part}
                LEFT JOIN locations lc 
                    ON lc.id = re.location_id
                INNER JOIN users u
                    ON u.id = re.user_id
                WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 
                    ${where_part} ) AS real_estaates
    `
    try {
        // console.log(query_text)
        const {rows} = await database.query(query_text, [])   
        console.log(rows)     
        return res.status(status.success).json({"rows":rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }

}

const FlatFilter = async (req, res) =>{

    const query_text = `

            SELECT c.id AS category_id, 3 AS type_id, 1 AS spec_id,
                    
                    (SELECT json_agg(co) FROM (
                        SELECT sv.absolute_value::text, sv.id AS value_id, 
                            
                            
                                
                                (SELECT COUNT(*) 
                                FROM real_estates re
                                INNER JOIN ctypes cp
                                    ON cp.category_id = c.id AND cp.type_id = 3
                                INNER JOIN real_estate_specification_values resv
                                    ON resv.real_estate_id = re.id AND resv.spec_value_id = sv.id
                                    WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4
                            )
                        
                        FROM specification_values sv 
                        WHERE sv.spec_id = 1 AND sv.enable = true
                            ORDER BY CASE WHEN sv.absolute_value ~ '\\d+' THEN cast(sv.absolute_value as 
                                integer) ELSE null END ASC, sv.absolute_value ASC
                    )co) AS ready_search

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

const CommerceFilter = async (req, res) =>{
    const {lang} = req.params

    const query_text = `
        SELECT c.id AS category_id, (
            
            SELECT json_agg(esta) FROM (
                SELECT t.id AS type_id, tt.name, destination,
            
                    (SELECT COUNT(*) 
                        FROM real_estates re
                            INNER JOIN ctypes cp 
                                ON cp.id = re.ctype_id
                            WHERE re.is_active = 'true' AND re.status_id <> 2 
                                AND re.status_id <> 4 AND cp.type_id = t.id AND cp.category_id = c.id 
                    )

                FROM types t
                    INNER JOIN languages l
                        ON l.language_code = '${lang}'
                    INNER JOIN ctypes cp 
                        ON cp.category_id = c.id AND cp.type_id = t.id
                    INNER JOIN type_translations tt
                        ON tt.type_id = t.id AND tt.language_id = l.id 
                    LEFT JOIN ctype_image ci
                        ON ci.ctype_id = cp.id
                    WHERE t.main_type_id = 2
                    
        )esta) estates

        FROM categories c
    `
    try {
        const {rows} = await database.query(query_text, [])
        // console.log(rows)
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
        SELECT position[0] AS lat, position[1] AS lng
            FROM real_estates 
            WHERE real_estates.id = $1                 
    )pos) AS position,`

    const query_text = `
        WITH inserted AS (
            INSERT INTO view_address VALUES ($3, $1, 2)
            ON CONFLICT DO NOTHING)

        SELECT DISTINCT ON (re.id) re.area::text, rep.price::text, ret.description, ctp.type_id, ctp.category_id,   
            re.created_at::text, ${position_part}
            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location, 
            real_estate_name($1, l.id, tt.name, area), u.phone::text, ott.translation AS owner_type, 
            u.full_name, u.id::text AS user_id,
            (SELECT COUNT(real.id)::text FROM real_estates real WHERE real.user_id = re.user_id) AS user_real_estate_count,
            
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
   if(!real_estates?.length){
        return res.status(status.success).json({"rows":[]})
   }
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
                 LEFT JOIN real_estate_specification_values resv
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
        return res.status(status.error).send(false)
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

        SELECT 1 AS spec_id, (SELECT json_agg(ro) FROM
            (SELECT id, absolute_value 
            FROM specification_values
            WHERE spec_id = 1
            ORDER BY CASE WHEN absolute_value ~ '\\d+' THEN cast(absolute_value as 
                integer) ELSE null END ASC, absolute_value ASC
        )ro) AS rooms
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetUserRealEstates = async (req, res) =>{
    const {id,  lang} = req.params
    const {page, limit} = req.query
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET ${page*limit} LIMIT ${limit}`
    }
    const query_text = `
        SELECT DISTINCT ON (re.id) re.id, rep.price::text, u.phone::text, re.created_at::text, u.full_name,
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
            LEFT JOIN real_estate_specification_values resv
                ON resv.real_estate_id = re.id
            LEFT JOIN users u
                ON u.id = re.user_id
            INNER JOIN types t
                ON t.id = cp.type_id
            INNER JOIN categories c 
                ON c.id = cp.category_id
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 AND re.user_id = $1
        ORDER BY  re.id DESC  ${offSet}
    `
    try {
        const {rows} = await database.query(query_text, [id, lang])
        console.log(rows)
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}

const GetTypesOfCategory = async (req, res) =>{
    const {id} = req.params
    const query_text = `
        SELECT t.id, tt.name, cpi.destination 
        FROM types t  
            INNER JOIN type_translations tt
                ON tt.type_id = t.id AND language_id = 2
            INNER JOIN ctypes cp 
                ON cp.category_id = ${id}
            INNER JOIN ctype_image cpi
                ON cpi.ctype_id = cp.id
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

const GetCountOfCategory = async (req, res) =>{
    const {id, lang} = req.params;
    const query_text = `
        SELECT t.id, tt.name, cpi.destination,
         (
            SELECT COUNT(re.id)
            FROM real_estates re
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 AND cp.id = re.ctype_id 
         )
         FROM types t
            INNER JOIN languages l
                ON l.language_code = '${lang}'
            INNER JOIN type_translations tt
                ON tt.type_id = t.id AND tt.language_id = l.id
            INNER JOIN ctypes cp
                ON cp.category_id = ${id} AND cp.type_id = t.id
            LEFT JOIN ctype_image cpi
                ON cpi.ctype_id = cp.id
            WHERE t.main_type_id = 1
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetSpecByID = async (req, res) =>{
    const {id, lang} = req.params;
    const query_text = `
        SELECT s.id, s.is_multiple, 
            s.is_required, st.name,
            
            (SELECT json_agg(val) FROM (
                SELECT sv.id, svt.name
                FROM specification_values sv
                    INNER JOIN specification_value_translations svt
                        ON svt.spec_value_id = sv.id AND svt.language_id = l.id
            )val) AS values
        
        FROM specifications s
            INNER JOIN languages l 
                ON l.language_code = '${lang}'
            INNER JOIN specification_translations st 
                ON st.spec_id = s.id AND st.language_id = l.id
        WHERE s.id = ${id}
                `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetHistoryView = async (req, res) =>{
    const {lang} = req.params;
    const {page, limit} = req.query;
    const {real_estates} = req.body;
    let offSet = ``
    if(page && limit) {
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    const query_text = `
        WITH selected AS 
            (SELECT DISTINCT ON (re.id) re.id, rep.price::text, u.phone::text, to_char(re.created_at, 'YYYY-MM-DD') AS created_at, u.full_name,
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
                    ON l.language_code = $1
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
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4  AND re.id IN (${real_estates.map(item => `${item}`).join(',')})
            ORDER BY  re.id DESC  ${offSet})
        
        SELECT
            (SELECT COUNT (count.id) FROM (SELECT  DISTINCT ON (re.id) re.id FROM real_estates re  
                INNER JOIN ctypes cp 
                    ON cp.id = re.ctype_id
                LEFT JOIN real_estate_prices rep 
                    ON rep.real_estate_id = re.id AND rep.is_active = 'true'
                LEFT JOIN languages l 
                    ON l.language_code = $1
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
                WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4    
            ) AS count),

            (SELECT json_agg(res) FROM 
                selected 
            res) AS real_estates_all
    `
    try {
        const {rows} = await database.query(query_text,[lang])
        return res.status(status.success).json({rows:rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

module.exports = {
    GetSpecificationsForType,
    GetSpecificationsForTypes,
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
    CommerceFilter,
    TypeImages,
    GetWishList,
    RoomSpecController,
    RealEstatePositions,
    GetUserRealEstates,
    GetTypesOfCategory,
    GetCountOfCategory,
    GetSpecByID,
    GetHistoryView
    
}   