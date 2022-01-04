const database = require('../db/index')
const {status} = require('../utils/status')
const {ComparePassword, HashPassword, GenerateAdminAccessToken, GenerateAdminRefreshToken} = require('../utils/index')


const Login = async (req, res) =>{
    const {phone, password} = req.body
    const query_text  =`
        SELECT * FROM users WHERE phone = $1 AND role_id = 1
    `
    try {
        const {rows} = await database.query(query_text, [phone])
        const user = rows[0]
        if(!user){
            let message = {}
            message["phone"] = `Телефон или пароль неправильный`
            return res.status(status.bad).send({error:message})
        }else{
            let compare = await ComparePassword(password, user.password)
            if(compare){
                const data = {"id":user.id, "full_name":user.full_name, "phone":user.phone, "role_id":user.role_id};
                console.log(data)
                
                const access_token = await GenerateAdminAccessToken(data);
                const refresh_token = await GenerateAdminRefreshToken(data);
                return res.status(status.success).json({data, access_token, refresh_token});
            }else{
                let message = {}
                message["phone"] = `Телефон или пароль неправильный`
                return res.status(status.bad).send({error:message})
            }
        } 
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }

}

const LoadAdmin = async (req, res) =>{
    const user_id = req.user.id
    try {
        const {rows} = await database.query(`SELECT * FROM users WHERE id = ${user_id}`, [])
        const user = rows[0]
        const data = {"id":user.id, "phone":user.phone, "email":user.email, "role_id":user.role_id}
        const access_token = await GenerateAdminAccessToken(data);
        return res.status(status.success).json({"access_token":access_token, "data":data})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddCategory = async (req, res) =>{
    /************
     name_tm = asdas,
     name_ru = asdas, 
     name_en = asdasd,
     id = 1
     ***********/
    const {name_tm, name_ru, name_en} = req.body;

    const query_text = ` WITH inserted AS (
            INSERT INTO categories(name) VALUES('${name_ru}') RETURNING *
        ), inserted_trans1 AS (
            INSERT INTO category_translations(language_id, category_id, name) VALUES 
            (1, (SELECT id FROM inserted), '${name_tm}'), 
            (2, (SELECT id FROM inserted), '${name_ru}'),
            (3, (SELECT id FROM inserted), '${name_en}')
        ) SELECT id FROM inserted `
    try {
        const {rows} = await database.query(query_text, [])
        try {
            const s_query = `
                SELECT c.id, ct.name AS name_tm, ctt.name AS name_ru, cttt.name AS name_en
                FROM categories c
                    INNER JOIN category_translations ct 
                        ON ct.category_id = c.id AND ct.language_id = 1
                    INNER JOIN category_translations ctt 
                        ON ctt.category_id = c.id AND ctt.language_id = 2
                    INNER JOIN category_translations cttt 
                        ON cttt.category_id = c.id AND cttt.language_id = 3
                WHERE c.id = ${rows[0].id}
            `
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

const UpdateCategory = async (req, res) =>{
    const {name_tm, name_ru, name_en} = req.body;
    const {id} = req.params
    const query_text = `
        with updated1 AS (
            UPDATE category_translations SET name = '${name_tm}' WHERE language_id = 1 AND category_id = ${id}
        ), updated2 AS (
            UPDATE category_translations SET name = '${name_ru}' WHERE language_id = 2 AND category_id = ${id}
        ) UPDATE category_translations SET name = '${name_en}' WHERE language_id = 3 AND category_id = ${id}

    `
    try {
        await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetCategories = async (req, res) =>{
    const query_text = `
        SELECT c.id, ct.name AS name_tm, ctt.name AS name_ru, cttt.name AS name_en
        FROM categories c
            INNER JOIN category_translations ct 
                ON ct.category_id = c.id AND ct.language_id = 1
            INNER JOIN category_translations ctt 
                ON ctt.category_id = c.id AND ctt.language_id = 2
            INNER JOIN category_translations cttt 
                ON cttt.category_id = c.id AND cttt.language_id = 3
            `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false
            )   
    }
}

const AddProducer = async (req, res) =>{
    const {name} = req.body;
    const query_text = `
        INSERT INTO producers(name) VALUES ('${name}') RETURNING *
    `
    try {
        const {rows} = await database.query(query_text, [])
        res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetProducers = async (req, res) =>{
    const query_text = `
        SELECT * FROM producers
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddProducerImage = async (req, res) =>{
    const {id} = req.params;
    const file = req.file
    console.log(file);
    try {
        await database.query(`UPDATE producers SET destination = '${file.path}' WHERE id = ${id}`, [])
        try {
            const {rows} = await database.query(`SELECT * FROM producers WHERE id = ${id}`)
            return res.status(status.success).json({"rows":rows[0]})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddProduct = async (req, res) =>{
    const {category_id, producer_id, stock  , price, name_tm, name_ru, name_en, 
        description_tm, description_ru, description_en} = req.body;

    const query_text = `
        WITH inserted AS (
            INSERT INTO products(category_id, producer_id, price, stock )
            VALUES (${category_id}, ${producer_id}, ${price}, ${stock   })
            RETURNING *
        ), inserted_trans AS (
            INSERT INTO product_translations(product_id, language_id, name, description)
            VALUES ((SELECT id FROM inserted), 1, '${name_tm}', '${description_tm}'), 
                ((SELECT id FROM inserted), 2, '${name_ru}', '${description_ru}'),
                ((SELECT id FROM inserted), 3, '${name_en}', '${description_en}') 
        ) SELECT id FROM inserted
      `       
    try {
        const {rows} = await database.query(query_text, []);
        try {
            const s_query = `
                SELECT p.id, p.price, p.stock, p.destination, p.category_id, p.producer_id, pt.name AS name_tm, pt.description AS description_tm,
                    ptt.name AS name_ru, ptt.description AS description_ru, pttt.name AS name_en, pttt.description AS description_en,
                    prod.name AS producer_name, ct.name AS category_name
                    FROM products p
                        LEFT JOIN product_translations pt 
                            ON pt.product_id = p.id AND pt.language_id = 1
                        LEFT JOIN product_translations ptt 
                            ON ptt.product_id = p.id AND ptt.language_id = 2
                        LEFT JOIN product_translations pttt 
                            ON pttt.product_id = p.id AND pttt.language_id = 3
                        LEFT JOIN producers prod
                            ON prod.id = p.producer_id
                        LEFT JOIN category_translations ct
                            ON ct.category_id = p.category_id AND ct.language_id = 2
                    WHERE p.id > ${rows[0].id}`
            const s = await database.query(s_query, [])
            return res.status(status.success).json({rows:s.rows[0]})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(False)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddProductImage = async (req, res) =>{
    const {id} = req.params;
    const file = req.file
    try {
        await database.query(`UPDATE products SET destination = '${file.path}' WHERE id = ${id}`, [])
        try {
            const {rows} = await database.query(`SELECT * FROM products WHERE id = ${id}`)
            return res.status(status.success).json({"rows":rows[0]})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddNews = async (req, res) =>{
    const {title_tm, title_ru, title_en, article_tm, article_ru, article_en} = req.body
    const query_text = `
        WITH inserted AS (
            INSERT INTO news(created_at) 
            VALUES(localtimastamp) RETURNING *
        ) inserted_description AS (
            INSERT INTO news_descriptions(news_id, title, article)
            VALUES ((SELECT id FROM inserted), '${title}')
        ) SELECT id FROM inserted
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).send(true)
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetProducts = async (req, res) =>{
    const {page, limit} = req.query;
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET  ${page*limit} LIMIT ${limit}`
    }
    const query_text = `
        SELECT 
            (SELECT COUNT(*) FROM products p),

                (SELECT json_agg(pro) FROM (
                    SELECT p.id, p.price, p.stock, p.destination, p.category_id, p.producer_id, pt.name AS name_tm, pt.description AS description_tm,
                    ptt.name AS name_ru, ptt.description AS description_ru, pttt.name AS name_en, pttt.description AS description_en,
                    prod.name AS producer_name, ct.name AS category_name
                    FROM products p
                        LEFT JOIN product_translations pt 
                            ON pt.product_id = p.id AND pt.language_id = 1
                        LEFT JOIN product_translations ptt 
                            ON ptt.product_id = p.id AND ptt.language_id = 2
                        LEFT JOIN product_translations pttt 
                            ON pttt.product_id = p.id AND pttt.language_id = 3
                        LEFT JOIN producers prod
                            ON prod.id = p.producer_id
                        LEFT JOIN category_translations ct
                            ON ct.category_id = p.category_id AND ct.language_id = 2
                    WHERE p.id > 0 
                    ${offSet}
                    ORDER BY p.id ASC
                )pro) AS products
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({"rows":rows[0]})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const AddCategoryImage = async (req, res) =>{
    const {id} = req.params;
    const file = req.file
    try {
        await database.query(`UPDATE categories SET destination = '${file.path}' WHERE id = ${id}`, [])
        try {
            const {rows} = await database.query(`SELECT * FROM categories WHERE id = ${id}`)
            return res.status(status.success).json({"rows":rows[0]})
        } catch (e) {
            console.log(e)
            return res.status(status.error).send(false)
        }
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

module.exports = {
    Login,
    LoadAdmin,

    AddCategory,
    UpdateCategory,
    GetCategories,
    
    AddProducer,
    AddProducerImage,
    GetProducers,
    AddCategoryImage, 

    AddProduct,
    AddProductImage,
    
    AddNews,
    GetProducts
}
