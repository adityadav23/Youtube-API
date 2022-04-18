const mongoose= require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    description: {
        type: String,
    },
    publishTime: {
        type: Date,
    },
    thumbURL: {
        type: String
    }
})

module.exports = mongoose.model('Video', videoSchema)