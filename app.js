require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')

const baseApiUrl = "https://www.googleapis.com/youtube/v3";

app.use(express.json())

app.use('/search', async (req,res)=>{
    const searchQuery = req.query.search_query
    const url = `${baseApiUrl}/search?key=${process.env.API_KEY}&type=video&part=snippet&q=${searchQuery}&order=date`;
    const response = await  axios.get(url)
    const titles = response.data.items.map((item) => item.snippet.title);
   
    res.status(200).json({
        status: "success",
        data : {
            titles,
        }
    })
})

module.exports = app