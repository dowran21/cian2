const database = require('../db/index.js')

const lang_id = async (code) =>{
    const query_text = `SELECT id FROM languages WHERE language_code = '${code}'`

    try {
        const {rows} = await database.query(query_text, [])
        return rows[0].id
    }catch(e){
        console.log(e)
        throw e;
    }
}

module.exports = {
    lang_id,
}