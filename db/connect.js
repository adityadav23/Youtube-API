const mongoose = require('mongoose')

async function connectDb(url){
    return  mongoose.connect(url)
}

module.exxports = connectDb