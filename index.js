require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const Routers = require('./router/index.js')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require ('morgan')
// const { required } = require('joi')
const {cron_job} = require ('./utils/cron')
const port = process.env.PORT || 3000

// let dir = path.join(__dirname, 'uploads')

app.use(morgan('dev'))
const allowedOrigins = ['http://153.92.223.44:3001','http://192.168.1.11:3000','http://192.168.31.243:3000','http://153.92.223.44:3002','https://gamysh.com',"http://153.92.223.44:3000",'http://localhost:3000','http://localhost:2000','http://192.168.31.30:3000', 
    'http://localhost:3001', 'http://153.92.223.44:2000', 'http://admin.gamysh.com', 'https://admin.gamysh.com',`http://192.168.31.160:3000`,`http://192.168.31.160:3001` ];

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

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended : true}));
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api', Routers)

// app.use('/uploads', express.static(dir))


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
cron_job();



app.use(cookieParser())


app.listen(port, ()=>{console.log(`Your server started and listening on port ${port}`)})