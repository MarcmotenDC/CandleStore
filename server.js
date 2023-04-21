const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3030;

const Commerce = require("@chec/commerce.js");
const commerce = new Commerce(
  "pk_test_508420f944b7aa39c411978846b67e228dfdfcc4a2d26",
  true
);

app.use(express.static("public"));
app.use(express.json());

// main page
app.get("/", (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, "index.html"));
});
// grabs all products from API
app.get("/api", (req, res) => {
  commerce.products.list().then((result) => {
    res.json(result);
    if (!commerce) {
      res.sendStatus(500);
    }
  });
});
// initializes cart
app.get("/cart", (req, res) => {
  commerce.cart.retrieve().then((result) => {
    res.json(result);
    if (!commerce) {
      res.sendStatus(500);
    }
  });
});
// gets the contents of the cart to display in popup
app.get("/cart/contents", (req, res) => {
  commerce.cart.contents().then((items) => res.json(items));
  if (!commerce) {
    res.sendStatus(500);
  }
});

// Adds an item to the cart
app.post("/cart", (req, res) => {
  commerce.cart
    .add(req.body.productID, 1)
    .then((response) => res.json(response));
});

//! removes item from cart (soon to be added)
app.post("/cart:id", (req, res) => {
  commerce.cart
    .remove(req.body.lineID, 1)
    .then((response) => res.json(response));
});

// sends shipping and payment information
app.post("/processpayment", async (req, res) => {
  try {
    const { paymentData, orderData } = req.body;
    // Retrieve the current cart
    const cart = await commerce.cart.retrieve();
    // Generate a token for the cart
    const { id: cartId } = cart;
    const { id: orderId } = await commerce.checkout.generateToken(cartId, {
      type: "cart",
    });
    // Capture the payment for the 
    const capture = await commerce.checkout.capture(orderId, orderData, paymentData, );
    res.json({ success: true, data: capture });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
