const cron = require('node-cron')
const database = require('../db/index.js')

const cron_job = async () =>{
    cron.schedule('00 00 * * *', function(){
        const query_text = `
            WITH deleted AS (DELETE FROM view_address) 
            DELETE FROM view_address_advertisements
            `
        try {
            database.query(query_text, [])
        } catch (e) {
            console.log(e)
            throw e
        }
    })
}

module.exports = {
    cron_job
}
