const database = require('../db/index.js')
const {lang_id} = require('../utils/helpFunctions.js');
const UserHelper = require('../utils/index.js');
const {status} = require('../utils/status.js')

const UserRegistration = async (req, res) =>{
    /********************
        {
            "full_name": "SOme full name of moderator",
            "email" : "ddowran2106@gmail.com",
            "phone":"61123141",
            "password":"somepasswordexample"
        }
    ************************/
    const {full_name, email, phone, password} = req.body
    const hashed_password = await UserHelper.HashPassword(password)
    const query_text = `
        INSERT INTO users(role_id, full_name, email, phone, password)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `
    try{
        const {rows} = await database.query(query_text, [3, full_name, email, phone, hashed_password]);
        data = {"id":rows[0].id, "full_name":rows[0].full_name, "email":rows[0].email, "phone":rows[0].phone, "role_id":rows[0].role_id}
        const access_token = await UserHelper.GenerateUserAccessToken(data);
        const refresh_token = await UserHelper.GenerateUserRefreshToken(data);
        return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
    }catch(e){
        console.log(e)
        return res.status(status.error).json({"message":e.message})
    }
    
}

const UserLogin = async (req, res) =>{
    /*******************
     {
         "phone":"61123141",
         "password":"somepassword"
     }
     *****************/
    const {phone, password} = req.body
    const query_text = `
        SELECT * FROM users WHERE phone = ${phone} AND role_id = 3
        `
    try {
        const {rows} = await database.query(query_text, [])
        const user = rows[0];
        if(!user){
            return res.status(status.notfound).json({"message":"Not found"})
        }
        if (UserHelper.ComparePassword(password, user.password)){
            data = {"id":user.id, "full_name":user.full_name, "email":user.email, "phone":user.phone, "role_id":user.role_id}
            const access_token = await UserHelper.GenerateUserAccessToken(data);
            const refresh_token = await UserHelper.GenerateUserRefreshToken(data);
            return res.status(status.success).json({"access_token":access_token, "refresh_token":refresh_token, "data":data})
        }
        if(!UserHelper.ComparePassword(password, user.password)){
            const message = {type:"manual", name:"email", message:"'Email ' ýada 'Açar söz' ýalňyş"} 
            return res.status(status.bad).json(message)
        }

    } catch (e) {
        console.log(e)
        return res.status(status.error).json({"message":"Error"})
    }

}

const UserRealEstates = async (req, res) =>{
    const {uuid, lang} = req.params
    const language_id = await lang_id(lang)
    try {
        const query_text = `
            SELECT re.id, re.area, rep.price,
                (SELECT json_agg(image) FROM (
                    SELECT rei.destination FROM real_estate_images rei
                    WHERE rei.real_estate_id = re.id
                )image) AS images, ret.description
            FROM real_estate re
            LEFT JOIN real_estate_translations ret ON ret.real_estate_id = re.id AND ret.language_id = ${language_id}
            INNER JOIN real_estate_prices rep ON rep.real_estate_id = re.id AND rep.is_active = false
            WHERE re.user_id = ${uuid}
        `
        const {rows} = await database.query(query_text, [])
        return res.json(rows)

    } catch (e) {
        console.log(e)
        throw e

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
            "phone":61123141,
            "location_id":null
            "descriptions" : [{"language_id":1, "description":"something about this home what you need to know"},
                            {"language_id":2, "description":"something about this home what you need to know, "}],
            "specifications":[{"id":251, "is_required":"TRUE/FALSE", "is_multiple":"TRUE/FALSE", "values":[]},
                {"id":251, "is_required":"TRUE/FALSE", "is_multiple":"TRUE/FALSE", "values":[]}] ,
    }
*****************************/

    const {type_id, category_id, phone, area, position, price, descriptions, owner_id, specifications, location_id } = req.body
    const user_id = req.user.id
    let status_id = 0
    if (category_id== 1){
        status_id = 1
    }
    if (category_id == 2){
        status_id = 3
    }
    const uuid = req.user.id
    let i = 0;
    let j=0;
    let spec_value_part = `INSERT INTO real_estate_specification_values(real_estate_id, spec_id, spec_value_id)
                            VALUES`
    for (i=0; i<specifications.length; i++){
        let specification = specifications[i]
        if (specification.values){
            const values = specification.values
            for (j=0; j<values.length; j++){
                spec_value_part += ` ((SELECT id FROM inserted), ${specification.id}, ${values[j]})`
                if (j!=(values.length-1)){
                    spec_value_part += `,`;
                }
            }
        if (i!=(specifications.length-1)){
            spec_value_part += `,`
        }
        }
    }


    try {
        const query_text = `
            WITH selected AS (
                SELECT id FROM ctypes WHERE type_id = ${type_id} AND category_id = ${category_id}

            ),inserted AS (
                INSERT INTO real_estates(user_id, ctype_id, area, position, status_id, location_id, phone, is_active, owner_type_id)
                VALUES($1, (SELECT id FROM selected), $3, '(${position.lng}, ${position.lat})', $4, $5, $6,  'false', $7) RETURNING id

            ),ins AS (
                INSERT INTO real_estate_prices (real_estate_id, price)
                VALUES ((SELECT id FROM inserted), $2)

            ),insert2 AS(
                INSERT INTO real_estate_translations(description, real_estate_id, language_id)
                VALUES ${descriptions.map(item => `('${item.description}', (SELECT id FROM inserted), ${item.language_id})`).join(',')}

            ), insert_spec AS (${spec_value_part}) SELECT id FROM inserted
        `
        const {rows} = await database.query(query_text, [user_id, price, area, status_id, location_id, phone, owner_id])
        return res.json(rows[0])

    } catch(e) {
        console.log(e)
        throw e;

    }
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

const UpdateRealEstate = async (req, res) =>{
    try {

    } catch (e) {

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

const AddImage = async (req, res) =>{
    const files = req.files
    console.log(req.files)
    const {id} = req.params
    if (files.length){
        const query_text = `
            INSERT INTO real_estate_images (real_estate_id, destination, file_type_id)
                VALUES ${files.map(item => `(${id}, '${item.path}', 1)`).join(',')}
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
    UserRealEstates,
    AddRealEstate,
    GetUserRealEstateByID,
    UpdateRealEstate,
    AddWishList,
    GetWishList,
    AddImage,
    AddToVIP,
    UpateRealEstate,
    

}
