const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3030

const Commerce = require("@chec/commerce.js");
const commerce = new Commerce(
    "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26", true
  );


app.use(express.static('public'));
app.use(express.json());

// 
app.get('/', (req,res) => {
    console.log(req)
    res.sendFile(path.join(__dirname,'index.html'))
} )

app.get('/api', (req,res) => {
      commerce.products.list().then((result) => {
        res.json(result);
       if (!commerce) {
        res.sendStatus(500);
       }
})})

app.get('/cart', (req, res) => {
    commerce.cart.retrieve()
    .then((result => {
        res.json(result);
        
        if (!commerce) {
            res.sendStatus(500);
        }
    }))
})

app.get('/cart/contents', (req, res) => {
    commerce.cart.contents().then((items) => res.json(items));
        if (!commerce) {
            res.sendStatus(500);
        }
    })


app.post('/cart', (req, res) => {
    commerce.cart.add(req.body.productID, 1).then((response) => res.json(response));
})
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.get('/checkout', (req, res) => {
    commerce.checkout.generateTokenFrom('cart', commerce.cart.id())
  .then(result => res.json(result));
})