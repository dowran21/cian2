const cron = require('node-cron')
const database = require('../db/index.js')

const cron_job = async () =>{
    cron.schedule('00 00 * * *', function(){
        const query_text = `
            UPDATE users SET deleted = true WHERE last_logged < (localtimestamp - INTERVAL '3 MONTHS') AND role_id = 3
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
