const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3030

const Commerce = require("@chec/commerce.js");
const commerce = new Commerce(
    "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26", true
  );


app.use(express.static('public'));


app.get('/', (req,res) => {
    console.log(req)
    res.sendFile(path.join(__dirname,'index.html'))
} )

app.get('/api', (req,res) => {
      commerce.products.list().then((result) => {
        res.json(result);
       if (!commerce) {
        res.sendStatus(500)
       }
})})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})