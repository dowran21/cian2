const moment = require('moment')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const resize_image  = async (req, res, next) =>{
    console.log(req.files)
    let i=0;
    const {id} = req.params
    if (req.files.length){
        let dir = `./uploads/${id}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        } 
        for (i =0; i<req.files.length; i++){
            const date = moment().format('DDMMYYYY-HHmmss_SSS');
            const name = req.files[i].originalname.replace(' ', '').split('.')[0];
            req.files[i].path = `uploads/${id}/${date}-${name}`
            sharp.cache({files:0});
            await sharp(`./uploads/${req.files[i].filename}`)
                .resize(150, 150)
                .toFormat("webp")
                .toFile(`./uploads/${id}/${date}-${name}-mini.webp`)

            await sharp(`./uploads/${req.files[i].filename}`)
                .resize(450, 450)
                .toFormat("webp")
                .toFile(`./uploads/${id}/${date}-${name}-big.webp`)

            await sharp(`./uploads/${req.files[i].filename}`)
                .toFormat("webp")
                .toFile(`./uploads/${id}/${date}-${name}-large.webp`)
            
            fs.unlinkSync(`./uploads/${req.files[i].filename}`)
        }        
    }else{
        next()
    }
    next()
}

const resize_page_images = async (req, res, next) =>{
    let dir = `./uploads/page-images`
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
    if(req.file){
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        const name = req.file.originalname.replace(' ', '');
        req.file.path = `uploads/page-images/${date}-${name}`
        await sharp(`./uploads/${req.file.filename}`)
            .toFile(`./uploads/page-images/${date}-${name}`)
        
        fs.unlinkSync(`./uploads/${req.file.filename}`)
        next()
    }else{
        return res.status(402).send(false)
    }
}

module.exports = {
    resize_image,
    resize_page_images,
    }
