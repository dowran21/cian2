const moment = require('moment')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const resize_image  = async (req, res, next) =>{
    let i=0;
    const {id} = req.params
    if (req.files.length){
        let dir = `./uploads/${id}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        console.log(req.files)
        for (i =0; i<req.files.length; i++){
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        const name = req.files[i].originalname.split('.')[0];
        req.files[i].path = `uploads/${id}/${date}-${name}`

        await sharp(req.files[i].buffer)
            .resize(150, 150)
            .toFile(`./uploads/${id}/${date}-${name}-mini.webp`)

        await sharp(req.files[i].buffer)
            .resize(450, 450)
            .toFile(`./uploads/${id}/${date}-${name}-big.webp`)

        await sharp(req.files[i].buffer)
            .toFile(`./uploads/${id}/${date}-${name}-large.webp`)
        }

    }else{
        next()
    }
    next()
}

module.exports = {
    resize_image,
    }
