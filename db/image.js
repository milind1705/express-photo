const mongoose = require("mongoose")

const imageShema = new mongoose.Schema({
image:{
    type:String
}
})

module.exports = mongoose.model('image', imageShema)