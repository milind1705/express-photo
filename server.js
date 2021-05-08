const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path')
const mongodb = require('mongodb')


const app = express();

app.use(express.urlencoded({extended:true}))

var storage = multer.diskStorage({
    destination: function (req, res , cb){
        cb(null, 'uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));

    }
})

var upload = multer({
    storage:storage
})

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {
    useNewUrlParser:true, useUnifiedTopology:true},
  (err, client) =>{ if(err) return console.log(err);

    db = client.db('images');

    app.listen(3000, () => {
        console.log('mongodb server listning at 3000')
    })
})



app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('upload')
})
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;

    if(!file) {
        const error = new Error('please upload a file');
        return next(error)
    }
    res.send(file);
})

app.listen(5000)