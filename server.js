const express = require('express');
const path = require('path')
const app = express();
const Commerce = require("@chec/commerce.js");


app.use(express.static(__dirname));

const port = 25565

app.get('/', (req,res) => {
    console.log(req)
    res.sendFile(path.join(__dirname,'/Homepage/index.html'))
} )

app.get('/api', (req,res) => {
    const commerce = new Commerce(
        "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26", true
      );
      commerce.products.list().then((result) => {
        res.json(result);
       })
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})