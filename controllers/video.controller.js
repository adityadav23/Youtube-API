const Video = require('../models/video.model')
const axios = require('axios')
const {getPagination,} = require('../utils/query');

//BASE URL
const baseApiUrl = "https://www.googleapis.com/youtube/v3";

//This function get the videos with pagination in reverse chronological order
async function getVideo(req,res){
    const {skip, limit } = getPagination(req.query)   
    const videoResponse = await Video.find({},{
        __v:0,
        _id:0
    })
        .sort({publishTime: -1})
        .skip(skip)
        .limit(limit)
    
    res.status(200).json({
        status: "success",
        data:{
            videoResponse
        }
    })
}


//This function loads the video data to the database in reverse chronological order
async function loadVideoData(){
    
    //search string which we want to load to our database
    const searchQuery = "song"
    const url = `${baseApiUrl}/search?key=${process.env.API_KEY}&type=video&part=snippet&maxResults=10&q=${searchQuery}&order=date`;
    const response = await axios.get(url)

    const videoResponse = response.data.items
    for(var i =0; i < videoResponse.length; i++){
        let video = {
            title: videoResponse[i].snippet.title,
            publishTime:  videoResponse[i].snippet.publishedAt,
            description: videoResponse[i].snippet.description,
            thumbURL: videoResponse[i].snippet.thumbnails.medium.url,
            videoId: videoResponse[i].id.videoId
        }
        await Video.updateOne({videoId: video.videoId},video,{
            upsert:true
        })
    }
}
//This function is used too search a video based on title and description in requset query
async function searchVideo(req,res){
    const {title, description} = req.query

    const queryObj = {}

    if(title){
        queryObj.title = {$regex: title}
    }
    if(description){
        queryObj.description = {$regex: description}
    }
    const video = await Video.find(queryObj,{
        __v:0,
        _id:0
    })
    .sort({publishTime: -1})


    if(!video){
        res.status(400).json({
            status:"failed",
            data:{
                message: "No video found... "
            }
        })
    }

    res.status(200).json({
        status: "success",
        data:{
            video
        }
    })
}

module.exports = {
    loadVideoData,
    getVideo,
    searchVideo,
}