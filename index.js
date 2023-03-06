const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname));

const port = 25565

app.get('/', (req,res) => {
    console.log(req)
    res.sendFile(path.join(__dirname,'/Homepage/index.html'))
} )

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})