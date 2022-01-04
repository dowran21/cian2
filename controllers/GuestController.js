const database = require("../db/index");
const {status} = require("../utils/status");

const GetCategories = async (req, res) =>{
    const {lang} = req.params
    const query_text = `
        SELECT ct.name, ct.category_id, (SELECT COUNT(*) FROM products p WHERE p.category_id = ct.category_id)
        FROM category_translations ct
            INNER JOIN languages l
                ON l.language_code = '${lang}'
        WHERE ct.language_id = l.id
    `
    try {
        const {rows} = await database.query(query_text, [])
        return res.status(status.success).json({rows})
    } catch (e) {
        console.log(e)
        return res.status(status.error).send(false)
    }
}

const GetProducers = async (req, res) =>{
    const {lang} = req.params;
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

const GetProducts = async (req, res) =>{
    const {page, limit,  search, category_id, producer_id} = req.query;
    const {lang} = req.params
    let offSet = ``
    if(page && limit){
        offSet = ` OFFSET  ${page*limit} LIMIT ${limit}`
    }
    let wherePart = ``
    if(search){
        wherePart = ` AND (pt.name = '${search}' OR pr.description = '${search}')`
    }
    if(category_id){
        wherePart = ` AND p.category_id = ${category_id}`
    }
    if(producer_id){
        wherePart = ` AND p.category_id = ${producer_id}`
    }
    const query_text = `
        SELECT 
            (SELECT COUNT(*) 
                FROM products p
                    INNER JOIN languages l
                        ON l.language_code = '${lang}'
                    INNER JOIN product_translations pt 
                        ON pt.product_id = p.id AND pt.language_id = l.id
                    INNER JOIN producers prod
                        ON prod.id = p.producer_id
                    INNER JOIN category_translations ct
                        ON ct.category_id = p.category_id AND ct.language_id = l.id
                    WHERE p.id > 0 ${wherePart}
            ),

                (SELECT json_agg(pro) FROM (
                    SELECT p.id, p.price, p.stock, p.destination, p.category_id, p.producer_id, pt.name, pt.description, 
                    prod.name AS producer_name, ct.name AS category_name
                    FROM products p
                        INNER JOIN languages l
                            ON l.language_code = '${lang}'
                        INNER JOIN product_translations pt 
                            ON pt.product_id = p.id AND pt.language_id = l.id
                        INNER JOIN producers prod
                            ON prod.id = p.producer_id
                        INNER JOIN category_translations ct
                            ON ct.category_id = p.category_id AND ct.language_id = l.id
                    WHERE p.id > 0 ${wherePart}
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

const GetCartProducts = async (req, res) => {
    const {products} = req.query
    const {lang} = req.query
    if(!products.length){
        return res.status(status.success).json({"rows":null})
    }
    const query_text = `
        SELECT p.id, p.price, p.stock, p.destination, p.category_id, p.producer_id, pt.name, pt.description, 
        prod.name AS producer_name, ct.name AS category_name
        FROM products p
            INNER JOIN languages l
                ON l.language_code = '${lang}'
            INNER JOIN product_translations pt 
                ON pt.product_id = p.id AND pt.language_id = l.id
            INNER JOIN producers prod
                ON prod.id = p.producer_id
            INNER JOIN category_translations ct
                ON ct.category_id = p.category_id AND ct.language_id = l.id
            WHERE p.id IN (${products.map(item => `${item}`).join(', ')})
        ORDER BY p.id ASC
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
    GetCategories,
    GetProducers,
    GetProducts,
    GetCartProducts,
    GetCartProducts
}