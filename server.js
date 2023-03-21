const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3030

const Commerce = require("@chec/commerce.js");


app.use(express.static('public'));


app.get('/', (req,res) => {
    console.log(req)
    res.sendFile(path.join(__dirname,'index.html'))
} )

app.get('/api', (req,res) => {
    const commerce = new Commerce(
        "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26", true
      );
      commerce.products.list().then((result) => {
        let candleName = [];
        let candleImage = [];
        res.json(result);
        for (i = 0; i < result.data.length; i++) {
        candleName .push(result.data[i].name)
        candleImage.push(result.data[i].image.url)
        }
        console.log(candleName)
        console.log(candleImage)
       })
       if (!commerce) {
        res.sendStatus(500)
       }
})
app.listen(PORT, () => {
    console.log(`listening on port ${port}`)
})