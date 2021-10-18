const database = require('../db/index.js')
const {lang_id} = require('../utils/helpFunctions.js')

const GetRealEstateByFilter = async (req, res) =>{
    const {specifications, type_id, category_id, price, area, images, position, page, limit} = req.query
    const {lang} = req.params
    const language_id = lang_id(lang)
    let offSet = ``
    let ctype_part =``
    let spec_part = ``
    let where_part = `WHERE `
    let image_part =``
    let order_part = `ORDER BY re.id DESC`
    
    //--------------------Pagination part ---------------------//
    if (page !== 'null' && limit !== 'null'){
        offSet = `OFFSET ${page*limit} LIMIT ${limit}`
    }
    
    //---------------------ctype part -----------------------//
    if (type_id !== 'null' && category_id !== 'null'){
        ctype_part = `AND ctype.type_id = ${type_id} AND ctype.category_id = ${category_id}` 
    }
    
    //-------------------specification part-----------------//
    if (specifications.length){
        for (let i=0; i<specifications.length; i++){
            values = specifications[i].values
            spec_part += `AND (${values.map(item =>`resv.spec_value_id = ${item}`).join('OR')})`
        }        
    }
    
    //----------------area part--------------------//
    if (area.min && area.max){
        where_part += `(re.area > ${area.min} AND re.are < ${area.max})`
    }else if(area.min && !area.max){
        where_part += `re.area > ${area.min}`
    }else if(!area.min && area.max){
        where_part += `re.area < ${area.max}`
    }else{
        where_part +=``
    }
    
    //---------------price-----------------------//
    if (price.min && price.max){
        where_part += `AND (rep.price > ${price.min} AND rep.are < ${price.max})`
    }else if(price.min && !price.max){
        where_part += `AND rep.price > ${price.min}`
    }else if(!price.min && price.max){
        where_part += `AND rep.price < ${price.max}`
    }else{
        where_part +=``
    }
    
    //----------about to have an image---------// 
    if (image){
        image_part = `RIGHT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }else{
        image_part = `LEFT JOIN real_estate_images rei ON rei.real_estate_id = re.id`
    }

    const query_text =`
    SELECT
        (SELECT COUNT(re.id) FROM real_estate re
            INNER JOIN ctype ON re.ctype_id = ctype.id
            LEFT JOIN real_estate_prices rep ON rep.real_estate_id = re.id
            LEFT JOIN real_estate_translations ret ON ret.real_estate_id = re.id AND ret.language_id = ${language_id};
            INNER JOIN real_estate_specification_values resv ON resv.real_estate_id = re.id AND resv.is_active = true
            ${image_part}
            ${where_part} ${spec_part} ${ctype_part}
        ) AS count,
        (SELECT json_agg(real_estate) FROM (
            SELECT re.id, re.area, rep.price, ret.description, re.position, re.created_at
            FROM real_estate re 
            INNER JOIN ctype ON re.ctype_id = ctype.id
            LEFT JOIN real_estate_prices rep ON rep.real_estate_id = re.id
            LEFT JOIN real_estate_translations ret ON ret.real_estate_id = re.id AND ret.language_id = ${language_id};
            INNER JOIN real_estate_specification_values resv ON resv.real_estate_id = re.id AND resv.is_active = true
            ${image_part}
            ${where_part} ${spec_part} ${ctype_part} ${order_part} ${offSet}
        ) 
        `

            
}

const GetSpecificationsForType = async (req, res) =>{
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
                        ORDER BY sv.id DESC
                )value) AS values
                
            FROM specifications s
                    INNER JOIN languages l ON l.language_code = $1
                    LEFT JOIN specification_translations st ON st.spec_id = s.id AND st.language_id = l.id
                    INNER JOIN type_specifications ts ON ts.spec_id = s.id
            WHERE ts.type_id = $2 
            ORDER BY s.is_required DESC
    ` 
        const {rows} = await database.query(query_text, [lang, type_id])

        res.json({"rows":rows})
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
    const {page, limit} = await req.query
    const {lang} = req.params
    const requestip = require('request-ip')
    const ip = requestip.getClientIp(req)
    let offSet = ``
    let vip_limit = ``
    if (limit){
        console.log("i am in limit if")
        vip_limit = limit/2;
    }else{
        vip_limit = 5;
    }
    if (page && limit){
        offSet = `OFFSET ${(page-1)*limit} LIMIT ${limit}`
    }else{
        offSet = ``
    }
    let advertisements = ``
    if (page == 1){
       const delete_estate_vips = `
                DELETE FROM shown_vips WHERE ip_address = $1
            
        `
        try {
            await database.query(delete_estate_vips, [ip])
        } catch (e) {
            console.log(e)
            throw e
        }
        advertisements = `
            selected_advertisements AS (
                SELECT DISTINCT ON (advertisement_level_id) id, destination, advertisement_level_id
                FROM (
                    SELECT a.id, af.destination, a.advertisement_level_id
                    FROM advertisements a
                        INNER JOIN advertisement_files af 
                            ON af.advertisement_id = a.id AND af.file_type_id = 2 
                        WHERE a.advertisement_level_id IN (1, 2, 3) AND a.advertisement_type_id = 1 AND validity:: tsrange @> localtimestamp
                    ORDER BY random()
                ) AS adevrtisements ORDER BY advertisement_level_id ASC LIMIT 3
            ), view_advertisement AS (
                INSERT INTO view_address_advertisements(ip_address, advertisement_id, view_type_id)
                    SELECT $1, id, 1 
                        FROM selected_advertisements
                ON CONFLICT (ip_address, advertisement_id, view_type_id) DO NOTHING
            )

        `
    }else{
        advertisements = `
            selected_advertisements AS (
                SELECT  id, destination, advertisement_level_id
                FROM (
                    SELECT a.id, af.destination, a.advertisement_level_id
                    FROM advertisements a
                        INNER JOIN advertisement_files af 
                            ON af.advertisement_id = a.id AND af.file_type_id = 2 
                        WHERE a.advertisement_level_id NOT IN (1, 2, 3) AND a.advertisement_type_id = 1 AND validity:: tsrange @> localtimestamp
                    ORDER BY random() 
                ) AS adevrtisements LIMIT 3
            ), view_advertisement AS (
                INSERT INTO view_address_advertisements(ip_address, advertisement_id, view_type_id)
                    SELECT $1, id, 1 
                        FROM selected_advertisements
                ON CONFLICT (ip_address, advertisement_id, view_type_id) DO NOTHING
            )

        `
    }
    let OrderPart = ``
    const real_estate_name = `
    concat(
        CASE WHEN 
                (SELECT sv.absolute_value
                FROM specification_values sv
                    INNER JOIN specifications s ON s.id = sv.spec_id
                    INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
                WHERE resv.spec_id = 1 AND resv.real_estate_id = re.id)  IS NOT NULL THEN 
                    (SELECT sv.absolute_value
                    FROM specification_values sv
                        INNER JOIN specifications s ON s.id = sv.spec_id
                        INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
                WHERE resv.spec_id = 1 AND resv.real_estate_id = re.id) ||
            CASE 
                WHEN l.id = 1 THEN ' otagly '
                WHEN l.id = 2 THEN 
                    CASE 
                        WHEN tt.name = 'Дом' THEN '-и комнатный '
                        ELSE '-х комнатная '
                    END
            END
        END,
        tt.name, ', ' ||
        
        CASE WHEN            
        (SELECT sv.absolute_value
            FROM specification_values sv
                INNER JOIN specifications s ON s.id = sv.spec_id
                INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
        WHERE resv.spec_id = 3 AND resv.real_estate_id = re.id) IS NOT NULL THEN 
        (SELECT sv.absolute_value
            FROM specification_values sv
                INNER JOIN specifications s ON s.id = sv.spec_id
                INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
        WHERE resv.spec_id = 3 AND resv.real_estate_id = re.id) ||
            CASE 
                WHEN l.id = 1 THEN '-nji gat'
                WHEN l.id = 2 THEN '-й этаж'
            END 
        END          
    )AS real_estate_name,`
    
    let vip_estates = `
    selected_vip AS (
        SELECT re.id, rep.price, re.created_at, re.urgency, vre.id AS VIP,
        concat(
            CASE 
                WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                END ||
            lt.translation) AS location,
    ${real_estate_name}
    
    (SELECT json_agg(dest) FROM (
        SELECT rei.destination FROM real_estate_images rei
        WHERE rei.real_estate_id = re.id AND rei.is_active = true LIMIT 3
    )dest) AS images

    FROM real_estates re 
        INNER JOIN ctypes cp 
            ON cp.id = re.ctype_id
        INNER JOIN real_estate_prices rep 
            ON rep.real_estate_id = re.id AND rep.is_active = 'true'
        INNER JOIN languages l 
            ON l.language_code = $2
        INNER JOIN type_translations tt 
            ON tt.type_id = cp.type_id AND tt.language_id = l.id
        INNER JOIN vip_real_estates vre 
            ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
        LEFT JOIN shown_vips sv 
            ON sv.real_estate_id = re.id AND sv.ip_address = $1
        LEFT JOIN location_translations lt
            ON lt.location_id = re.location_id AND lt.language_id = l.id
        LEFT JOIN locations lc 
            ON lc.id = re.location_id
        LEFT JOIN location_translations ltt
            ON ltt.location_id = lc.main_location_id AND ltt.language_id = l.id
    WHERE re.is_active = 'true' AND re.status_id <> 2 
        AND re.status_id <> 4 AND vre.id IS NOT NULL AND sv.ip_address IS NULL
    ORDER BY random() LIMIT ${vip_limit}
    )`


    const query_text =`
    WITH selected AS 
        (SELECT re.id, rep.price, re.created_at, re.urgency, vre.id AS VIP, 
        concat(
            CASE WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' END || lt.translation) AS location,
        ${real_estate_name}
        
        (SELECT json_agg(dest) FROM (
            SELECT rei.destination FROM real_estate_images rei
            WHERE rei.real_estate_id = re.id AND rei.file_type_id = 1 AND rei.is_active = true LIMIT 3
        )dest) AS images

        FROM real_estates re 
            INNER JOIN ctypes cp 
                ON cp.id = re.ctype_id
            INNER JOIN real_estate_prices rep 
                ON rep.real_estate_id = re.id AND rep.is_active = 'true'
            INNER JOIN languages l ON l.language_code = $2
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
        WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 AND vre.id IS NULL
        ORDER BY  re.updated_at DESC  ${offSet}), 

                    
    inserted AS (INSERT INTO view_address 
        SELECT $1,  id, 1 FROM selected 
        ON CONFLICT (ip_address, real_estate_id, view_type_id) DO NOTHING), ${vip_estates}, 
    
    insert_shown_vips AS (INSERT INTO shown_vips 
        SELECT $1, id FROM selected_vip 
        ON CONFLICT (ip_address, real_estate_id) DO NOTHING),
    
    inserted_vips AS (INSERT INTO view_address
        SELECT $1, id, 1 FROM selected_vip
        ON CONFLICT (ip_address, real_estate_id, view_type_id) DO NOTHING), ${advertisements}
    
    SELECT
        (SELECT COUNT(re.id) FROM real_estates re  
            LEFT JOIN vip_real_estates vre 
                ON vre.real_estate_id = re.id AND vre.vip_dates:: tsrange @> localtimestamp
            WHERE re.is_active = 'true' AND re.status_id <> 2 AND re.status_id <> 4 AND vre.id IS NULL          
        ) AS count,

        (SELECT json_agg(res) FROM 
            selected 
        res) AS real_estates_all,
        
        (SELECT json_agg(s) FROM 
            selected_vip 
        s) AS vip_real_estates,

        (SELECT json_agg(adv) FROM
            selected_advertisements    
        adv) AS advertisements
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
        console.log(rows[0].advertisements)
        return res.json({"rows":{"count":rows[0].count, "real_estates_all":real_estates_all, "advertisements":rows[0].advertisements}})
    } catch (e) {
        console.log(e)
        throw e
    }

}

const TypeCategoryController = async (req, res) =>{
    const {lang} = req.params
    const query_text = `
        SELECT c.id, ct.name, 
            
            (SELECT json_agg(type) FROM 
                (SELECT t.id, tt.name,
                    
                    (SELECT COUNT(re.id) FROM real_estates re
                        INNER JOIN ctypes ctp ON ctypes.id = re.ctype_id
                    WHERE ctp.category_id = c.id AND ctp.type_id = t.id)    
                
                FROM types t
                    INNER JOIN ctypes ON ctypes.type_id = t.id 
                    INNER JOIN type_translations tt ON tt.type_id = t.id 
                WHERE ctypes.category_id = c.id AND tt.language_id = l.id
            )type) AS types
            
            FROM categories c
                INNER JOIN languages l ON l.language_code = $1
                INNER JOIN category_translations ct ON ct.category_id = c.id
            WHERE ct.language_id = l.id
    `
    try {
        const {rows} = await database.query(query_text, [lang])
        return res.json({"rows":rows})
    } catch (e) {
        console.log(e)
        throw e        
    }
}

const PaperTypes = async (req, res) => {
    const {lang} = req.params

    const query_text = `
        SELECT pt.id, ptt.name FROM paper_type pt
            INNER JOIN paper_type_translations ptt ON ptt.paper_type_id = pt.id
            INNER JOIN languages l ON l.id = ptt.language_id
        WHERE l.language_code = '${lang}'              
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.json({"rows":rows})
    } catch (e) {
        console.log(e)
        throw e
    }
}

const PaperTypeController = async (req, res) =>{
    const {lang, paper_type_id} = req.params
    const {page, limit} = req.query
    console.log(page, limit)
    let offSet = ``
    if (page && limit){
        offSet = `OFFSET ${(page-1)*limit} LIMIT ${limit}`
    }

    const query_text = `
        SELECT 
            (SELECT COUNT(pn.id) FROM paper_name pn
                WHERE pn.paper_type_id = $1) AS count,
            
            (SELECT json_agg(paper) FROM (
                SELECT pn.id, pnt.name, pd.description, pn.created_at, pi.destination AS image
                    FROM paper_name pn
                        INNER JOIN paper_name_translations pnt ON pnt.paper_name_id = pn.id
                        INNER JOIN paper_descriptions pd ON pd.paper_name_id = pn.id
                        LEFT JOIN paper_image pi ON pi.paper_name_id = pn.id
                        INNER JOIN languages l ON l.language_code = $2
                    WHERE pn.paper_type_id = $1 AND pnt.language_id = l.id AND pd.language_id = l.id
                        ORDER BY (pn.created_at) DESC ${offSet}
            )paper) AS papers
    `
    try {
        const {rows} = await database.query(query_text, [paper_type_id, lang])
        return res.json({"rows":rows})

    } catch (e) {
        console.log(e)
        throw e
    }

}

const PaperByID = async (req, res) =>{
    const {id, lang} = req.params;
    const query_text = `

        `
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
    const real_estate_name = `
    concat(
        CASE WHEN 
                (SELECT sv.absolute_value
                FROM specification_values sv
                    INNER JOIN specifications s ON s.id = sv.spec_id
                    INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
                WHERE resv.spec_id = 1 AND resv.real_estate_id = re.id)  IS NOT NULL THEN 
                    (SELECT sv.absolute_value
                    FROM specification_values sv
                        INNER JOIN specifications s ON s.id = sv.spec_id
                        INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
                WHERE resv.spec_id = 1 AND resv.real_estate_id = re.id) ||
            CASE 
                WHEN l.id = 1 THEN ' otagly '
                WHEN l.id = 2 THEN 
                    CASE 
                        WHEN tt.name = 'Дом' THEN '-и комнатный '
                        ELSE '-х комнатная '
                    END
            END
        END,
        tt.name, ', ' ||
        
        CASE WHEN            
        (SELECT sv.absolute_value
            FROM specification_values sv
                INNER JOIN specifications s ON s.id = sv.spec_id
                INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
        WHERE resv.spec_id = 3 AND resv.real_estate_id = re.id) IS NOT NULL THEN 
        (SELECT sv.absolute_value
            FROM specification_values sv
                INNER JOIN specifications s ON s.id = sv.spec_id
                INNER JOIN real_estate_specification_values resv ON resv.spec_id = s.id AND resv.spec_value_id = sv.id
        WHERE resv.spec_id = 3 AND resv.real_estate_id = re.id) || 
            CASE 
                WHEN l.id = 1 THEN '-nji gat, '
                WHEN l.id = 2 THEN '-й этаж, '
            END 
        END         
    )AS real_estate_name,`
    let delete_show_vips = ``
    // console.log(ip)
    const query_text = `
        WITH inserted AS (
            INSERT INTO view_address VALUES ($3, $1, 2)
            ON CONFLICT DO NOTHING)

        SELECT re.area, rep.price, re.area, ret.description, re.urgency, ${real_estate_name} vre.id AS VIP, phone,
            re.created_at,
            (SELECT COUNT(*) FROM user_wish_list uwl WHERE uwl.real_estate_id = $1) AS bookmark_count,    

            concat(
                CASE 
                    WHEN ltt.translation IS NOT NULL THEN ltt.translation || ',' 
                    END ||
                lt.translation
            ) AS location,

            (SELECT COUNT(count) 
                FROM view_count WHERE real_estate_id = re.id AND view_type_id = 2 AND is_active=true) AS view_count,
            
            (SELECT json_agg(image) FROM (
                SELECT destination FROM real_estate_images rei
                WHERE rei.real_estate_id = $1 AND rei.file_type_id = 1 AND rei.is_active = 'true'
            )image) AS images, 

            (SELECT json_agg(panoramic) FROM (
                SELECT destination FROM real_estate_images rei
                WHERE rei.real_estate_id = $1 AND rei.file_type_id = 3 AND rei.is_active = 'true'
            ) panoramic) AS panoramic_images,
            
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
            INNER JOIN languages l 
                ON l.language_code = $2
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
        return res.json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        throw e
    }
}

const GetTypesCategory = async (req, res) => {
    const {lang, id} = req.params
    const query_text = `
        SELECT tt.name, t.id 
        FROM ctypes ctp 
            INNER JOIN languages l ON l.language_code = $1
            INNER JOIN categories c ON c.id = ctp.category_id
            INNER JOIN types t ON t.id = ctp.type_id
            INNER JOIN type_translations tt ON tt.type_id = t.id AND tt.language_id = l.id
        WHERE c.id = $2
    `
    try {
        const {rows} = await database.query(query_text, [lang, id])
        return res.json({"rows":rows})
    } catch (e) {
        console.log(e)
        throw e
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

module.exports = {
    GetRealEstateByFilter,
    GetSpecificationsForType,
    GetNotRequiredSpecificationsForType,
    Languages,
    AllRealEstate,
    TypeCategoryController,
    PaperTypes,
    PaperTypeController,
    GetRealEstateByID,
    PaperByID,
    GetTypesCategory,
    GetLocations,
    GetRegions

}   