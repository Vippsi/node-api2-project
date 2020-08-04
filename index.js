const express = require('express')
const server = express()
const port = 4000
const postsRouter = require('./routers/posts-router')
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h1>Server is running</h1>`)
})


server.use('/api/posts', postsRouter)



server.listen(port, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
})