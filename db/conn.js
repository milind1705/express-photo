const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/image", {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})