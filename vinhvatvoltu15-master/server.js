const express = require('express');
const server = express();
const apiRouter = require('./routes/apiWeb')


server.get('/', (req, res) => {
res.sendfile('apiWeb.html')
})
server.use('/api', apiRouter)

server.listen(3000, (err) => {
    if (err) console.err(err)
    else console.log('Server is listening at 3000')
})
