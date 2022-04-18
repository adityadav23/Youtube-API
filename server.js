const http = require('http')
const app = require('./app')
const connectDb = require('./db/connect')


const PORT = process.env.PORT || 3000
const server = http.createServer(app)


async function startServer(){
    await connectDb(process.env.MONGO_URI)
    
    server.listen(PORT, ()=>{
        console.log(`Server is listening on ${PORT}...`)
    })
}

startServer()