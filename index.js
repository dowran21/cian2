require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const Routers = require('./router/index.js')
const cookieParser = require('cookie-parser')
const path = require('path')
const {cron_job} = require('./utils/cron');
const morgan = require ('morgan')

const port = process.env.PORT || 3000

let dir = path.join(__dirname, 'uploads')

app.use(morgan('dev'))

const allowedOrigins = ['http://localhost:3000','http://192.168.31.250:3001', 'http://localhost:2000', 'http://109.106.244.215:2000'];
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
app.use(express.static(path.join(__dirname, 'build')))
app.use('/api', Routers)

// app.get('/admin', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use('/uploads', express.static(dir))
app.use(cookieParser())

cron_job()



// const server = http.createServer()

app.listen(port, ()=>{console.log(`Your server started and listening on port ${port}`)})