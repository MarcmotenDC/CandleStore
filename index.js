const express = require('express');
const app = express();
const path = require('path');

const port = 25565

app.get('/', (req,res) => {
    console.log(req)
    res.sendFile(path.join(__dirname+'/index.html'))
} )

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})