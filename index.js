require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const Routers = require('./router/index.js')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require ('morgan')

const port = process.env.PORT || 3000

let dir = path.join(__dirname, 'uploads')

app.use(morgan('dev'))
const allowedOrigins = ['http://109.106.244.215:3001','http://109.106.244.215:3002','http://gamysh.com',"http://109.106.244.215:3000",'http://localhost:3000','http://localhost:2000','http://127.0.0.1:3000', 'http://localhost:2000', 'http://109.106.244.215:2000', `http://192.168.31.240:3000`,`http://192.168.31.8:3000` ];
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

app.use('/uploads', express.static(dir))


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.use(cookieParser())


app.listen(port, ()=>{console.log(`Your server started and listening on port ${port}`)})