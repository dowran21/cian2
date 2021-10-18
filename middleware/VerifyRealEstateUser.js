const database = require ('../db/index.js')

const VerifyEstateUser = async (req, res, next) =>{
    const {uuid, id} = req.params

    const query_text = `
        SELECT id FROM real_estates re 
            WHERE re.id = $1 AND user_id = $2
    `
    try{
        const {rows} = await database.query(query_text, [id, uuid])
        if (rows){
            console.log("I passed verify of real_estate_user_verification")
            next ()
        }
        else {
            return res.json({"message":"It isn't your real estate"})
        }
    }catch(e){
        console.log(e)
        return res.json({"message":"bad error"})
    }
}

module.exports = {
    VerifyEstateUser
}