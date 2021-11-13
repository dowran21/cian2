const database = require('./index.js')
const {HashPassword} = require('../utils/index.js')
const CreateAdmin = async () => { 
    const password = '61123141dow';
    const hashed_password = await HashPassword(password);
    const query_text = `
        INSERT INTO users(role_id, full_name, phone, email, password, is_active)
            VALUES (1, 'Dowran', '61123141', 'gamysh@gmail.com','${hashed_password}', true )
    `
    try {
        await database.query(query_text, [])
    } catch (e) {
        console.log(e)
        throw e
    }
}

CreateAdmin()