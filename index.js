require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const Routers = require('./router/index.js')
const cookieParser = require('cookie-parser')
const path = require('path')
const {cron_job} = require('./utils/cron')

const port = process.env.PORT || 3000

let dir = path.join(__dirname, 'uploads')

const allowedOrigins = ['http://localhost:3001','http://192.168.31.250:3001'];
//const allowedOrigins = ['http://localhost:8090', 'http://10.60.1.20:9062', 'http://95.85.97.206:9062'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
        },
    credentials: true
}));

app.use(express.json());
app.use('/api', Routers)
app.use('/uploads', express.static(dir))
app.use(cookieParser())

cron_job()



// const server = http.createServer()

app.listen(port, ()=>{console.log(`Your server started and listening on port ${port}`)})